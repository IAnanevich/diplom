import { FC } from 'react';
import { Window } from '../../common/Window';
import { CalculatingProgressWindowPropsType } from './types';
import { ParamContainer, ParamLabel, ParamValue } from './styles';

export const CalculatingProgressWindow: FC<CalculatingProgressWindowPropsType> = (props) => {
  const { stepValue, timeValue } = props;

  return (
    <Window title={'Ход расчётов'}>
      <ParamContainer>
        <ParamLabel>{'Шаг: '}</ParamLabel>
        <ParamValue>{stepValue}</ParamValue>
      </ParamContainer>
      <ParamContainer style={{ marginTop: 10 }}>
        <ParamLabel>{'Время (фс): '}</ParamLabel>
        <ParamValue>{Number(timeValue).toFixed(2)}</ParamValue>
      </ParamContainer>
    </Window>
  );
};
