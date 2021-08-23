import React from 'react';
import Box from '../Box';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

const Card = styled(Box)`
  border-radius: 20px;
  backgroundColor:#FFF;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.05px;
  shadowColor: #000;
  shadowOffset: {
    width: 0,
    height: 3,
  };
  shadowOpacity: 0.29;
  shadowRadius: 4.65;
  elevation: 7;
`;

export default Card;

const s = {
  container: {
    padding: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
};
