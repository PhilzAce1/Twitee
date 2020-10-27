import React, { useState, Fragment } from 'react';
import { Comment, Avatar, Form, Button, List, Input, message } from 'antd';
import axios from 'axios';
import {
  useGlobalDispatchContext,
  useGlobalStateContext,
} from '../context/globalContext';
import { arraySort, arrangeComment } from '../util/updateComment';

const { TextArea } = Input;

const CommentList = ({ comments }) => {
  const newComment = arrangeComment(comments);
  return (
    <List
      dataSource={newComment}
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      renderItem={(props) => <Comment {...props} />}
    />
  );
};
const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        disabled={submitting}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);

export default function CommentSection(props) {
  const { user, posts } = useGlobalStateContext();
  const dispatch = useGlobalDispatchContext();
  const [submitting, setSubmitting] = useState(false);
  const { comment } = props;
  const [value, setValue] = useState('');
  function handleChange(e) {
    setValue(e.target.value);
  }
  function handleSubmit(e) {
    if (value.length <= 0) {
      return message.info('You have to input a text');
    }
    if (!user.id || !user.token) {
      return message.error('Please login before you comment');
    }
    setSubmitting(true);
    const reqData = {
      text: value,
      postId: props.storyId,
      creatorId: user.id,
    };
    const headers = {
      'x-auth-token': user.token,
    };
    axios
      .post('https://twitee-be.herokuapp.com/comment/create', reqData, {
        headers,
      })
      .then((res) => {
        const {
          data: { success, payload },
        } = res;
        if (success) {
          message.success('Commented');
          setValue('');

          setSubmitting(false);
          const prepPayload = {
            ...payload,
            creator: user,
          };
          const newPost = arraySort(posts, props.storyId, prepPayload);

          dispatch({ type: 'SET_POST', posts: newPost });
        }
      })
      .catch((err) => console.error(err.response));
  }

  return (
    <Fragment>
      <Comment
        avatar={
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
        }
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
      {comment.length > 0 && <CommentList comments={comment} />}
    </Fragment>
  );
}
