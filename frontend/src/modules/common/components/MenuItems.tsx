import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { debounce, isEmpty } from 'lodash';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { logout, reset } from '../../users/store/authSlice';
import styled from 'styled-components';
import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

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
  const { user } = useAppSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  const loginActions = () => {
    return (
      <li>
        <Button type="link" icon={<LogoutOutlined />} onClick={onLogout}>
          Logout
        </Button>
      </li>
    );
  };
  return (
    <MenuItemContainer>
      {/* <div className="logo">
        <Link to={'/dashboard'}>Gateway List</Link>
      </div> */}

      <ul>{loginActions()}</ul>
    </MenuItemContainer>
  );
};

export default MenuItems;
