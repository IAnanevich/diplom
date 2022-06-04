import './App.css';
import { useEffect, useState } from 'react';
import { Window } from '../src/components/common/Window';
import { COLORS } from './constants/colors';
import { ParamsInputsWindow } from '../src/components/ui/ParamsInputsWindow';
import { CalculatingProgressWindow } from '../src/components/ui/CalculatingProgressWindow';
import { ControlButton } from '../src/components/common/ControlButton';
import { EMPTY_STRING } from '../src/constants/common';
import { Plots } from '../src/components/ui/Plots';
import styled from 'styled-components';

const WindowsContainer = styled.div``;

const WindowsContainerRow = styled.div`
  margin-bottom: 10px;
`;

function App() {
  const [ws] = useState(new WebSocket('ws://localhost:8000/ws'));
  const [absCoefficientValue, setAbsCoefficientValue] = useState('1');
  const [intensityValue, setIntensityValue] = useState('1');
  const [pulseDurationValue, setPulseDurationValue] = useState('1');
  const [beamRadiusValue, setBeamRadiusValue] = useState('1');
  const [timeValue, setTimeValue] = useState('0');
  const [stepValue, setStepValue] = useState('0');
  const [pointsYiArray, setPointsYiArray] = useState<any>([]);
  const [pointsYeArray, setPointsYeArray] = useState<any>([]);
  const [pointsTempIArray, setPointsTempIArray] = useState<any>([]);
  const [pointsTempEArray, setPointsTempEArray] = useState<any>([]);

  const sendMessageAction = () => {
    if (
      absCoefficientValue &&
      intensityValue &&
      pulseDurationValue &&
      beamRadiusValue !== EMPTY_STRING
    ) {
      const sendingDataObj = {
        kabs: +absCoefficientValue,
        P0: +intensityValue,
        tp: +pulseDurationValue,
        r0: +beamRadiusValue,
      };

      ws.send(JSON.stringify(sendingDataObj));
    }
  };

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

        setPointsYeArray(dataObj.y1_time);
        setPointsYiArray(dataObj.y2_time);
        setPointsTempIArray(dataObj.temp_i);
        setPointsTempEArray(dataObj.temp_e);
        setStepValue(dataObj.step);
        setTimeValue(dataObj.t);
      });
    };
  }, []);

  return (
    <div
      className='App'
      id={'App'}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: COLORS.GRAY_CFCFCF,
        padding: '15px',
      }}
    >
      <h1>{'Моделирование взаимодействия сверхкоротких лазерных импульсов с металлами'}</h1>

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <WindowsContainer style={{ marginRight: 15 }}>
          <WindowsContainerRow>
            <ParamsInputsWindow
              absCoefficientValue={absCoefficientValue}
              beamRadiusValue={beamRadiusValue}
              intensityValue={intensityValue}
              setAbsCoefficientValue={setAbsCoefficientValue}
              setBeamRadiusValue={setBeamRadiusValue}
              setIntensityValue={setIntensityValue}
              pulseDurationValue={pulseDurationValue}
              setPulseDurationValue={setPulseDurationValue}
            />
          </WindowsContainerRow>
          <WindowsContainerRow>
            <CalculatingProgressWindow timeValue={timeValue} stepValue={stepValue} />
          </WindowsContainerRow>
          <WindowsContainerRow>
            <Window title={'Управление'}>
              {<ControlButton onClick={sendMessageAction} value={'Отправить данные'} />}
            </Window>
          </WindowsContainerRow>
        </WindowsContainer>
        <Plots
          pointsTempEArray={pointsTempEArray}
          pointsTempIArray={pointsTempIArray}
          pointsXArray={pointsXArray}
          pointsYArray={pointsYArray}
        />
      </div>
    </div>
  );
}

export default App;
