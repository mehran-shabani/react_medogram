import React, { useState, useRef, useEffect, useContext, useCallback } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { AuthContext } from '../Auth/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { IoSend, IoHappyOutline, IoPersonCircleOutline, IoMoon, IoSunny, IoImage } from 'react-icons/io5';

const lightTheme = {
    background: '#f8f9fa',
    headerBackground: '#075e54',
    headerText: 'white',
    userMessageBackground: '#dcf8c6',
    botMessageBackground: '#fff',
    inputBackground: '#f0f2f5',
    inputFocusBackground: '#e4e6eb',
    sendButtonColor: '#0e2806',
    sendButtonHoverColor: '#0e1f11',
    text: '#000',
};

const darkTheme = {
    background: '#1f2c33',
    headerBackground: '#2a3942',
    headerText: '#e9edef',
    userMessageBackground: '#005c4b',
    botMessageBackground: '#202c33',
    inputBackground: '#2a3942',
    inputFocusBackground: '#3b4a54',
    sendButtonColor: '#00a884',
    sendButtonHoverColor: '#02735e',
    text: '#e9edef',
};

const ChatContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    background-color: ${props => props.theme.background};
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
    border-radius: 15px;
    overflow: hidden;
    color: ${props => props.theme.text};
`;

const ChatHeader = styled.div`
    background-color: ${props => props.theme.headerBackground};
    color: ${props => props.theme.headerText};
    padding: 1.2rem;
    font-size: 1.3rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
`;

const UserName = styled.span`
    margin-left: 0.8rem;
    font-size: 1.1rem;
`;

const MessageContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const MessageBubble = styled(motion.div)`
    padding: 0.9rem 1.2rem;
    border-radius: 20px;
    margin-bottom: 0.8rem;
    max-width: 70%;
    word-wrap: break-word;
    line-height: 1.5;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
    position: relative;
`;

const UserMessage = styled(MessageBubble)`
    align-self: flex-end;
    background-color: ${props => props.theme.userMessageBackground};
`;

const BotMessage = styled(MessageBubble)`
    align-self: flex-start;
    background-color: ${props => props.theme.botMessageBackground};
`;

const InputContainer = styled.div`
    display: flex;
    padding: 1rem;
    background-color: ${props => props.theme.headerBackground};
    align-items: center;
    box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
`;

const InputField = styled.input`
    flex: 1;
    padding: 0.9rem 1.2rem;
    border: none;
    border-radius: 25px;
    font-size: 1rem;
    background-color: ${props => props.theme.inputBackground};
    color: ${props => props.theme.text};
    margin-right: 0.5rem;
    transition: background-color 0.3s, box-shadow 0.3s;

    &:focus {
        outline: none;
        background-color: ${props => props.theme.inputFocusBackground};
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
    }
`;

const SendButton = styled.button`
    background-color: transparent;
    border: none;
    color: ${props => props.theme.sendButtonColor};
    font-size: 1.8rem;
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.3s, box-shadow 0.3s;

    &:hover {
        color: ${props => props.theme.sendButtonHoverColor};
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    }
`;

const ErrorMessage = styled.div`
    color: #721c24;
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    text-align: center;
`;

const ThemeToggle = styled.button`
    background: none;
    border: none;
    color: ${props => props.theme.headerText};
    font-size: 1.8rem;
    cursor: pointer;
    padding: 0.5rem;
`;

const Timestamp = styled.span`
    font-size: 0.7rem;
    color: ${props => props.theme.text};
    opacity: 0.7;
    position: absolute;
    bottom: -1.2rem;
    right: 0.8rem;
`;

const TypingIndicator = styled.div`
    align-self: flex-start;
    background-color: ${props => props.theme.botMessageBackground};
    color: ${props => props.theme.text};
    padding: 0.9rem 1.2rem;
    border-radius: 20px;
    font-style: italic;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const AttachmentButton = styled.button`
    background: none;
    border: none;
    color: ${props => props.theme.sendButtonColor};
    font-size: 1.8rem;
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.3s, box-shadow 0.3s;

    &:hover {
        color: ${props => props.theme.sendButtonHoverColor};
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    }
`;

