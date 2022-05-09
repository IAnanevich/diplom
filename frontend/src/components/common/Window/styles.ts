import styled from 'styled-components';
import { COLORS } from '../../../constants/colors';

export const WindowContainer = styled.div`
  padding: 10px;
  border: ${COLORS.WHITE} ridge 2px;
  border-radius: 5px;
`;

export const WindowTitle = styled.h3`
  font-weight: normal;
  margin: 0 0 10px 0;
  font-size: 17px;
  background: none;
`;
