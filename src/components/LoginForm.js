import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { useGlobalDispatchContext } from '../context/globalContext';

import axios from 'axios';
function LoginForm(props) {
  const dispatch = useGlobalDispatchContext();
  const history = useHistory();
  const [errors, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    const url = 'https://twitee-be.herokuapp.com/login';
    setLoading(true);

    try {
      const {
        data: { success, payload },
      } = await axios.post(url, values);
      if (success) {
        message.success('User  successfully  Logged in');
        window.localStorage.user = JSON.stringify(payload);
        dispatch({ type: 'SET_USER', user: payload });
        return history.push('/posts');
      } else {
        message.error('Wrong Login Credentials ');
        setLoading(false);
        return setError(payload.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error(error.response.data.message);
    }
  };

  return (
    <Form name="normal_login" className="login-form" onFinish={onFinish}>
      <Form.Item>
        {errors && (
          <p
            style={{
              color: 'red',
            }}
          ></p>
        )}
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
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          size="large"
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          loading={loading}
          disabled={loading}
        >
          Login
        </Button>
        Or <Link to="/signup">Register Now</Link>
      </Form.Item>
    </Form>
  );
}
export default LoginForm;
