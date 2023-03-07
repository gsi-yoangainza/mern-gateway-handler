import React, { useMemo, useState } from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { DashboardFilled } from '@ant-design/icons';

import { StyledHeader, StyledLayout, StyledMenu } from '../styled';
import { intl } from '../../core/helpers/i18nHelper';
import MenuItems from '../../modules/common/components/MenuItems';

const { Content, Footer } = Layout;

interface IProps {
  component?: string;
}

const MainLayout: React.FC<IProps> = (props: IProps) => {
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
    <StyledLayout>
      <StyledHeader>
        <h1
          style={{
            marginRight: '20px',
            background: 'rgba(30, 23, 23, 0.2)',
            padding: 2,
          }}
        >
          <Link to={'/dashboard'}>
            <span className="title-icon-dashboard">
              <DashboardFilled /> {intl('dashboard')}
            </span>
          </Link>
        </h1>
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
      <Footer style={{ textAlign: 'center' }}>
        {intl('gatewayHandler')} ©{new Date().getFullYear()} Created by youstrauss91
      </Footer>
    </StyledLayout>
  );
};

export default MainLayout;
