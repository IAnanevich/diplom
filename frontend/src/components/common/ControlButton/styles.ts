import styled from 'styled-components';
import { COLORS } from '../../../constants/colors';

export const StyledControlButton = styled.button`
  background-color: ${COLORS.WHITE};
  border: ${COLORS.GRAY_737373} solid 1px;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 3px;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    box-shadow: 0 0 3px ${COLORS.GRAY_737373};
  }

  &:active {
    cursor: pointer;
    transform: scale(1);
    box-shadow: 0 0 0;
  }
`;
