import styled from 'styled-components';
import { Button, ButtonGroup, FileInput, Text } from '@blueprintjs/core';

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
  margin-right: 10px;
`;

export const StyledText = styled(Text)`
  margin-top: 10px;
`;

export const LastSpoken = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 10px;
`;

export const ResetLastSpoken = styled(Button)`
  margin-left: 10px;
`;

export const UploadInfo = styled.div`
  align-items: center;
  display: flex;
  margin-top: 20px;
`;
