import './App.css';
import { useEffect, useState } from 'react';
import { COLORS } from './constants/colors';
import { ParamsInputsWindow } from '../src/components/ui/ParamsInputsWindow';
import { CalculatingProgressWindow } from '../src/components/ui/CalculatingProgressWindow';
import { EMPTY_ARRAY, EMPTY_STRING } from '../src/constants/common';
import { Plots } from '../src/components/ui/Plots';
import styled from 'styled-components';
import { ControlsWindow } from '../src/components/ui/ControlsWindow';

const WindowsContainer = styled.div``;

const WindowsContainerRow = styled.div`
  margin-bottom: 10px;
`;

let ws = new WebSocket('ws://localhost:8000/ws');

function App() {
  const [isWsOpen, setIsWsOpen] = useState(false);
  const [absCoefficientValue, setAbsCoefficientValue] = useState('5');
  const [intensityValue, setIntensityValue] = useState('1');
  const [pulseDurationValue, setPulseDurationValue] = useState('1');
  const [beamRadiusValue, setBeamRadiusValue] = useState('1');
  const [timeValue, setTimeValue] = useState('0');
  const [timeArray, setTimeArray] = useState<any>(EMPTY_ARRAY);
  const [stepValue, setStepValue] = useState('0');
  const [pointsY2TimeArray, setPointsY2TimeArray] = useState<any>(EMPTY_ARRAY);
  const [pointsY1TimeArray, setPointsY1TimeArray] = useState<any>(EMPTY_ARRAY);
  const [pointsYi2Array, setPointsYi2Array] = useState<any>(EMPTY_ARRAY);
  const [pointsYe2Array, setPointsYe2Array] = useState<any>(EMPTY_ARRAY);
  const [pointsZArray, setPointsZArray] = useState<any>(EMPTY_ARRAY);
  const [pointsTempIArray, setPointsTempIArray] = useState<any>(EMPTY_ARRAY);
  const [pointsTempEArray, setPointsTempEArray] = useState<any>(EMPTY_ARRAY);

  const addListnersToWs = () => {
    ws.onopen = function () {
      console.log('socket connection was opened');
      setIsWsOpen(true);
    };

    ws.onclose = (event) => {
      console.log('socket connection was closed with code: ', event.code);
      console.log('reason: ', event.reason);
      setIsWsOpen(false);
    };

    ws.onerror = (ev) => {
      console.log('ERROR ev!: ', ev);
    };

    ws.onmessage = (event) => {
      event.data.text().then((response: any) => {
        const dataObj = JSON.parse(response);

        console.log('dataObj.y1_time: ', dataObj.y1_time);

        setPointsY1TimeArray((prevState) => {
          return [...prevState, dataObj.y1_time];
        });
        setPointsY2TimeArray((prevState) => {
          return [...prevState, dataObj.y2_time];
        });
        setPointsTempIArray(dataObj.temp_i);
        setPointsTempEArray(dataObj.temp_e);
        setStepValue(dataObj.step);
        setTimeArray((prevState) => {
          return [...prevState, dataObj.t];
        });
        setTimeValue(dataObj.t);
        setPointsYi2Array(dataObj.y1_coords);
        setPointsYe2Array(dataObj.y2_coords);
        setPointsZArray(dataObj.z);
      });
    };
  };

  const setParamsAction = () => {
    if (
      absCoefficientValue &&
      intensityValue &&
      pulseDurationValue &&
      beamRadiusValue !== EMPTY_STRING
    ) {
      console.log('isWsOpen: ', isWsOpen);
      if (!isWsOpen) {
        ws = new WebSocket('ws://localhost:8000/ws');
        addListnersToWs();
      }

      const sendingDataObj = {
        kabs: +absCoefficientValue,
        P0: +intensityValue,
        tp: +pulseDurationValue,
        r0: +beamRadiusValue,
      };

      ws.send(JSON.stringify(sendingDataObj));
    }
  };

  const stopAction = () => {
    if (isWsOpen) {
      ws.close(1000, 'stop action');
      setIsWsOpen(false);
    }
  };

  useEffect(() => {
    addListnersToWs();
  }, [ws]);

  return (
    <div
      className={'App'}
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
            <ControlsWindow stopAction={stopAction} setParamsAction={setParamsAction} />
          </WindowsContainerRow>
        </WindowsContainer>
        <Plots
          pointsTempEArray={pointsTempEArray}
          pointsTempIArray={pointsTempIArray}
          pointsY1TimeArray={pointsY1TimeArray}
          pointsY2TimeArray={pointsY2TimeArray}
          pointsYi2Array={pointsYi2Array}
          pointsYe2Array={pointsYe2Array}
          pointsZArray={pointsZArray}
          time={timeArray}
        />
      </div>
    </div>
  );
}

export default App;
