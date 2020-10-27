import React from 'react';
import { DeleteFilled } from '@ant-design/icons';
import { Popconfirm, message } from 'antd';
import axios from 'axios';
import {
  useGlobalStateContext,
  useGlobalDispatchContext,
} from '../context/globalContext';
import { useHistory } from 'react-router-dom';
import { deletePost } from '../util/updateComment';
const key = 'delete';
function DeleteButton(props) {
  const history = useHistory();
  const dispatch = useGlobalDispatchContext();
  const { user, posts } = useGlobalStateContext();
  function confirm(e) {
    message.loading({ content: 'Deleting...', key });
    if (!user.token) {
      message.error('You need to login first');
      return history.push('/login');
    }
    const reqData = {
      postId: props.id,
    };
    const headers = {
      'x-auth-token': user.token,
    };
    axios
      .delete('https://twitee-be.herokuapp.com/post', {
        headers,
        data: reqData,
      })
      .then((res) => {
        if (res.data.success) {
          message.success({
            content: 'Deleted Successfully',
            key,
            duration: 2,
          });
          const newPost = deletePost(posts, props.id);
          dispatch({ type: 'SET_POST', posts: newPost });
        }
      })
      .catch((e) => {
        console.log(e.response);
        message.error(`${e.response.data.message}😞 `);
      });
  }

  function cancel(e) {
    console.log(e);
  }
  return (
    <Popconfirm
      title="Are you sure delete this task?"
      onConfirm={confirm}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
    >
      <DeleteFilled />
    </Popconfirm>
  );
}

export default DeleteButton;
