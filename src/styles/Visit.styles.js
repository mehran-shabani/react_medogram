import styled from 'styled-components';
import { devices } from './media';

export const VisitContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 90%;
  max-width: 600px;
  margin: auto;

  @media ${devices.tablet} {
    max-width: 700px;
  }
`;

export const VisitForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
`;

export const VisitInput = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;

  @media ${devices.tablet} {
    padding: 15px;
    font-size: 1.1rem;
  }
`;

export const VisitSelect = styled.select`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;

  @media ${devices.tablet} {
    padding: 15px;
    font-size: 1.1rem;
  }
`;

export const VisitButton = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #218838;
  }

  @media ${devices.tablet} {
    padding: 15px 30px;
    font-size: 1.1rem;
  }
`;

export const VisitList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`;

export const VisitItem = styled.li`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;

  @media ${devices.tablet} {
    padding: 15px;
    font-size: 1.1rem;
  }
`;
