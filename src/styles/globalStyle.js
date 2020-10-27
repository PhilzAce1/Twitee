import styled, { createGlobalStyle, css } from 'styled-components';
import { normalize } from 'styled-normalize';
import bgImage from '../assets/images/bg.gif';

export const Flex = styled.div`
  display: flex;
  flex-flow: ${(props) => props.flow || 'row'} nowrap;
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '100%'};
  justify-content: ${(props) => props.jusc || 'center'};
  align-items: ${(props) => props.align || 'center'};
  .card {
    width: 500px;
  }
  .main_card {
    margin: 20px 0;
  }
  @media (max-width: 500px) {
    .card {
      width: 80%;
    }
    ${(props) =>
      props.mobileVertical &&
      css`
        flex-flow: column nowrap;
        width: 100%;
        align-items: center;
      `};
    ${(props) =>
      props.mobileHidden &&
      css`
        display: none;
      `};
  }
`;
export const GlobalStyle = createGlobalStyle`
${normalize}
@import url('https://fonts.googleapis.com/css2?family=Luckiest+Guy&family=Peddana&family=Poppins&display=swap');
${normalize}
* {
  text-decoration: none;
}
html {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    font-size: 16px;
    max-height:100vh;
    overflow-y:hidden
  
  
}
body {
  font-size: 16px;
  font-family:'Poppins', sans-serif;
  overscroll-behavior: none;
  overflow-x: hidden;
}
`;
export const BContainer = styled.div`
  background-image: url(${bgImage});
  height: 100vh;
  width: 100vw;
  padding: 0 20px;
`;
