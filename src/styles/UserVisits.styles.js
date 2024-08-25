import styled from 'styled-components';
import { devices } from './media';

export const UserVisitsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 90%;
  max-width: 500px;

  @media ${devices.tablet} {
    max-width: 600px;
  }
`;

export const VisitItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  margin: 5px 0;

  @media ${devices.tablet} {
    padding: 15px;
  }
`;
