# Python WebSocket Server
import asyncio
import websockets
import json

async def handle_client(websocket, path):
    async for message in websocket:
        data = json.loads(message)
        headline = data["headline"]
        timestamp = data["timestamp"]
        event = data["event"]
        
        # Print headline in Tkinter window
        # Display timestamp and event beneath the headline
        
async def main():
    async with websockets.serve(handle_client, "localhost", 8765):
        await asyncio.Future()  # Run forever

asyncio.run(main())
