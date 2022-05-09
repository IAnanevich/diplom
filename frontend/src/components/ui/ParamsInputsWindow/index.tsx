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
    <Window title={'Parameters'}>
      <DataInputsContainer>
        <DataInput
          value={beamRadiusValue}
          onChange={(event) => {
            setBeamRadiusValue(event.target.value);
          }}
          label={'Beam radius (cm): '}
        />
        <DataInput
          value={absCoefficientValue}
          onChange={(event) => {
            setAbsCoefficientValue(event.target.value);
          }}
          label={
            <>
              {'Absorption coefficient (cm'}
              <sup>{'2'}</sup>
              {'): '}
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
              {'Intensity (watt/cm'}
              <sup>{'2'}</sup>
              {'): '}
            </>
          }
        />
        <DataInput
          value={pulseDurationValue}
          onChange={(event) => {
            setPulseDurationValue(event.target.value);
          }}
          label={'Pulse duration (sec): '}
        />
      </DataInputsContainer>
    </Window>
  );
};
