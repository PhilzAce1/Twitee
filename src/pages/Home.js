import React, { useEffect } from 'react';
import { BContainer, Flex } from '../styles/globalStyle';
import { Header, P } from '../styles/HomeStyle';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import Slider from '../components/Slider';
import axios from 'axios';
import { useGlobalDispatchContext } from '../context/globalContext';
function Home() {
  const dispatch = useGlobalDispatchContext();
  useEffect(() => {
    axios
      .get('https://twitee-be.herokuapp.com/post/')
      .then((res) => {
        const {
          data: { success, payload },
        } = res;
        if (success) {
          dispatch({ type: 'SET_POST', posts: payload });
        }
      })
      .catch(console.log);
  }, [dispatch]);
  return (
    <BContainer>
      <Flex>
        <Flex width="20%" flow="column" align="flex-start" mobileVertical>
          <Header>Twetee</Header>
          <P>
            TWITEE is a mini and substandard runoff of Twitter, to connect with
            family and friends
          </P>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Link to="signup">
              <Button size="large" type="primary">
                Get Started
              </Button>
            </Link>
            <Link to="login">
              <Button size="large" type="primary">
                Login
              </Button>
            </Link>
          </div>
        </Flex>
        <Flex width="50%" mobileHidden>
          <Slider />
        </Flex>
      </Flex>
    </BContainer>
  );
}
export default Home;
