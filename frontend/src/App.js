import './App.css';
import * as grafar from 'grafar';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [ws] = useState(new WebSocket('ws://localhost:8000/ws'));
  const grafarPanelRef = useRef(null);
  //const [grafarPanel] = useState(grafar.panel(document.getElementById('grafar')));
  const [grafarPanel] = useState(grafar.panel(grafarPanelRef?.current));
  const [x] = useState(grafar.range(-1, 1, 100).select());
  const [y] = useState(grafar.map(x, (x) => Math.sin(x)));
  /*  function sendMessage(event) {
    var input = document.getElementById('messageText');
    ws.send(input.value);
    input.value = '';
    event.preventDefault();
  }*/

  console.log('grafarPanel: ', grafarPanel);

  useEffect(() => {
    ws.onmessage = function (event) {
      const messages = document.getElementById('messages');
      const message = document.createElement('li');
      const content = document.createTextNode(event.data);
      message.appendChild(content);
      messages?.appendChild(message);
    };
  }, []);

  useEffect(() => {
    if (grafarPanel) {
      grafarPanel.setAxes(['x', 'y']);
    }
  }, [grafarPanel]);

  useEffect(() => {
    grafar.pin([x, y], grafarPanel);
  }, [x, y]);

  return (
    <div className='App'>
      <h1>WebSocket Chat</h1>
      {/*      <form>
        <input type='text' id='messageText' autoComplete='off' />
        <button onClick={sendMessage}>Send</button>
      </form>*/}
      {/*<ul id='messages'></ul>*/}
      <div ref={grafarPanelRef}></div>
    </div>
  );
}

export default App;
