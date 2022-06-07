import styled from 'styled-components';
import { COLORS } from '../../../constants/colors';
import { DataInputFieldPropsType } from './types';

export const DataInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const DataInputLabel = styled.p`
  margin: 0 10px 0 0;
  width: 60%;
`;

export const DataInputField = styled.input<DataInputFieldPropsType>`
  background-color: ${COLORS.WHITE};
  border-radius: 3px;
  border: ${(props) => (props.isCorrect ? COLORS.GRAY_EBEBEB : 'red')} inset 2px;
  outline: none;
  height: 18px;
  width: 20%;

  &:focus {
    background-color: ${COLORS.GRAY_EBEBEB};
  }
`;

export const DataInputExtraLabel = styled.p`
  margin: 0 0 0 3px;
  width: 15%;
`;
