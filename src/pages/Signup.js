import React from 'react';
import { BContainer, Flex } from '../styles/globalStyle';
import SignupForm from '../components/SignupForm';
import Slider from '../components/Slider';
function Signup() {
  return (
    <BContainer>
      <Flex>
        <Flex width="20%" flow="column" align="flex-start" mobileVertical>
          <SignupForm />
        </Flex>
        <Flex width="50%" mobileHidden>
          <Slider />
        </Flex>
      </Flex>
    </BContainer>
  );
}
export default Signup;
