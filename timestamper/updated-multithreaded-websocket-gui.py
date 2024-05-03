
import asyncio
import datetime
import json
import logging
import queue
import signal
import sys
import websockets

from PyQt5.QtCore import QObject, pyqtSignal, QThread, pyqtSlot, QTimer
from PyQt5.QtWidgets import QApplication, QWidget, QVBoxLayout, QLabel


def signal_handler(sig, frame):
    print('You pressed Ctrl+C - or another interrupt signal.')
    # Perform any cleanup actions here:
    #   - Close file handles
    #   - Release resources
    #   - Write logs
    print('Exiting gracefully...')
    sys.exit(0)  # 0 usually signifies a clean exit

class WebSocketServer(QObject):
    message_received = pyqtSignal(dict)

    def __init__(self):
        super().__init__()
        self.queue = queue.Queue()
        self.shutdown = False # Flag for signal interrupts
        # Create a QTimer to check the queue every second
        self.timer = QTimer()
        self.timer.timeout.connect(self.check_queue)
        self.timer.start(1000) # Check the queue every second


    # def signal_handler(self, sig, frame):
    #     print(f"Received shutdown signal. \nSig: {sig} \n Frame: {frame}")
    #     self.shutdown = True

    @pyqtSlot()
    def start_server(self):
        asyncio.run(self.main())

    def check_queue(self):
        if not self.queue.empty():
            message = self.queue.get()
            self.message_received.emit(message)

    async def process_message(self, websocket, path):
        async for message in websocket:
            try:
                print(message)
                data = json.loads(message)
                # Validate the JSON format
                timestamp = data["data"]["timestamp"]
                message_text = data["data"]["message"]
                url = data["data"]["url"]
                self.queue.put({"timestamp": timestamp, "message": message_text, "url": url})
            except json.JSONDecodeError as e:
                print(f"Invalid JSON format {e}")
            except Exception as e:        
                print(f"Error processing message: {e}")

    async def main(self):        
        async with websockets.serve(self.process_message, "localhost", 8765):
            await asyncio.Future()  # Run forever


class MyGUI(QWidget):
    def __init__(self):
        super().__init__()        
        self.initUI()

    def initUI(self):
        self.setWindowTitle('WebSocket Server GUI')  
        layout = QVBoxLayout()      
        self.messageLabel = QLabel("Messages will appear here")  
        layout.addWidget(self.messageLabel)        
        self.setLayout(layout)        
        self.setStyleSheet("""
            QLabel#messageLabel {
                color: #333;
                font-size: 18px;                    
                background-color: white;
                border: 1px solid #ddd;
                border-radius: 8px;
                margin-bottom: 5px;   
            }
        """)

    @pyqtSlot(dict)
    def updateMessageLabel(self, data):        
        timestamp = data["timestamp"]
        message = data["message"]      
        url = data["url"]      
        new_message_text = f"[{timestamp}] {message} ({url})"        
        self.messageLabel.setText(new_message_text)

if __name__ == "__main__":
    signal.signal(signal.SIGINT, signal_handler)  # For Ctrl+C
    logging.basicConfig(filename='myapp.log', level=logging.INFO,
                        format='%(asctime)s - %(levelname)s - %(message)s')
    
    app = QApplication(sys.argv)    
    gui = MyGUI()       
    gui.show()    
    
    websocket_server = WebSocketServer()
    server_thread = QThread()
    websocket_server.moveToThread(server_thread)
    
    server_thread.started.connect(websocket_server.start_server)
    
    # Connect WebSocket server signal to GUI slot
    websocket_server.message_received.connect(gui.updateMessageLabel)

    server_thread.start()  
    sys.exit(app.exec_())
