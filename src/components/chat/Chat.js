import React, { useState } from 'react';
import styled from 'styled-components';

const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 75vh;
    width: 750px; /* Increase width to make it more prominent */
    border: 2px solid #007bff;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 123, 255, 0.5);
    background-color: #fff;
    position: relative;
`;

const ChatHeader = styled.div`
    background-color: #007bff;
    color: white;
    padding: 1rem;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    border-radius: 10px 10px 0 0; /* Rounded corners at the top */
`;

const MessageContainer = styled.div`
    padding: 1rem;
    height: calc(100% - 80px); /* Adjust height to fit the input area */
    overflow-y: auto;
    flex: 1;
    background-color: #f8f9fa;
`;

const UserMessage = styled.div`
    align-self: flex-end;
    background-color: #007bff;
    color: white;
    padding: 0.6rem 1rem;
    border-radius: 15px;
    margin: 0.5rem 0;
    max-width: 80%;
    word-wrap: break-word;
`;

const BotMessage = styled.div`
    align-self: flex-start;
    background-color: #e9ecef;
    color: black;
    padding: 0.6rem 1rem;
    border-radius: 15px;
    margin: 0.5rem 0;
    max-width: 80%;
    word-wrap: break-word;
`;

const InputContainer = styled.div`
    display: flex;
    padding: 0.5rem;
    background-color: #f1f1f1;
    border-top: 1px solid #ddd; /* Separator between messages and input */
`;

const InputField = styled.input`
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #007bff;
    border-radius: 5px;
    margin-right: 0.5rem;
`;

const SendButton = styled.button`
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

const ChatBot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

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
                text: `DocAI: How can I assist you with your health today?`,
                sender: 'bot',
            };

            setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
            setInput('');
        }
    };

    return (
        <ChatContainer>
            <ChatHeader>DocAI</ChatHeader>
            <MessageContainer>
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
                    placeholder="Ask your health question..."
                />
                <SendButton onClick={handleSendMessage}>Send</SendButton>
            </InputContainer>
        </ChatContainer>
    );
};

export default ChatBot;
