import styled from 'styled-components';
import { devices } from './media';

export const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  width: 90%;
  max-width: 400px;

  @media ${devices.tablet} {
    padding: 40px;
    max-width: 500px;
  }
`;

export const AuthInput = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
  max-width: 300px;

  @media ${devices.tablet} {
    max-width: 400px;
  }
`;

export const AuthButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }

  @media ${devices.tablet} {
    padding: 15px 30px;
  }
`;

export const SuccessMessage = styled.p`
  color: green;
  font-weight: bold;
`;
