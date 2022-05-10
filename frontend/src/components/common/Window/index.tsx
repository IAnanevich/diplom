import { FC } from 'react';
import { WindowContainer, WindowTitle } from '../Window/styles';
import { WindowPropsType } from '../Window/types';

export const Window: FC<WindowPropsType> = (props) => {
  const { title, children } = props;

  return (
    <WindowContainer>
      <WindowTitle>{title}</WindowTitle>
      {children}
    </WindowContainer>
  );
};
