// src/components/Chat/ToggleModeButton.js
import React from 'react';
import styled from 'styled-components';
import { IoMoon, IoSunny, IoMedical, IoList } from 'react-icons/io5';

const Button = styled.button`
    background: none;
    border: none;
    color: ${props => props.theme.sendButtonColor};
    font-size: 1.4rem;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    margin-left: 8px;

    &:hover {
        color: ${props => props.theme.sendButtonHoverColor};
        background: rgba(255, 255, 255, 0.1);
        transform: scale(1.1);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const ToggleModeButton = ({ type, isActive, toggleMode }) => {
    if (type === 'theme') {
        return (
            <Button onClick={toggleMode}>
                {isActive ? <IoSunny /> : <IoMoon />}
            </Button>
        );
    }

    if (type === 'mode') {
        return (
            <Button onClick={toggleMode}>
                {isActive ? <IoList /> : <IoMedical />}
            </Button>
        );
    }

    return null;
};

export default ToggleModeButton;
