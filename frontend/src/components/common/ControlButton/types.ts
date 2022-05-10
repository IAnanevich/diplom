import { FormEventHandler } from 'react';

export type ControlButtonPropsType = {
  value: HTMLButtonElement['value'];
  onClick: FormEventHandler<HTMLButtonElement>;
};
