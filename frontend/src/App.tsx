import './App.css';
import { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

function App() {
  const [ws] = useState(new WebSocket('ws://localhost:8000/ws'));
  const [inputValueB, setInputValueB] = useState('');
  const [inputValueA, setInputValueA] = useState('');
  const [pointsXArray, setPointsXArray] = useState<number[]>([]);
  const [pointsYArray, setPointsYArray] = useState<number[]>([]);

  console.log('render');

  useEffect(() => {
    ws.onopen = function () {
      console.log('socket connection was opened');
    };

    ws.onclose = (event) => {
      console.log('socket connection was closed with code: ', event.code);
      console.log('reason: ', event.reason);
    };

    ws.onerror = () => {
      console.log('ERROR!');
    };

    ws.onmessage = (event) => {
      const dataObj = JSON.parse(event.data);

      console.log('Data x: ', dataObj.x);
      if (dataObj.x < 50) {
        setPointsXArray((prevState) => {
          return [...prevState, dataObj.x];
        });
        setPointsYArray((prevState) => {
          return [...prevState, dataObj.y];
        });
      } else {
        ws.close(1000);
      }
    };
  }, []);

  return (
    <div className='App' id={'App'}>
      <h1>{'WebSocket Sinus'}</h1>
      <Plot
        data={[
          {
            x: pointsXArray,
            y: pointsYArray,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'red' },
          },
        ]}
        layout={{ width: 600, height: 400, title: 'Sinus Plot' }}
      />
      <div>
        <input
          value={inputValueA}
          onChange={(event) => {
            setInputValueA(event.target.value);
          }}
        />
        <input
          value={inputValueB}
          onChange={(event) => {
            setInputValueB(event.target.value);
          }}
        />
        <button
          onClick={() => {
            if (inputValueA && inputValueB !== '') {
              const sendingDataObj = { a: +inputValueA, b: +inputValueB };

              ws.send(JSON.stringify(sendingDataObj));

              setInputValueA('');
              setInputValueB('');
            }
          }}
        >
          {'Send a & b'}
        </button>
      </div>
    </div>
  );
}

export default App;
