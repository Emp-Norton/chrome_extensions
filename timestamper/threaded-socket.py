import asyncio
import websockets
import json
import datetime
from PyQt5.QtCore import QObject, pyqtSignal

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

async def main():
    server = WebSocketServer()
    # You can modify the host and port as needed
    async with websockets.serve(server.process_message, "localhost", 8000):
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    # Start WebSocket server in a separate thread
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())