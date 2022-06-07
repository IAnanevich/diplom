import { FC } from 'react';
import { DataInputPropsType } from './types';
import { DataInputContainer, DataInputExtraLabel, DataInputField, DataInputLabel } from './styles';

export const DataInput: FC<DataInputPropsType> = (props) => {
  const { label, onChange, value, isCorrectValue = true, extraLabel } = props;

  return (
    <DataInputContainer>
      <DataInputLabel>{label}</DataInputLabel>
      <DataInputField value={value} onChange={onChange} isCorrect={isCorrectValue} />
      <DataInputExtraLabel>{extraLabel}</DataInputExtraLabel>
    </DataInputContainer>
  );
};
