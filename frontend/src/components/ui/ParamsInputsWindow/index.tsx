import { FC } from 'react';
import { DataInput } from '../../common/DataInput';
import { Window } from '../../common/Window';
import { ParamsInputsWindowPropsType } from './types';
import { DataInputsContainer } from './styles';

export const ParamsInputsWindow: FC<ParamsInputsWindowPropsType> = (props) => {
  const {
    beamRadiusValue,
    setBeamRadiusValue,
    absCoefficientValue,
    setAbsCoefficientValue,
    intensityValue,
    setIntensityValue,
    pulseDurationValue,
    setPulseDurationValue,
  } = props;

  return (
    <Window title={'Параметры'}>
      <DataInputsContainer>
        <DataInput
          value={beamRadiusValue}
          onChange={(event) => {
            setBeamRadiusValue(event.target.value);
          }}
          label={'Радиус пучка (см): '}
          extraLabel={
            <>
              {'*10'}
              <sup>{'-2'}</sup>
            </>
          }
        />
        <DataInput
          value={absCoefficientValue}
          onChange={(event) => {
            setAbsCoefficientValue(event.target.value);
          }}
          label={
            <>
              {'Коэффициент поглощения (см'}
              <sup>{'-1'}</sup>
              {'): '}
            </>
          }
          extraLabel={
            <>
              {'*10'}
              <sup>{'5'}</sup>
            </>
          }
        />
        <DataInput
          value={intensityValue}
          onChange={(event) => {
            setIntensityValue(event.target.value);
          }}
          label={
            <>
              {'Интенсивность (Вт/см'}
              <sup>{'2'}</sup>
              {'): '}
            </>
          }
          extraLabel={
            <>
              {'*10'}
              <sup>{'8'}</sup>
            </>
          }
        />
        <DataInput
          value={pulseDurationValue}
          onChange={(event) => {
            setPulseDurationValue(event.target.value);
          }}
          label={'Длительность импульса (сек): '}
          extraLabel={
            <>
              {'*10'}
              <sup>{'-13'}</sup>
            </>
          }
        />
      </DataInputsContainer>
    </Window>
  );
};
