import React, { useEffect, useState, useContext } from 'react';
import { BContainer, Flex } from '../styles/globalStyle';
import PostCard from '../components/Card';
import {
  useGlobalStateContext,
  useGlobalDispatchContext,
  GlobalStateContext,
} from '../context/globalContext';
import axios from 'axios';
import { Card } from 'antd';
export default function Posts() {
  const globalState = useContext(GlobalStateContext);
  const dispatch = useGlobalDispatchContext();
  const { posts } = useGlobalStateContext();
  const [resPost, setResPost] = useState(posts);
  const [loading, setLoading] = useState(true);
  const resPostCond = resPost <= 0 ? true : false;
  useEffect(() => {
    setResPost([...posts]);
    setLoading(resPostCond);
    if (globalState.posts.length <= 0) {
      axios
        .get('https://twitee-be.herokuapp.com/post/')
        .then((res) => {
          const {
            data: { success, payload },
          } = res;
          if (success) {
            setResPost(payload);
            dispatch({ type: 'SET_POST', posts: payload });
            setLoading(false);
          }
        })
        .catch(console.log);
    }

    // eslint-disable-next-line
  }, [dispatch, globalState]);
  const postCardList = resPost.map((data, i) => (
    <PostCard data={data} key={i} />
  ));
  const loadingCardList = Array(5)
    .fill(3)
    .map((x, i) => (
      <Card key={i} className="card main_card" loading={loading}></Card>
    ));
  return (
    <BContainer>
      <Flex
        flow="column"
        jusc="flex-start"
        style={{
          overflowY: 'auto',
          paddingTop: '10%',
        }}
      >
        <h2 style={{ color: 'white' }}>Posts </h2>
        {loading ? loadingCardList : postCardList}
      </Flex>
    </BContainer>
  );
}
