import { ChangeEventHandler, ReactNode } from 'react';

type IsCorrectType = boolean;

export type DataInputPropsType = {
  label: string | ReactNode;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: HTMLInputElement['value'];
  isCorrectValue?: IsCorrectType;
};

export type DataInputFieldPropsType = {
  isCorrect: IsCorrectType;
};
