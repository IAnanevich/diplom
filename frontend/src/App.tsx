import './App.css';
import { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { DataInput } from './components/common/DataInput';

function App() {
  const [ws] = useState(new WebSocket('ws://localhost:8000/ws'));
  const [inputValueB, setInputValueB] = useState('');
  const [inputValueA, setInputValueA] = useState('');
  const [inputValueC, setInputValueC] = useState('');
  const [inputValueD, setInputValueD] = useState('');
  const [pointsXArray, setPointsXArray] = useState<number[][]>([]);
  const [pointsYArray, setPointsYArray] = useState<number[]>([]);
  const [pointsZArray, setPointsZArray] = useState<number[]>([]);

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
      /*      const dataObj = JSON.parse(event.data);

      console.log('Data x: ', dataObj.x);
      if (dataObj.x < 500) {

      } else {
        ws.close(1000);
      }*/

      event.data.text().then((response: any) => {
        const dataObj = JSON.parse(response);

        console.log('dataObj: ', dataObj);

        setPointsXArray((prevState) => {
          const array = new Array(50);
          return [...prevState, array.fill(dataObj.x)];
        });

        setPointsYArray((prevState) => {
          return [...prevState, dataObj.y];
        });

        setPointsZArray((prevState) => {
          return [...prevState, dataObj.z];
        });
      });
    };
  }, []);

  return (
    <div
      className='App'
      id={'App'}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h1>{'WebSocket Sinus'}</h1>
      <Plot
        data={[
          {
            x: pointsXArray,
            y: pointsYArray,
            z: pointsZArray,
            type: 'surface',
            //mode: 'lines+markers',
            //marker: { color: 'red' },
          },
        ]}
        layout={{ width: 800, height: 500, title: 'Sinus Plot' }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', width: 200, alignItems: 'center' }}>
        <DataInput
          value={inputValueA}
          onChange={(event) => {
            setInputValueA(event.target.value);
          }}
          label={'A:'}
        />
        <DataInput
          value={inputValueB}
          onChange={(event) => {
            setInputValueB(event.target.value);
          }}
          label={'B:'}
        />
        <DataInput
          value={inputValueC}
          onChange={(event) => {
            setInputValueC(event.target.value);
          }}
          label={'C:'}
        />
        <DataInput
          value={inputValueD}
          onChange={(event) => {
            setInputValueD(event.target.value);
          }}
          label={'D:'}
        />
        <button
          onClick={() => {
            if (inputValueA && inputValueB !== '') {
              const sendingDataObj = {
                a: +inputValueA,
                b: +inputValueB,
                c: +inputValueC,
                d: +inputValueD,
                lim_x: 30,
                lim_y: 30,
              };
              ws.send(JSON.stringify(sendingDataObj));

              setInputValueA('');
              setInputValueB('');
              setInputValueC('');
              setInputValueD('');
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
