import math

from fastapi import FastAPI, WebSocket

app = FastAPI()


def calculate_sin(x, a, b, c, y, d):
    return math.sin(a * x + b) + math.sin(c * y + d)


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):

    await websocket.accept()
    data = await websocket.receive_json()
    try:
        a = data.get('a')
        b = data.get('b')
        c = data.get('c')
        d = data.get('d')
        lim_x = data.get('lim_x')
        lim_y = data.get('lim_y')

        for x in range(lim_x):
            result_y = []
            result_sin = []
            for y in range(lim_y):
                result_sin.append(calculate_sin(x, a, b, c, y, d))
                result_y.append(y)
            resp = {'x': x, 'y': result_y, 'z': result_sin}
            await websocket.send_json(data=resp, mode='text')

        await websocket.close()
    except Exception as e:
        print('error:', e)
