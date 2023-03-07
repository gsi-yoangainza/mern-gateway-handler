import { Drawer, Row } from 'antd';
import styled from 'styled-components';

export const StyledDrawer = styled(Drawer)`
  z-index: 998;
  .ant-drawer-body {
    padding-top: 0px;
    padding-right: 15px;
    padding-left: 15px;
    position: relative;
  }
`;

export const StyledDetailsRow = styled(Row)`
  background-color: #f5f4f7;
  padding: 20px;
`;

export const GatewayPeripheralsDetails = styled.div`
  display: flex;
  gap: 15px;

  & .peripheral-name {
    display: flex;
    gap: 10px;
  }
`;
