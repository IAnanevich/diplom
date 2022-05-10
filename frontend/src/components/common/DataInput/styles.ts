import styled from 'styled-components';
import { COLORS } from '../../../constants/colors';

export const DataInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const DataInputLabel = styled.p`
  display: flex;
  margin: 0 10px 0 0;
`;

export const DataInputField = styled.input`
  background-color: ${COLORS.WHITE};
  border-radius: 3px;
  border: ${COLORS.GRAY_EBEBEB} inset 2px;
  outline: none;

  &:focus {
    background-color: ${COLORS.GRAY_EBEBEB};
  }
`;
