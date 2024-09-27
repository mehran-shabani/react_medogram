import React, { useState, useRef, useEffect, useContext, useCallback } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { IoSend, IoHappyOutline, IoPersonCircleOutline } from 'react-icons/io5';

const ChatContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  background-color: #f0f2f5;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const ChatHeader = styled.div`
    background-color: #128c7e;
    color: white;
    padding: 1rem;
    font-size: 1.2rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
`;

const UserName = styled.span`
    margin-left: 0.5rem;
    font-size: 1rem;
`;

const MessageContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
`;

const MessageBubble = styled(motion.div)`
    padding: 0.8rem 1rem;
    border-radius: 18px;
    margin-bottom: 0.5rem;
    max-width: 70%;
    word-wrap: break-word;
    line-height: 1.4;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const UserMessage = styled(MessageBubble)`
    align-self: flex-end;
    background-color: #dcf8c6;
    color: #000;
`;

const BotMessage = styled(MessageBubble)`
    align-self: flex-start;
    background-color: #fff;
    color: #000;
`;

const InputContainer = styled.div`
    display: flex;
    padding: 1rem;
    background-color: #fff;
    align-items: center;
`;

const InputField = styled.input`
    flex: 1;
    padding: 0.8rem 1rem;
    border: none;
    border-radius: 25px;
    font-size: 1rem;
    background-color: #f0f2f5;
    transition: background-color 0.3s;

    &:focus {
        outline: none;
        background-color: #e4e6eb;
    }
`;

const SendButton = styled.button`
    background-color: transparent;
    border: none;
    color: #128c7e;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.3s;

    &:hover {
        color: #075e54;
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

const ChatBot = () => {
    const [messages, setMessages] = useState([
        {
            id: 'welcome',
            text: "Hi there! I'm your DocAI Assistant. How can I assist you with your health concerns today?",
            sender: 'bot',
        }
    ]);
    const [input, setInput] = useState('');
    const [userName, setUserName] = useState('');
    const [error, setError] = useState(null);
    const messageContainerRef = useRef(null);
    const { token } = useContext(AuthContext);

    const fetchUserProfile = useCallback(async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/profile/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user profile');
            }

            const data = await response.json();
            setUserName(data.name || 'User');
        } catch (error) {
            console.error('Error fetching user profile:', error);
            setUserName('User');
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
            };

            setMessages((prevMessages) => [...prevMessages, userMessage]);
            setInput('');
            setError(null); // Clear any previous errors

            try {
                const response = await fetch('http://127.0.0.1:8000/api/chat/', {
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
                    let errorMessage = 'An error occurred while processing your request.';
                    if (response.status === 400) {
                        if (data.error === "Insufficient funds in BoxMoney.") {
                            errorMessage = 'You have insufficient funds to send more messages. Please add funds to your BoxMoney.';
                        } else if (data.error === "User message limit not set for this user.") {
                            errorMessage = 'Your message limit is not set. Please contact support.';
                        } else if (data.error === "BoxMoney does not exist for this user.") {
                            errorMessage = 'Your BoxMoney account is not set up. Please contact support.';
                        }
                    } else if (response.status === 401) {
                        errorMessage = 'You are not authenticated. Please log in again.';
                    } else if (response.status === 408) {
                        errorMessage = 'The bot did not respond in time. Please try again.';
                    }
                    setError(errorMessage);
                    return;
                }

                const botMessage = {
                    id: Date.now() + 1,
                    text: data.bot_response,
                    sender: 'bot',
                };

                setMessages((prevMessages) => [...prevMessages, botMessage]);
            } catch (error) {
                console.error('Error:', error);
                setError('An unexpected error occurred. Please try again later.');
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
    }, [messages]);

    return (
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
                            </BotMessage>
                        )
                    )}
                </AnimatePresence>
            </MessageContainer>
            {error && (
                <ErrorMessage>
                    {error}
                </ErrorMessage>
            )}
            <InputContainer>
                <InputField
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                />
                <SendButton onClick={handleSendMessage}>
                    <IoSend />
                </SendButton>
            </InputContainer>
        </ChatContainer>
    );
};

export default ChatBot;