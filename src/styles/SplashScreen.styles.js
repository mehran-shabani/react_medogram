import styled from 'styled-components';
import { motion } from 'framer-motion';
import { devices } from './media';

export const SplashContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fff;
  flex-direction: column;
  padding: 20px;

  @media ${devices.tablet} {
    padding: 40px;
  }
`;

export const Logo = styled(motion.img)`
  width: 120px;
  height: 120px;
  margin-bottom: 20px;

  @media ${devices.tablet} {
    width: 180px;
    height: 180px;
  }
`;

export const Text = styled(motion.div)`
  font-size: 1.5rem;
  color: #007bff;
  text-align: center;

  @media ${devices.tablet} {
    font-size: 2rem;
  }
`;

export const SubText = styled(motion.div)`
  font-size: 1rem;
  color: #007bff;
  margin-top: 10px;

  @media ${devices.tablet} {
    font-size: 1.2rem;
  }
`;
