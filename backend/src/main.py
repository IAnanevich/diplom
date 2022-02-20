import math

from fastapi import FastAPI, WebSocket

app = FastAPI()


def calculate_sin(x):
    return math.sin(x)


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    print('Accepting client connection...')
    x = 0
    await websocket.accept()
    while True:
        try:
            await websocket.receive_text()
            resp = {'x': x, 'y': calculate_sin(x)}
            await websocket.send_json(resp)
            x += 1
        except Exception as e:
            print('error:', e)
            break
    print('Bye..')
