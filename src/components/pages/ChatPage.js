import React from 'react';
import ChatBot from '../chat/Chat';

const ChatPage = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',
            height: '100vh', backgroundColor: '#f8f9fa' }}>
            <ChatBot />
        </div>
    );
};

export default ChatPage;
