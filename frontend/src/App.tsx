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
  const [pointsXArray, setPointsXArray] = useState<any>([]);
  const [pointsYArray, setPointsYArray] = useState<any>([]);
  const [pointsZArray, setPointsZArray] = useState<any>([]);
  const [pointsXArray3d, setPointsXArray3d] = useState<number[][]>([]);
  const [pointsYArray3d, setPointsYArray3d] = useState<number[][]>([]);

  const [pointsXArrayTmp, setPointsXArrayTmp] = useState<any>([]);
  const [pointsYArrayTmp, setPointsYArrayTmp] = useState<any>([]);
  const [pointsZArrayTmp, setPointsZArrayTmp] = useState<any>([]);

  const [counter, setCounter] = useState<number>(0);

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
      event.data.text().then((response: any) => {
        const dataObj = JSON.parse(response);

        console.log('dataObj: ', dataObj);

        setPointsXArray((prevState) => {
          return [...prevState, dataObj.x];
        });

        setPointsXArray3d((prevState) => {
          const array = new Array(50);
          return [...prevState, array.fill(dataObj.x)];
        });

        /*        setPointsYArray((prevState) => {
          return [...prevState, dataObj.y[dataObj.x]];
        });*/

        setPointsYArray((prevState) => {
          return [...prevState, dataObj.y];
        });

        setPointsYArray3d((prevState) => {
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
            x: pointsXArray3d,
            y: pointsYArray3d,
            z: pointsZArray,
            type: 'surface',
          },
        ]}
        layout={{ width: 800, height: 500, title: 'Sinus Plot' }}
      />
      <Plot
        data={[
          {
            x: pointsXArrayTmp,
            y: pointsYArrayTmp,
            z: pointsZArrayTmp,
            type: 'contour',
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
        <button
          onClick={() => {
            console.log('pointsXArray: ', pointsXArray);
            console.log('pointsYArray: ', pointsYArray);
            console.log('pointsZArray: ', pointsZArray);

            console.log('pointsXArrayTmp: ', pointsXArrayTmp);
            console.log('pointsYArrayTmp: ', pointsYArrayTmp);
            console.log('pointsZArrayTmp: ', pointsZArrayTmp);
            console.log('counter: ', counter);
          }}
        >
          {'log states'}
        </button>
        <button
          onClick={() => {
            setPointsXArrayTmp((prev) => {
              console.log('pointsXArray[counter]: ', pointsXArray[counter]);

              if (counter !== 0) {
                return [...prev, pointsXArray[counter]];
              }
              return [pointsXArray[counter]];
            });

            setPointsYArrayTmp((prev) => {
              if (counter !== 0) {
                return [...prev, pointsYArray[counter]];
              }
              return [pointsYArray[counter]];
            });

            setPointsZArrayTmp((prev) => {
              if (counter !== 0) {
                return [...prev, pointsZArray[counter]];
              }
              return [pointsZArray[counter]];
            });

            setCounter((prevCounter) => {
              return prevCounter + 1;
            });
          }}
        >
          {'step'}
        </button>
      </div>
    </div>
  );
}

export default App;
