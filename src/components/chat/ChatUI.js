// src/components/Chat/ChatUI.js
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { IoCheckmarkDone } from 'react-icons/io5';

// انیمیشن تایپ
export const typingAnimation = keyframes`
    0%, 100% { transform: translateY(0px) }
    50% { transform: translateY(-2px) }
`;

// تم‌های روشن و تاریک
export const lightTheme = {
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
    headerBackground: 'linear-gradient(135deg, #075e54 0%, #128c7e 100%)',
    headerText: '#ffffff',
    userMessageBackground: 'linear-gradient(135deg, #dcf8c6 0%, #c5e1a5 100%)',
    botMessageBackground: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
    inputBackground: '#f0f2f5',
    inputFocusBackground: '#ffffff',
    sendButtonColor: '#128c7e',
    sendButtonHoverColor: '#075e54',
    text: '#2c3e50',
    errorBackground: '#fff5f5',
    errorText: '#c53030',
    shadowLight: '0 4px 14px 0 rgba(0, 0, 0, 0.1)',
    shadowMedium: '0 6px 20px rgba(0, 0, 0, 0.15)',
};

export const darkTheme = {
    background: 'linear-gradient(135deg, #1f2c33 0%, #131920 100%)',
    headerBackground: 'linear-gradient(135deg, #2a3942 0%, #1f2c33 100%)',
    headerText: '#e9edef',
    userMessageBackground: 'linear-gradient(135deg, #005c4b 0%, #00483b 100%)',
    botMessageBackground: 'linear-gradient(135deg, #202c33 0%, #1a242b 100%)',
    inputBackground: '#2a3942',
    inputFocusBackground: '#3b4a54',
    sendButtonColor: '#00a884',
    sendButtonHoverColor: '#008c6f',
    text: '#e9edef',
    errorBackground: '#342424',
    errorText: '#fc8181',
    shadowLight: '0 4px 14px 0 rgba(0, 0, 0, 0.3)',
    shadowMedium: '0 6px 20px rgba(0, 0, 0, 0.4)',
};

// استایل‌ها
export const ChatContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    background: ${props => props.theme.background};
    box-shadow: ${props => props.theme.shadowMedium};
    border-radius: 20px;
    overflow: hidden;
    color: ${props => props.theme.text};
    position: relative;
    direction: rtl;

    @media (max-width: 768px) {
        border-radius: 0;
    }
`;

export const ChatHeader = styled.div`
    background: ${props => props.theme.headerBackground};
    color: ${props => props.theme.headerText};
    padding: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: ${props => props.theme.shadowLight};
    z-index: 10;
`;

export const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 16px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50px;
    transition: all 0.3s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.2);
    }

    svg {
        font-size: 1.4rem;
    }
`;

export const MessageContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    scroll-behavior: smooth;
`;

export const MessageBubble = styled(motion.div)`
    padding: 1rem 1.4rem;
    border-radius: 18px;
    max-width: 75%;
    word-wrap: break-word;
    line-height: 1.6;
    position: relative;
    box-shadow: ${props => props.theme.shadowLight};
`;

export const UserMessage = styled(MessageBubble)`
    align-self: flex-end;
    background: ${props => props.theme.userMessageBackground};
    color: ${props => props.theme.headerText};
    margin-left: 40px;
`;

export const BotMessage = styled(MessageBubble)`
    align-self: flex-start;
    background: ${props => props.theme.botMessageBackground};
    margin-right: 40px;
    border-bottom-left-radius: 8px;
`;

export const InputContainer = styled.div`
    display: flex;
    padding: 1.2rem;
    background: ${props => props.theme.headerBackground};
    gap: 12px;
    align-items: flex-end;
    box-shadow: ${props => props.theme.shadowLight};
`;

export const InputField = styled.textarea`
    flex: 1;
    padding: 12px 20px;
    border: none;
    border-radius: 25px;
    font-size: 1rem;
    background: ${props => props.theme.inputBackground};
    color: ${props => props.theme.text};
    resize: none;
    min-height: 24px;
    max-height: 120px;
    transition: all 0.3s ease;
    direction: rtl;

    &:focus {
        outline: none;
        background: ${props => props.theme.inputFocusBackground};
        box-shadow: 0 0 0 2px ${props => props.theme.sendButtonColor};
    }

    &::placeholder {
        color: ${props => props.theme.text}80;
    }
`;

export const ActionButton = styled.button`
    background: none;
    border: none;
    color: ${props => props.theme.sendButtonColor};
    font-size: 1.5rem;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

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

export const SendButton = styled(ActionButton)`
    background: ${props => props.theme.sendButtonColor};
    color: white;
    padding: 10px;

    &:hover {
        background: ${props => props.theme.sendButtonHoverColor};
        color: white;
    }
`;

export const ErrorMessage = styled(motion.div)`
    background: ${props => props.theme.errorBackground};
    color: ${props => props.theme.errorText};
    padding: 12px 20px;
    margin: 10px;
    border-radius: 10px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    svg {
        font-size: 1.2rem;
    }
`;

export const TypingIndicator = styled.div`
    align-self: flex-start;
    background: ${props => props.theme.botMessageBackground};
    padding: 1rem;
    border-radius: 18px;
    display: flex;
    align-items: center;
    gap: 4px;
    margin-right: 40px;
    box-shadow: ${props => props.theme.shadowLight};

    span {
        width: 4px;
        height: 4px;
        background: ${props => props.theme.text};
        border-radius: 50%;
        animation: ${typingAnimation} 1s infinite;

        &:nth-child(2) {
            animation-delay: 0.2s;
        }
        &:nth-child(3) {
            animation-delay: 0.4s;
        }
    }
`;

// کامپوننت پیام
export const MessageUI = ({ message }) => {
    const isUser = message.sender === 'user';
    const MessageComponent = isUser ? UserMessage : BotMessage;

    return (
        <MessageComponent
            initial={{ opacity: 0, scale: 0.8, x: isUser ? 20 : -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: isUser ? 20 : -20 }}
            transition={{ duration: 0.3 }}
        >
            <div className="message-content">{message.text}</div>
            <div className="message-footer" style={{ fontSize: '0.8rem', marginTop: '6px' }}>
                <span>{message.timestamp}</span>
                {isUser && <IoCheckmarkDone style={{ marginRight: '5px' }} />}
            </div>
        </MessageComponent>
    );
};
