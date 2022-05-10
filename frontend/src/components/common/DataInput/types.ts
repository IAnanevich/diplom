import { ChangeEventHandler, ReactNode } from 'react';

export type DataInputPropsType = {
  label: string | ReactNode;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: HTMLInputElement['value'];
};
