import { ControlButtonPropsType } from '../../common/ControlButton/types';

export type ControlsWindowPropsType = {
  setParamsAction: ControlButtonPropsType['onClick'];
  stopAction: ControlButtonPropsType['onClick'];
};
