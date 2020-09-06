import React from 'react';
import styled from 'styled-components';
import Pano from './Pano';
import { tour } from '../data';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Widget = () => {
  return (
    <Wrapper>
      <Pano data={tour} />
    </Wrapper>
  );
};

export default Widget;
