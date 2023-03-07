import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { useAppDispatch } from '../../../app/hooks';
import { logout, reset } from '../../users/store/authSlice';
import { intl } from '../../../core/helpers/i18nHelper';

export const MenuItemContainer = styled.div`
  display: flex;
  & .gateways {
    align-self: center;
  }
  & ul {
    display: flex;
    justify-content: space-between;
    list-style: none;
  }
`;

export const NavigationDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MenuItems: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  const loginActions = () => {
    return (
      <li>
        <Button type="primary" icon={<LogoutOutlined />} onClick={onLogout}>
          {intl('logout')}
        </Button>
      </li>
    );
  };
  return (
    <MenuItemContainer>
      <ul>{loginActions()}</ul>
    </MenuItemContainer>
  );
};

export default MenuItems;
