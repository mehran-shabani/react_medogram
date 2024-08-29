import styled from 'styled-components';
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
styled(AuthButton)`
    background-color: #28a745;  /* رنگ متفاوت برای دکمه ارسال مجدد کد */
`;
styled(AuthButton)`
    background-color: #28a745;  /* رنگ متفاوت برای دکمه ارسال مجدد کد */
`;
