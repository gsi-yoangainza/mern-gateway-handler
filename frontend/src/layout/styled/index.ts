import styled from 'styled-components';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

export const StyledHeader = styled(Header)`
  display: flex;
  position: 'sticky';
  top: 0;
  z-index: 1;
  width: '100%';
  padding: 0px 50px;

  & ul {
    margin-bottom: 0;
  }
  & a {
    font-weight: bold;
  }
`;

export const StyledMenu = styled(Menu)`
  display: flex;
  width: 100%;
`;
