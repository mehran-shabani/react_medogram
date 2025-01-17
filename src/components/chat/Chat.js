// ChatBot.js
import React, { useState, useRef, useEffect, useContext, useCallback } from 'react';
import styled, { ThemeProvider, keyframes } from 'styled-components';
import { AuthContext } from '../Auth/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
    IoSend,
    IoHappyOutline,
    IoPersonCircleOutline,
    IoMoon,
    IoSunny,
    IoClose,
    IoCheckmarkDone,
} from 'react-icons/io5';

// تعریف انیمیشن تایپ
const typingAnimation = keyframes`
    0%, 100% { transform: translateY(0px) }
    50% { transform: translateY(-2px) }
`;

// تعریف تم‌های روشن و تاریک
const lightTheme = {
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

const darkTheme = {
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

// استایل‌های اصلی
const ChatContainer = styled(motion.div)`
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
    direction: rtl; /* اضافه شده برای راست‌به‌چپ شدن */

    @media (max-width: 768px) {
        border-radius: 0;
    }
`;

const ChatHeader = styled.div`
    background: ${props => props.theme.headerBackground};
    color: ${props => props.theme.headerText};
    padding: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: ${props => props.theme.shadowLight};
    z-index: 10;
`;

const UserInfo = styled.div`
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

const MessageContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    scroll-behavior: smooth;
`;

const MessageBubble = styled(motion.div)`
    padding: 1rem 1.4rem;
    border-radius: 18px;
    max-width: 75%;
    word-wrap: break-word;
    line-height: 1.6;
    position: relative;
    box-shadow: ${props => props.theme.shadowLight};
`;

const UserMessage = styled(MessageBubble)`
    align-self: flex-end;
    background: ${props => props.theme.userMessageBackground};
    color: ${props => props.theme.headerText};
    margin-left: 40px;
`;

const BotMessage = styled(MessageBubble)`
    align-self: flex-start;
    background: ${props => props.theme.botMessageBackground};
    margin-right: 40px;
    border-bottom-left-radius: 8px;
`;

const InputContainer = styled.div`
    display: flex;
    padding: 1.2rem;
    background: ${props => props.theme.headerBackground};
    gap: 12px;
    align-items: flex-end;
    box-shadow: ${props => props.theme.shadowLight};
`;

const InputField = styled.textarea`
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
    direction: rtl; /* برای راست‌به‌چپ نوشتن پیام */

    &:focus {
        outline: none;
        background: ${props => props.theme.inputFocusBackground};
        box-shadow: 0 0 0 2px ${props => props.theme.sendButtonColor};
    }

    &::placeholder {
        color: ${props => props.theme.text}80;
    }
`;

const ActionButton = styled.button`
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

const SendButton = styled(ActionButton)`
    background: ${props => props.theme.sendButtonColor};
    color: white;
    padding: 10px;

    &:hover {
        background: ${props => props.theme.sendButtonHoverColor};
        color: white;
    }
`;

const ErrorMessage = styled(motion.div)`
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

const TypingIndicator = styled.div`
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

        &:nth-child(2) { animation-delay: 0.2s; }
        &:nth-child(3) { animation-delay: 0.4s; }
    }
`;

// کامپوننت پیام
const Message = ({ message }) => {
    const MessageComponent = message.sender === 'user' ? UserMessage : BotMessage;

    return (
        <MessageComponent
            initial={{ opacity: 0, scale: 0.8, x: message.sender === 'user' ? 20 : -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: message.sender === 'user' ? 20 : -20 }}
            transition={{ duration: 0.3 }}
        >
            <div className="message-content">{message.text}</div>
            <div className="message-footer">
                <span style={{ fontSize: '0.8rem' }}>{message.timestamp}</span>
                {message.sender === 'user' && <IoCheckmarkDone style={{ marginRight: '5px' }} />}
            </div>
        </MessageComponent>
    );
};

// کامپوننت اصلی چت
const ChatBot = () => {
    const [messages, setMessages] = useState([
        {
            id: 'welcome',
            text: "سلام! من دستیار هوشمند پزشک هستم. چطور می‌توانم کمکتان کنم؟",
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString(),
        }
    ]);
    const [input, setInput] = useState('');
    const [profile, setProfile] = useState({ username: '', email: '' });
    const [error, setError] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const messageContainerRef = useRef(null);
    const { token } = useContext(AuthContext);

    // دریافت اطلاعات کاربر
    const fetchProfile = useCallback(async () => {
        try {
            const [profileResponse] = await Promise.all([
                axios.get('https://api.medogram.ir/api/profile/', {
                    headers: { Authorization: `Bearer ${token}` },
                }),
            ]);
            setProfile({
                username: profileResponse.data.username,
                email: profileResponse.data.email,
            });
        } catch (error) {
            console.error('خطا در دریافت پروفایل کاربر:', error);
            setProfile({ username: 'کاربر', email: '' });
        }
    }, [token]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    // ارسال پیام کاربر
    const handleSendMessage = useCallback(async () => {
        if (input.trim()) {
            const userMessage = {
                id: Date.now(),
                text: input,
                sender: 'user',
                timestamp: new Date().toLocaleTimeString(),
            };

            setMessages(prev => [...prev, userMessage]);
            setInput('');
            setError(null);
            setIsTyping(true);

            try {
                const response = await axios.post('https://api.medogram.ir/api/chat/', {
                    message: input
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                setTimeout(() => {
                    setMessages(prev => [
                        ...prev,
                        {
                            id: Date.now() + 1,
                            text: response.data.bot_response,
                            sender: 'bot',
                            timestamp: new Date().toLocaleTimeString(),
                        }
                    ]);
                    setIsTyping(false);
                }, 1000);
            } catch (error) {
                console.error('خطا:', error);
                setError('خطایی رخ داد. لطفاً مجدداً تلاش کنید.');
                setIsTyping(false);
            }
        }
    }, [input, token]);

    // ارسال پیام با فشردن Enter (بدون شیفت)
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // اسکرول به آخر
    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <ChatContainer
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <ChatHeader>
                    <div className="logo-section" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <IoHappyOutline />
                        <span>دستیار هوشمند پزشک</span>
                    </div>
                    <UserInfo>
                        <IoPersonCircleOutline />
                        <span>{profile.username}</span>
                        <ActionButton onClick={() => setIsDarkMode(!isDarkMode)}>
                            {isDarkMode ? <IoSunny /> : <IoMoon />}
                        </ActionButton>
                    </UserInfo>
                </ChatHeader>

                <MessageContainer ref={messageContainerRef}>
                    <AnimatePresence>
                        {messages.map((msg) => (
                            <Message
                                key={msg.id}
                                message={msg}
                            />
                        ))}
                    </AnimatePresence>

                    {isTyping && (
                        <TypingIndicator>
                            <span></span>
                            <span></span>
                            <span></span>
                        </TypingIndicator>
                    )}
                </MessageContainer>

                {error && (
                    <ErrorMessage
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                    >
                        {error}
                        <ActionButton onClick={() => setError(null)}>
                            <IoClose />
                        </ActionButton>
                    </ErrorMessage>
                )}

                <InputContainer>
                    <InputField
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="پیام خود را اینجا بنویسید..."
                        rows={1}
                    />
                    <SendButton
                        onClick={handleSendMessage}
                        disabled={!input.trim() || isTyping}
                    >
                        {/* برعکس کردن فلش آیکون */}
                        <IoSend style={{ transform: 'scaleX(-1)' }} />
                    </SendButton>
                </InputContainer>
            </ChatContainer>
        </ThemeProvider>
    );
};

export default ChatBot;
