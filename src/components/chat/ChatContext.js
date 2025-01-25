// src/components/Chat/ChatContext.js
import React, { createContext, useState } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    // حالت دارک/لایت برای تم
    const [isDarkMode, setIsDarkMode] = useState(false);
    const toggleDarkMode = () => setIsDarkMode(prev => !prev);

    // حالت تخصصی/معمولی برای منطق API (در صورت نیاز)
    const [isSpecialMode, setIsSpecialMode] = useState(false);
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
