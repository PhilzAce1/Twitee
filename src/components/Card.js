import React, { useState } from 'react';
import { Card } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import Like from './Like';
import DeleteButton from './DeleteButton';
import CommentSection from '../components/Comment';
import moment from 'moment';

const { Meta } = Card;
function PostCard(props) {
  const {
    data: { text, createdAt, id, creator, comments, likes },
  } = props;
  const [displayComment, setDisplayCommnet] = useState(false);
  if (likes === undefined || creator === undefined) {
    return <div></div>;
  }
  return (
    <div className="main_card">
      <Card
        className="card "
        actions={[
          <MessageOutlined
            onClick={() => setDisplayCommnet(!displayComment)}
          />,
          <Like id={id} number={likes.length} likes={likes} />,
          <DeleteButton id={id} />,
        ]}
      >
        <Meta
          title={creator.name}
          description={`createdAt: ${moment(createdAt).format('ll')}`}
        />

        {text}
      </Card>
      <div
        className="card"
        style={{
          background: 'white',
          display: displayComment ? 'block' : 'none',
          padding: '20px',
        }}
      >
        <CommentSection comment={comments} storyId={id} />
      </div>
    </div>
  );
}

export default PostCard;
