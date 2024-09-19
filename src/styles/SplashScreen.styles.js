import styled from 'styled-components';
import { motion } from 'framer-motion';
import { devices } from './media';
styled(motion.img)`
  width: 120px;
  height: 120px;
  margin-bottom: 20px;

  @media ${devices.tablet} {
    width: 180px;
    height: 180px;
  }
`;
styled(motion.div)`
  font-size: 1.5rem;
  color: #007bff;
  text-align: center;

  @media ${devices.tablet} {
    font-size: 2rem;
  }
`;
styled(motion.div)`
  font-size: 1rem;
  color: #007bff;
  margin-top: 10px;

  @media ${devices.tablet} {
    font-size: 1.2rem;
  }
`;