const ChatBot = () => {
    const [messages, setMessages] = useState([
        {
            id: 'welcome',
            text: "سلام! من دستیار DocAI شما هستم. چطور می‌توانم امروز به شما در مسائل سلامتیتان کمک کنم؟",
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString(),
        }
    ]);
    const [input, setInput] = useState('');
    const [userName, setUserName] = useState('');
    const [error, setError] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const messageContainerRef = useRef(null);
    const { token } = useContext(AuthContext);

    const fetchUserProfile = useCallback(async () => {
        try {
            const response = await fetch('https://api.medogram.ir/api/profile/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                thrw new Error('مشکلی در دریافت اطلاعات کاربر پیش آمد');
            }

            const data = await response.json();
            setUserName(data.name || 'کاربر');
        } catch (error) {
            console.error('خطا در دریافت اطلاعات کاربر:', error);
            setUserName('کاربر');
        }
    }, [token]);

    useEffect(() => {
        fetchUserProfile();
    }, [fetchUserProfile]);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSendMessage = useCallback(async () => {
        if (input.trim()) {
            const userMessage = {
                id: Date.now(),
                text: input,
                sender: 'user',
                timestamp: new Date().toLocaleTimeString(),
            };

            setMessages((prevMessages) => [...prevMessages, userMessage]);
            setInput('');
            setError(null);
            setIsTyping(true);

            try {
                const response = await fetch('https://api.medogram.ir/api/chat/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        message: input,
                    }),
                });

                const data = await response.json();

                if (!response.ok) {
                    let errorMessage = 'مشکلی در پردازش درخواست شما به وجود آمد.';
                    if (response.status === 400) {
                        if (data.error === "Insufficient funds in BoxMoney.") {
                            errorMessage = 'موجودی کافی برای ارسال پیام ندارید. لطفاً حساب BoxMoney خود را شارژ کنید.';
                        } else if (data.error === "User message limit not set for this user.") {
                            errorMessage = 'محدودیت پیام برای شما تنظیم نشده است. لطفاً با پشتیبانی تماس بگیرید.';
                        } else if (data.error === "BoxMoney does not exist for this user.") {
                            errorMessage = 'حساب BoxMoney شما تنظیم نشده است. لطفاً با پشتیبانی تماس بگیرید.';
                        }
                    } else if (response.status === 401) {
                        errorMessage = 'احراز هویت شما معتبر نیست. لطفاً دوباره وارد شوید.';
                    } else if (response.status === 408) {
                        errorMessage = 'ربات در زمان مشخص پاسخی نداد. لطفاً دوباره تلاش کنید.';
                    }
                    setError(errorMessage);
                    setIsTyping(false);
                    return;
                }

                setTimeout(() => {
                    const botMessage = {
                        id: Date.now() + 1,
                        text: data.bot_response,
                        sender: 'bot',
                        timestamp: new Date().toLocaleTimeString(),
                    };

                    setMessages((prevMessages) => [...prevMessages, botMessage]);
                    setIsTyping(false);
                }, 1000); // Simulate a delay for typing
            } catch (error) {
                console.error('خطا:', error);
                setError('خطایی غیرمنتظره رخ داد. لطفاً بعداً دوباره تلاش کنید.');
                setIsTyping(false);
            }
        }
    }, [input, token]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleAttachment = () => {
        // Implement attachment functionality here
        console.log("Attachment button clicked");
    };

    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <ChatContainer
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <ChatHeader>
                    <div>
                        <IoHappyOutline style={{ marginRight: '0.5rem' }} />
                        DocAI Assistant
                    </div>
                    <UserInfo>
                        <IoPersonCircleOutline />
                        <UserName>{userName}</UserName>
                        <ThemeToggle onClick={toggleTheme}>
                            {isDarkMode ? <IoSunny /> : <IoMoon />}
                        </ThemeToggle>
                    </UserInfo>
                </ChatHeader>
                <MessageContainer ref={messageContainerRef}>
                    <AnimatePresence>
                        {messages.map((msg) =>
                            msg.sender === 'user' ? (
                                <UserMessage
                                    key={msg.id}
                                    initial={{ opacity: 0, scale: 0.8, x: 20 }}
                                    animate={{ opacity: 1, scale: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {msg.text}
                                    <Timestamp>{msg.timestamp}</Timestamp>
                                </UserMessage>
                            ) : (
                                <BotMessage
                                    key={msg.id}
                                    initial={{ opacity: 0, scale: 0.8, x: -20 }}
                                    animate={{ opacity: 1, scale: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {msg.text}
                                    <Timestamp>{msg.timestamp}</Timestamp>
                                </BotMessage>
                            )
                        )}
                    </AnimatePresence>
                    {isTyping && (
                        <TypingIndicator>DocAI در حال تایپ است...</TypingIndicator>
                    )}
                </MessageContainer>
                {error && (
                    <ErrorMessage>
                        {error}
                    </ErrorMessage>
                )}
                <InputContainer>
                    <AttachmentButton onClick={handleAttachment}>
                        <IoImage />
                    </AttachmentButton>
                    <InputField
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        placeholder="پیام خود را تایپ کنید..."
                    />
                    <SendButton onClick={handleSendMessage}>
                        <IoSend />
                    </SendButton>
                </InputContainer>
            </ChatContainer>
        </ThemeProvider>
    );
};

export default ChatBot;