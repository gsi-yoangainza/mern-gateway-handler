import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { login, reset } from '../modules/users/store/authSlice';
import Spinner from '../modules/common/components/Spinner';
import { IUser } from './Register';

export interface ILoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<ILoginForm>({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user, isLoading, isError, isSuccess, message } = useAppSelector((state) => state.auth);

  const { email, password } = formData;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || JSON.stringify(user) !== '{}') {
      navigate('/dashboard');
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e: any) => {
    e.preventDefault();

    const userData: Pick<IUser, 'email' | 'password'> = {
      email,
      password,
    };
    dispatch(login(userData));
  };
  if (isLoading) return <Spinner />;
  return (
    <>
      <section className="heading">
        <h1>Login</h1>
        <p>Please login</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email "
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
