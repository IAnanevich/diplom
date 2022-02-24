import './App.css';
import * as grafar from 'grafar';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

function App() {
  const [ws] = useState(new WebSocket('ws://localhost:8000/ws'));
  const grafarPanelRef = useRef(null);
  const [grafarPanel, setGrafarPanel] = useState(null); // todo useMemo maybe?
  const [inputValueB, setInputValueB] = useState('');
  const [inputValueA, setInputValueA] = useState('');

  console.log('render');

  useEffect(() => {
    if (grafarPanelRef.current.children.length === 0) {
      setGrafarPanel(grafar.panel(grafarPanelRef.current));
    }
  }, []);

  const [x] = useState(grafar.seq(-1, 1, 20).select());
  const [a] = useState(grafar.set([1]).select());
  const [b] = useState(grafar.set([0]).select());
  const [y] = useState(grafar.map([x, a, b], (x, a, b) => a * Math.sin(x) + b));
  /*  function sendMessage(event) {
    var input = document.getElementById('messageText');
    ws.send(input.value);
    input.value = '';
    event.preventDefault();
  }*/

  useEffect(() => {
    if (grafarPanel) {
      console.log('setAxes');
      grafarPanel.setAxes(['x', 'y']);
    }
  }, [grafarPanel]);

  useEffect(() => {
    if (grafarPanel) {
      console.log('pin grafarPanel');
      grafar.pin([x, y], grafarPanel);
    }
  }, [x, y, grafarPanel]);

  return (
    <div className='App' id={'App'}>
      <h1>WebSocket Chat</h1>
      <div style={{ width: 400, height: 300 }} ref={grafarPanelRef} />
      {/*      <form>
        <input type='text' id='messageText' autoComplete='off' />
        <button onClick={sendMessage}>Send</button>
      </form>*/}
      {/*<ul id='messages'></ul>*/}
      <div>
        <input
          value={inputValueA}
          onChange={(event) => {
            setInputValueA(event.target.value);
          }}
        />
        <button
          onClick={() => {
            //setX(grafar.range(-inputValue, +inputValue, 100).select());
            //setY(grafar.map(x, (x) => Math.sin(x)));
            grafar.set([inputValueA]).into(a);
            setInputValueA('');
          }}
        >
          {'set a'}
        </button>
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
            grafar.set([inputValueB]).into(b);
            setInputValueB('');
          }}
        >
          {'set b'}
        </button>
      </div>
    </div>
  );
}

export default App;
