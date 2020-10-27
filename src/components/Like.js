import React, { useState } from 'react';
import { LikeOutlined, LikeFilled } from '@ant-design/icons';
import axios from 'axios';
import { message } from 'antd';
import { useGlobalStateContext } from '../context/globalContext';
function Like(props) {
  const [likes, setLikes] = useState(props.likes);
  const { user } = useGlobalStateContext();
  const likedByUser = likes.find((x) => x.creatorId === user.id);
  const [liked, setLiked] = useState(!!likedByUser);
  function like() {
    axios
      .post(
        'https://twitee-be.herokuapp.com/post/like',
        {
          postId: props.id,
          creatorId: user.id,
        },
        {
          headers: {
            'x-auth-token': user.token,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          message.success('Liked 👍 ');
          setLiked(true);
          setLikes([...likes, res.data.payload]);
        }
      })
      .catch((e) => {
        message.error(e.response.data.message);
      });
  }
  function unlike() {
    const like = likes.find((x) => x.creatorId === user.id);
    axios
      .post(
        'https://twitee-be.herokuapp.com/post/unlike',
        {
          likeId: like.id,
        },
        {
          headers: {
            'x-auth-token': user.token,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          message.success('Unliked 👎');
          setLiked(false);
          const newLike = likes.filter((x) => x.creatorId !== user.id);
          setLikes(newLike);
        }
      })
      .catch((e) => {
        message.error(e.response.data.message);
      });
  }
  return liked ? (
    <LikeFilled onClick={unlike} />
  ) : (
    <LikeOutlined onClick={like} />
  );
}
export default Like;
