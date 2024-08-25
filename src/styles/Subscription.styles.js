import styled from 'styled-components';
import { devices } from './media';

export const SubscriptionContainer = styled.div`
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

export const SubscriptionList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`;

export const SubscriptionItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  margin: 5px 0;

  @media ${devices.tablet} {
    padding: 15px;
  }
`;

export const SubscriptionSelect = styled.select`
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;

  @media ${devices.tablet} {
    padding: 15px;
  }
`;

export const SubscriptionButton = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #218838;
  }

  @media ${devices.tablet} {
    padding: 15px 30px;
  }
`;
