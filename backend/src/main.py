import math

from fastapi import FastAPI, WebSocket

app = FastAPI()


def calculate_sin(x, a, b):
    return math.sin(a * x + b)


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    print('Accepting client connection...')
    x = 0
    await websocket.accept()
    data = await websocket.receive_json()
    while True:
        try:
            resp = {'x': x, 'y': calculate_sin(x, data.get('a'), data.get('b'))}
            await websocket.send_json(resp)
            x += 1
        except Exception as e:
            print('error:', e)
            break
    print('Bye..')