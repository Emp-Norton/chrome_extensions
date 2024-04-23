import sys
from PyQt5.QtWidgets import QApplication, QWidget, QVBoxLayout, QLabel
from PyQt5.QtCore import QObject, pyqtSignal
import asyncio
import websockets
import json
import datetime

class WebSocketServer(QObject):
    message_received = pyqtSignal(dict)

    async def process_message(self, websocket, path):
        async for message in websocket:
            try:
                data = json.loads(message)

                # Validate the JSON format
                if "data" in data and "timestamp" in data["data"] and "message" in data["data"] and "URL" in data["data"]:
                    timestamp = datetime.datetime.fromisoformat(data["data"]["timestamp"])
                    message_text = data["data"]["message"]
                    url = data["data"]["URL"]

                    # Emit signal with the received data
                    self.message_received.emit({"timestamp": timestamp, "message": message_text, "url": url})

                else:
                    print("Invalid JSON format")

            except json.JSONDecodeError:
                print("Invalid JSON format")
            except Exception as e:
                print(f"Error processing message: {e}")

class StyledLabel(QLabel):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.setObjectName("styledLabel")

class MyGUI(QWidget):
    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):
        self.setWindowTitle('WebSocket Server GUI')
        # main windows size
        self.setFixedSize(600, 400)
        layout = QVBoxLayout()

        self.messageLabel = StyledLabel("Messages will appear here")
        self.messageLabel.setFixedSize(400, 200)
        layout.addWidget(self.messageLabel)
        self.setLayout(layout)

        # Apply stylesheet
        self.setStyleSheet("""
            #styledLabel {
                color: #333 !important;
                font-size: 18px !important;
                background-color: ;
                border-radius: 8px;
                margin-bottom: 5px;
                
            }
        """)

    def updateMessageLabel(self, data):
        timestamp = data["timestamp"].strftime("%Y-%m-%d %H:%M:%S")
        message = data["message"]
        url = data["url"]
        new_message_text = f"[{timestamp}] {message} ({url})"
        self.messageLabel.setText(new_message_text)

async def main():
    app = QApplication(sys.argv)
    gui = MyGUI()
    gui.show()

    websocket_server = WebSocketServer()
    websocket_server_thread = asyncio.ensure_future(websockets.serve(websocket_server.process_message, "localhost", 8000))

    # Connect WebSocket server signal to GUI slot
    websocket_server.message_received.connect(gui.updateMessageLabel)

    # Execute the application
    sys.exit(app.exec_())

if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())
