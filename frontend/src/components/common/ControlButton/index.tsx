import { FC } from 'react';
import { StyledControlButton } from './styles';
import { ControlButtonPropsType } from './types';

export const ControlButton: FC<ControlButtonPropsType> = (props) => {
  const { value, onClick } = props;

  return <StyledControlButton onClick={onClick}>{value}</StyledControlButton>;
};
