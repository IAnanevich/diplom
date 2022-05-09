import { FC } from 'react';
import { Window } from '../../common/Window';
import { CalculatingProgressWindowPropsType } from './types';
import { ParamContainer, ParamLabel, ParamValue } from './styles';

export const CalculatingProgressWindow: FC<CalculatingProgressWindowPropsType> = (props) => {
  const { stepValue, timeValue } = props;

  return (
    <Window title={'Calculating progress'}>
      <ParamContainer>
        <ParamLabel>{'Step: '}</ParamLabel>
        <ParamValue>{stepValue}</ParamValue>
      </ParamContainer>
      <ParamContainer style={{ marginTop: 10 }}>
        <ParamLabel>{'Time: '}</ParamLabel>
        <ParamValue>{timeValue}</ParamValue>
      </ParamContainer>
    </Window>
  );
};
