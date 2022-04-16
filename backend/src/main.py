import math
import time

from fastapi import FastAPI, WebSocket
# from backend.src.utils import calculation
from src.utils.calculation import dt, Calculation
from src.utils.calculation import nx, ny
from src.utils.constants import tmpe2, tmpi2, tmpe1, tmpi1, tmpe0, tmpi0

app = FastAPI()


def calculate_sin(x, a, b):
    return math.sin(a * x + b)


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    i = 0
    await websocket.accept()
    data = await websocket.receive_json()
    Calculation.calculation_1(i * dt)
    while True:
        i += 1
        try:
            tmpe0[:] = tmpe1[:]
            tmpe1[:] = tmpe2[:]

            tmpi0[:] = tmpi1[:]
            tmpi1[:] = tmpi2[:]
            Calculation.calculation_2(i * dt)

            resp = {'x': i * dt, 'y': tmpi2[nx//2, ny//2, 2], 'i': i}
            await websocket.send_json(data=resp, mode='text')
            # time.sleep(10)
            if i == 200000000:
                await websocket.close()
        except Exception as e:
            print('error:', e)
            break
