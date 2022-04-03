import { ChangeEventHandler } from 'react';

export type DataInputPropsType = {
  label: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: HTMLInputElement['value'];
};
