import React, { useState } from 'react';
import { Flex } from '../styles/globalStyle';
import { Button, Modal, Input, message } from 'antd';
import {
  useGlobalStateContext,
  useGlobalDispatchContext,
} from '../context/globalContext';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const { TextArea } = Input;
export default function Header(props) {
  const dispatch = useGlobalDispatchContext();
  const { user, posts } = useGlobalStateContext();
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');
  const history = useHistory();
  async function createStory(data) {
    const url = 'https://twitee-be.herokuapp.com/post/create';
    const reqData = {
      text: value,
      creatorId: user.id,
    };
    const headers = {
      'x-auth-token': user.token,
    };
    try {
      const {
        data: { success, payload },
      } = await axios.post(url, reqData, { headers });
      if (success) {
        message.success('Post Created');
        const readPayLoad = {
          ...payload,
          creator: user,
          likes: [],
          comments: [],
        };
        const newPosts = [readPayLoad, ...posts];
        dispatch({ type: 'SET_POST', posts: newPosts });
        setIsOpen(false);
      }
    } catch (error) {
      console.log(error.response);
      message.error(error.response.data.message);
    }
  }

  async function handleOk() {
    if (!value) {
      return message.info('You have to write some twits 😏 ');
    }
    if (!user.id || !user.token) {
      history.push('/login');
    }

    try {
      await createStory();
    } catch (error) {
      console.log(error);
    }
  }
  function handleCancel() {
    setIsOpen(false);
  }
  function logout() {
    dispatch({ type: 'SET_USER', user: {} });
    window.localStorage.user = null;
    history.push('/login');
  }
  return (
    <Flex
      style={{
        position: 'absolute',
        height: '7%',
        background: 'gray',
        zIndex: '3',
        maxWidth: '100%',
        overflow: 'hidden',
      }}
      jusc="space-around"
    >
      <Modal
        title="Create Story"
        onOk={handleOk}
        onCancel={handleCancel}
        visible={isOpen}
      >
        <TextArea onChange={(e) => setValue(e.target.value)}></TextArea>
      </Modal>
      <h1>Twitee</h1>
      {user && !user.id && (
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      )}

      {user && user.id && <Button onClick={logout}>Logout</Button>}
      <Button type="primary" onClick={() => setIsOpen(true)}>
        CreateStory
      </Button>
    </Flex>
  );
}
