import styled from 'styled-components';

export const Header = styled.h1`
  font-size: 4em;
  color: yellow;
  @media (max-width: 500px) {
  }
`;
export const P = styled.p`
  font-size: 1.6em;
  padding-right: 20px;
  color: ${(props) => props.color || 'white'};
`;
