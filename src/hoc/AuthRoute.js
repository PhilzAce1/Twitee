import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useGlobalStateContext } from '../context/globalContext';
import { message } from 'antd';
export default function AuthRoute(ComposedClass, isAuth) {
  function AuthenticationCheck(props) {
    const { user } = useGlobalStateContext();
    const history = useHistory();

    useEffect(authChecker, [history, user]);

    function authChecker() {
      if (isAuth) {
        if (!user.id || !user.token) {
          message.error('This is a restricted route');
          return history.push('/login');
        }
      } else {
        if (user.id || user.token) {
          message.success('Logged in');
          return history.push('/posts');
        }
      }
    }
    return <ComposedClass {...props} />;
  }
  return AuthenticationCheck;
}
