import React, { useMemo, useState } from 'react';
import { Button, Divider, Layout, Menu, MenuProps, Space } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import MenuItems from '../../modules/common/components/MenuItems';
import { StyledHeader, StyledMenu } from '../styled';
import { LogoutOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout, reset } from '../../modules/users/store/authSlice';
import { intl } from '../../core/helpers/i18nHelper';

const { Header, Content, Footer } = Layout;

interface IProps {
  component?: string;
  // children: React.ReactNode;
}

const MainLayout: React.FC<IProps> = (props: IProps) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    // navigate('/login');
  };
  const location = useLocation();
  const findName = useMemo(
    () =>
      location.pathname.includes('gateway')
        ? 'Gateways'
        : location.pathname.includes('peripheral')
        ? 'Peripherals'
        : 'Dashboard',
    [location]
  );
  const [current, setCurrent] = useState('');

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };
  return (
    <Layout>
      <StyledHeader>
        <div
          style={{
            float: 'left',
            width: 120,
            height: 31,
            margin: '16px 24px 16px 0',
            background: 'rgba(30, 23, 23, 0.2)',
          }}
          className="asdasdasd"
        />
        <StyledMenu theme="light" mode="horizontal" id="sidebar-menu" selectedKeys={[current]} onClick={onClick}>
          <Menu.Item key="1">
            <Link to={'/gateways'}>{intl('gateways')}</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to={'/peripherals'}>{intl('peripherals')}</Link>
          </Menu.Item>
        </StyledMenu>
        <MenuItems />
      </StyledHeader>
      <Content className="site-layout" style={{ padding: '0 50px' }}>
        <div style={{ display: 'flex', marginTop: 16 }}>
          <h1>{findName}</h1>
        </div>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: 'center' }}>Gateway Handler ©2023 Created by youstrauss91</Footer>
    </Layout>
  );
};

export default MainLayout;
