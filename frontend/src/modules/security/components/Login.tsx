import React, { createRef, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { LoginOutlined } from '@ant-design/icons';

import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { login, reset } from '../../users/store/authSlice';
import { openNotification } from '../../common/utils/utils';
import { IUser } from '../types';
import { intl } from '../../../core/helpers/i18nHelper';
import { StyledSignUpDiv } from '../styled';
import Spinner from '../../common/components/Spinner';

export interface ILoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const formRef = createRef<any>();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user, isLoading, isError, isSuccess, message } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      openNotification('error', message);
    }
    if (isSuccess || JSON.stringify(user) !== '{}') {
      navigate('/dashboard');
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = (e: any) => {
    const userData: Pick<IUser, 'email' | 'password'> = {
      email: e.email,
      password: e.password,
    };
    dispatch(login(userData));
  };
  if (isLoading) return <Spinner />;
  return (
    <div className="container">
      <StyledSignUpDiv>
        <span>{intl('noAccount')}</span>
        <Link to={'/register'}>
          <Button type="primary">{intl('signUp')}</Button>
        </Link>
      </StyledSignUpDiv>
      <section className="heading">
        <h1>
          <LoginOutlined style={{ marginRight: '5px' }} />
          {intl('login')}
        </h1>
        <p>{intl('gatewayHandler')}</p>
      </section>
      <section className="form">
        <Form style={{ maxWidth: 600 }} onFinish={onSubmit} form={form} ref={formRef} scrollToFirstError>
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input placeholder="E-mail" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="btn btn-block">
              {intl('login')}
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  );
};

export default Login;
