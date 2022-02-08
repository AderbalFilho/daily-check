import styled from 'styled-components';
import { ButtonGroup, FileInput, Text } from '@blueprintjs/core';

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`;

export const StyledButtonGroup = styled(ButtonGroup)`
  margin-top: 10px;
`;

export const StyledFileInput = styled(FileInput)`
  margin-top: 20px;
`;

export const StyledText = styled(Text)`
  margin-top: 10px;
`;
