import { ChangeEventHandler, ReactNode } from 'react';

type IsCorrectType = boolean;

export type DataInputPropsType = {
  extraLabel?: string | ReactNode;
  isCorrectValue?: IsCorrectType;
  label: string | ReactNode;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: HTMLInputElement['value'];
};

export type DataInputFieldPropsType = {
  isCorrect: IsCorrectType;
};
