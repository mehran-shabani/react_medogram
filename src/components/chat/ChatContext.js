// src/components/Chat/ChatContext.js
import React, { createContext, useState } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSpecialMode, setIsSpecialMode] = useState(false);

    const toggleDarkMode = () => setIsDarkMode(prev => !prev);
    const toggleSpecialMode = () => setIsSpecialMode(prev => !prev);

    return (
        <ChatContext.Provider value={{
            isDarkMode,
            toggleDarkMode,
            isSpecialMode,
            toggleSpecialMode,
        }}>
            {children}
        </ChatContext.Provider>
    );
};
