import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 80vh;
    width: 100%;
    max-width: 800px;
    border: none;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    background-color: #f8f9fa;
    overflow: hidden;
    margin: 2rem auto;
`;

const ChatHeader = styled.div`
    background-color: #007bff;
    color: white;
    padding: 1.5rem;
    text-align: left;
    font-size: 1.8rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const MessageContainer = styled.div`
    padding: 1.5rem;
    height: calc(100% - 160px);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    &::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`;

const MessageBubble = styled.div`
    padding: 0.8rem 1.2rem;
    border-radius: 18px;
    margin: 0.5rem 0;
    max-width: 70%;
    word-wrap: break-word;
    line-height: 1.4;
    position: relative;
    animation: fadeIn 0.3s ease-out;

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;

const UserMessage = styled(MessageBubble)`
    align-self: flex-end;
    background-color: #007bff;
    color: white;
    border-bottom-right-radius: 4px;
`;

const BotMessage = styled(MessageBubble)`
    align-self: flex-start;
    background-color: #e9ecef;
    color: #343a40;
    border-bottom-left-radius: 4px;
`;

const InputContainer = styled.div`
    display: flex;
    padding: 1rem;
    background-color: white;
    border-top: 1px solid #e9ecef;
    align-items: center;
`;

const InputField = styled.input`
    flex: 1;
    padding: 0.8rem 1rem;
    border: 1px solid #ced4da;
    border-radius: 25px;
    font-size: 1rem;
    transition: border-color 0.3s, box-shadow 0.3s;

    &:focus {
        outline: none;
        border-color: #80bdff;
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
`;

const SendButton = styled.button`
    padding: 0.8rem 1.5rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.1s;
    margin-left: 0.5rem;
    font-size: 1rem;
    font-weight: bold;

    &:hover {
        background-color: #0056b3;
    }

    &:active {
        transform: scale(0.98);
    }
`;

const BotIcon = styled.div`
    width: 40px;
    height: 40px;
    background-color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    font-size: 1.5rem;
`;

const ChatBot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messageContainerRef = useRef(null);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSendMessage = () => {
        if (input.trim()) {
            const userMessage = {
                text: input,
                sender: 'user',
            };

            const botMessage = {
                text: `I understand you're asking about "${input}". How can I assist you further with this health-related query?`,
                sender: 'bot',
            };

            setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
            setInput('');
        }
    };

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
        <ChatContainer>
            <ChatHeader>
                <BotIcon>🤖</BotIcon>
                DocAI Assistant
            </ChatHeader>
            <MessageContainer ref={messageContainerRef}>
                {messages.map((msg, index) =>
                    msg.sender === 'user' ? (
                        <UserMessage key={index}>{msg.text}</UserMessage>
                    ) : (
                        <BotMessage key={index}>{msg.text}</BotMessage>
                    )
                )}
            </MessageContainer>
            <InputContainer>
                <InputField
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask your health question..."
                />
                <SendButton onClick={handleSendMessage}>Send</SendButton>
            </InputContainer>
        </ChatContainer>
    );
};

export default ChatBot;