from fastapi import FastAPI, WebSocket

from src.utils.constants import tmpe2, tmpi2, tmpe1, tmpi1, tmpe0, tmpi0, dx, dy
from src.utils.calculation import dt, Calculation, nx, ny
import numpy as np

app = FastAPI()


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

            resp = {
                't': i * dt,
                # 'y1': tmpi2[nx // 2, ny // 2, 2],
                # 'y2': tmpe2[nx // 2, ny // 2, 2],
                'temp_e': tmpe2[:, ny // 2, :].tolist(),
                'temp_i': tmpi2[:, ny // 2, :].tolist(),
                'x': np.linspace(0,nx*dx,nx + 1).tolist(),
                'y': np.linspace(0,ny*dy,ny + 1).tolist(),
            }

            await websocket.send_json(data=resp, mode='binary')

            if i == 20000:
                await websocket.close()
        except Exception as e:
            print('error:', e)
            break


@app.get('/')
def lol():
    return 'Hello world!'
