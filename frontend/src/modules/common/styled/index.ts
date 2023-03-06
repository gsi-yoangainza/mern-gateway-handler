import { Spin } from 'antd';
import styled from 'styled-components';

export const ActionsContainer = styled.div``;

export const FormSpin = styled(Spin)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background: #ffffff90;
  height: 100%;
  width: 452px;
  z-index: 10000;
`;

export const ContainerForm = styled.fieldset`
  padding: 5px 10px;
  .ant-row {
    display: block;
  }
  .ant-form-item {
    margin-bottom: 15px !important;
  }
`;

export const DrawerFooterActions = styled.div`
  display: flex;
  justify-content: end;
  gap: 10px;
`;
