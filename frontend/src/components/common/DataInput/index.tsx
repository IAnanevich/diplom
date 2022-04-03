import { FC } from 'react';
import { DataInputPropsType } from 'root/components/common/DataInput/types';

export const DataInput: FC<DataInputPropsType> = (props) => {
  const { label, onChange, value } = props;

  return (
    <div style={{ marginBottom: 10, display: 'flex', flexDirection: 'row' }}>
      <p style={{ display: 'flex', margin: 0, marginRight: 10 }}>{label}</p>
      <input value={value} onChange={onChange} />
    </div>
  );
};
