import styled from 'styled-components';

export const AuthContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
`;

export const AuthInput = styled.input`
    width: 38.3%;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
`;

export const AuthButton = styled.button`
    width: 40%;  
    padding: 10px;
    margin: 10px 0;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

export const SuccessMessage = styled.p`
    color: green;
    font-size: 16px;
    margin-top: 20px;
`;

export const TimerText = styled.p`
    font-size: 14px;
    color: #888;
    margin-top: 10px;
`;
styled(AuthButton)`
    background-color: #28a745;  /* رنگ متفاوت برای دکمه ارسال مجدد کد */
`;
export const ResendButton = styled(AuthButton)`
    background-color: #28a745;  /* رنگ متفاوت برای دکمه ارسال مجدد کد */
`;