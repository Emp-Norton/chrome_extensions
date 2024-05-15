
import asyncio
import json
import logging
import pytz
import queue
import signal
import sys
import websockets

from datetime import datetime

from PyQt5.QtCore import QObject, pyqtSignal, QThread, pyqtSlot, QTimer
from PyQt5.QtWidgets import QApplication, QWidget, QVBoxLayout, QLabel

def generate_timestamp(tz='US/Pacific'):
    tz = pytz.timezone(tz)
    now = datetime.now(tz)
    return now.strftime("%m/%d/%y - %H:%M:%S")

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

    @pyqtSlot()
    def start_server(self):
        asyncio.run(self.main())

    def write_to_log(self, message):
        with open('myapp.log', 'w') as logfile:
            logfile.write(f"{message}\n")

    async def process_message(self, websocket, path):
        async for message in websocket:
            try:
                print(message)
                data = json.loads(message)
                # Validate the JSON format
                message_text = data["data"]["message"]
                timestamp = generate_timestamp()

                if message_text == "set_time":
                    # Hack workaround to set a time retroactively
                    timestamp = data["data"]["url"]
                url = data["data"]["url"]
                constructed_message = {"timestamp": timestamp, "message": message_text, "url": url}
                self.write_to_log(constructed_message)
                self.queue.put(constructed_message)
                self.message_received.emit({"timestamp": timestamp, "message": message_text, "url": url})
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
        self.textTrail = ''
        self.delimiter = '<br>'
        self.setFixedSize(800, 600)

    def initUI(self):
        self.setWindowTitle('WebSocket Server GUI')  
        layout = QVBoxLayout()      
        self.messageLabel = QLabel("Waiting for first message...")
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
        layout.addWidget(self.messageLabel)
        layout.addStretch()
        self.setLayout(layout)

    @pyqtSlot(dict)
    def updateMessageLabel(self, data):
        previous_text = self.messageLabel.text
        print(previous_text)
        timestamp = data["timestamp"]
        message = data["message"]      
        url = data["url"]      
        new_message_text = f"[{timestamp}] {message} ({url})"
        self.textTrail += (new_message_text + self.delimiter)
        self.messageLabel.setText(self.textTrail)

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
