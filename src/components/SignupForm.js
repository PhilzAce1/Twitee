import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { useGlobalDispatchContext } from '../context/globalContext';
import axios from 'axios';
function SignupForm(props) {
  const dispatch = useGlobalDispatchContext();
  const history = useHistory();
  const [errors, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    const url = 'https://twitee-be.herokuapp.com/signup';
    setLoading(true);

    try {
      const {
        data: { success, payload },
      } = await axios.post(url, values);
      if (success) {
        message.success('User Created successfully & Logged in');
        window.localStorage.userToken = payload.token;
        dispatch({ type: 'SET_USER', user: payload });
        history.push('/posts');
      } else {
        message.error('User already exist ');
        setError(payload.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error('User already exist ');
    }
  };

  return (
    <Form
      name="signup_form"
      className="login-form"
      onFinish={onFinish}
      size="large"
    >
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
          placeholder="email"
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
          Sign Up
        </Button>
        Or <Link to="/login">Login Now</Link>
      </Form.Item>
    </Form>
  );
}
export default SignupForm;
