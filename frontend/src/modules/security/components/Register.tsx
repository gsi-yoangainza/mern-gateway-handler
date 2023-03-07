import React, { createRef, useEffect } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { intl } from '../../../core/helpers/i18nHelper';
import { openNotification } from '../../common/utils/utils';
import { register, reset } from '../../users/store/authSlice';
import { IUser } from '../types';
import { StyledSignUpDiv } from '../styled';
import Spinner from '../../common/components/Spinner';

const Register: React.FC = () => {
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
    if (e.password !== e.password2) {
      openNotification('error', intl('passwordValidation'));
    } else {
      const userData: IUser = {
        name: e.name,
        email: e.email,
        password: e.password,
      };
      dispatch(register(userData));
    }
  };
  if (isLoading) return <Spinner />;
  return (
    <div className="container">
      <StyledSignUpDiv>
        <span>{intl('haveAccount')}</span>
        <Link to={'/login'}>
          <Button type="primary">{intl('login')}</Button>
        </Link>
      </StyledSignUpDiv>
      <section className="heading">
        <h1>
          <UserOutlined style={{ marginRight: '5px' }} />
          {intl('register')}
        </h1>
        <p>{intl('pleaseCreateAccount')}</p>
      </section>

      <section className="form">
        <Form style={{ maxWidth: 600 }} onFinish={onSubmit} form={form} ref={formRef} scrollToFirstError>
          <Form.Item name="name" rules={[{ required: true, whitespace: true }]}>
            <Input placeholder="Name" />
          </Form.Item>
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
            hasFeedback
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="password2"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="btn btn-block">
              {intl('register')}
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  );
};

export default Register;
