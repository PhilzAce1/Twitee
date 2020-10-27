import React from 'react';
import { BContainer, Flex } from '../styles/globalStyle';
import LoginForm from '../components/LoginForm';
import Slider from '../components/Slider';
function Login() {
  return (
    <BContainer>
      <Flex>
        <Flex width="20%" flow="column" align="flex-start" mobileVertical>
          <LoginForm />
        </Flex>
        <Flex width="50%" mobileHidden>
          <Slider />
        </Flex>
      </Flex>
    </BContainer>
  );
}
export default Login;
