import { FC } from 'react';
import { DataInputPropsType } from './types';
import { DataInputContainer, DataInputField, DataInputLabel } from './styles';

export const DataInput: FC<DataInputPropsType> = (props) => {
  const { label, onChange, value } = props;

  return (
    <DataInputContainer>
      <DataInputLabel>{label}</DataInputLabel>
      <DataInputField value={value} onChange={onChange} />
    </DataInputContainer>
  );
};
