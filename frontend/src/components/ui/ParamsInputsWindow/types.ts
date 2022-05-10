import { SetValueActionType } from '../../../types/common';

export type ParamsInputsWindowPropsType = {
  beamRadiusValue: HTMLInputElement['value'];
  setBeamRadiusValue: SetValueActionType;
  absCoefficientValue: HTMLInputElement['value'];
  setAbsCoefficientValue: SetValueActionType;
  intensityValue: HTMLInputElement['value'];
  setIntensityValue: SetValueActionType;
  pulseDurationValue: HTMLInputElement['value'];
  setPulseDurationValue: SetValueActionType;
};
