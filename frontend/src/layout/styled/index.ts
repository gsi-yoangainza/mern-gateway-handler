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

  & h1 {
    font-size: 2rem;
    margin-bottom: 0;
  }

  & span.title-icon-dashboard {
    display: flex;
    gap: 5px;
  }
`;

export const StyledMenu = styled(Menu)`
  display: flex;
  width: 100%;
`;

export const LoginFormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #1a1a2a;
`;

export const StyledLayout = styled(Layout)`
  height: 100vh;
`;
