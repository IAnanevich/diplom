import math

import numpy as np
from fastapi import FastAPI, WebSocket

from src.utils.calculation import MainCalculation
from src.utils.constants import N

app = FastAPI()


def calculate_sin(x, a, b):
    return math.sin(a * x + b)


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
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


if __name__ == '__main__':
    te1 = np.empty(N)
    te2 = np.empty(N)
    tl1 = np.empty(N)
    tl2 = np.empty(N)
    x = np.empty(N)

    # TODO: change, these variables will come from client
    fl = 10
    t = 0
    dt = 10

    while True:
        result = MainCalculation(te1=te1, te2=te2, tl1=tl1, tl2=tl2, x=x).calculation(dt=dt, fl=fl, t=t)
        t += 1
    print(result)
