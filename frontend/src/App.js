import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [ws] = useState(new WebSocket('ws://localhost:8000/ws'));
  const [inputValueB, setInputValueB] = useState('');
  const [inputValueA, setInputValueA] = useState('');
  const [pointsXArray] = useState([]);
  const [pointsYArray] = useState([]);

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

      console.log('Data: ', dataObj);
      if (dataObj.x < 20 && dataObj.x > -20) {
        //pointsXArray.push(dataObj.x);
        //pointsYArray.push(dataObj.y);
      } else {
        ws.close(1000);
      }
    };
  }, []);

  return (
    <div className='App' id={'App'}>
      <h1>WebSocket Chat</h1>
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
            //setX(grafar.range(-inputValue, +inputValue, 100).select());
            //setY(grafar.map(x, (x) => Math.sin(x)));
            //grafar.set([inputValueA]).into(a);
            //setInputValueA('');
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
