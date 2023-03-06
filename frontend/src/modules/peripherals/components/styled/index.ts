import { Drawer } from 'antd';
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
