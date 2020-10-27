import React from 'react';
import { BContainer, Flex } from '../styles/globalStyle';
import SignupForm from '../components/SignupForm';
function Signup() {
  return (
    <BContainer>
      <Flex>
        <Flex width="20%" flow="column" align="flex-start" mobileVertical>
          <SignupForm />
        </Flex>
        <Flex width="50%" mobileHidden></Flex>
      </Flex>
    </BContainer>
  );
}
export default Signup;
