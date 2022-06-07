import { FC } from 'react';
import { Window } from '../../common/Window';
import { ControlButton } from '../../common/ControlButton';
import { ControlsWindowPropsType } from './types';
import { ButtonsContainer } from './styles';

export const ControlsWindow: FC<ControlsWindowPropsType> = (props) => {
  const { setParamsAction, stopAction } = props;

  return (
    <Window title={'Управление'}>
      <ButtonsContainer>
        <ControlButton onClick={setParamsAction} value={'Установка параметров'} />
        <ControlButton onClick={stopAction} value={'Стоп'} />
      </ButtonsContainer>
    </Window>
  );
};
