import numpy as np
from fastapi import FastAPI, WebSocket

from src.utils.constants import tmpe2, tmpi2, tmpe1, tmpi1, tmpe0, tmpi0, nz, dz
from src.utils.calculation import dt, Calculation, nx, ny
from src.utils.service import Validation

app = FastAPI()


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    i = 0
    await websocket.accept()
    data = await websocket.receive_json()

    if not Validation.validate_data(data):
        await websocket.send(message='You need to fill in all fields for calculations')
        await websocket.close()

    Calculation.calculation_1(time=i * dt, data=data)
    while True:
        i += 1
        try:

            tmpe0[:] = tmpe1[:]
            tmpe1[:] = tmpe2[:]

            tmpi0[:] = tmpi1[:]
            tmpi1[:] = tmpi2[:]
            Calculation.calculation_2(i * dt, data=data)

            resp = {
                'step': i,
                't': i * dt,
                # for 2d
                'temp_e': tmpe2[:, ny // 2, :].tolist(),
                'temp_i': tmpi2[:, ny // 2, :].tolist(),
                # for 1d (ion) (time)
                'y1_time': tmpi2[nx // 2, ny // 2, 2],
                # for 1d (electrons) (time)
                'y2_time': tmpe2[nx // 2, ny // 2, 2],
                # for 1d (ion) (coords)
                'y1_coords': tmpi2[nx // 2, ny // 2].tolist(),
                # for 1d (electrons) (coords)
                'y2_coords': tmpe2[nx // 2, ny // 2].tolist(),
                'z': np.linspace(0, nz * dz, nz).tolist()
            }

            await websocket.send_json(data=resp, mode='binary')

            if i == 200000000000:
                await websocket.close()
        except Exception as e:
            print('error:', e)
            break


@app.get('/')
def hello_world():
    return 'Hello World!'
