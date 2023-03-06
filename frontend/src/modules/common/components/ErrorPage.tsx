import { RollbackOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('dashboard');
  };
  return (
    <div
      id="error-page"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>ERROR 400 Not Found</p>
      <Button type="primary" icon={<RollbackOutlined />} onClick={goBack}>
        Go back
      </Button>
    </div>
  );
};

export default ErrorPage;
