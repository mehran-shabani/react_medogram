// src/components/Chat/ChatLogic.js
import React, {
    useState,
    useRef,
    useEffect,
    useContext,
    useCallback
} from 'react';
import { AnimatePresence } from 'framer-motion'; // اضافه شدن این ایمپورت
import {
    ChatContainer,
    ChatHeader,
    UserInfo,
    MessageContainer,
    InputContainer,
    InputField,
    lightTheme,
    darkTheme,
    SendButton,
    ErrorMessage,
    TypingIndicator,
    MessageUI,
    ActionButton
} from './ChatUI';
import ToggleModeButton from './ToggleModeButton';
import ChatSettings from './ChatSettings';
import { AuthContext } from '../Auth/AuthContext';
import { IoHappyOutline, IoPersonCircleOutline, IoClose, IoSend } from "react-icons/io5";
import { sendMessage } from './api';
import {ThemeProvider} from "styled-components";

const ChatLogic = () => {
    const [messages, setMessages] = useState([
        {
            id: 'welcome',
            text: "سلام! من دستیار هوشمند پزشک هستم. چطور می‌توانم کمکتان کنم؟",
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString(),
        }
    ]);
    const [input, setInput] = useState('');
    const [error, setError] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    const messageContainerRef = useRef(null);

    // مدیریت حالت تاریک/روشن
    const [isDarkMode, setIsDarkMode] = useState(false);
    const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

    // مدیریت حالت تخصصی
    const [isSpecialMode, setIsSpecialMode] = useState(false);
    const toggleSpecialMode = () => setIsSpecialMode((prev) => !prev);

    // انتخاب تم بر اساس حالت
    const theme = isDarkMode ? darkTheme : lightTheme;

    // از AuthContext
    const { token } = useContext(AuthContext);

    // ارسال پیام کاربر
    const handleSendMessage = useCallback(async () => {
        if (!input.trim()) return;

        const userMessage = {
            id: `${Date.now()}`,
            text: input,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setError(null);
        setIsTyping(true);

        try {
            const botResponse = await sendMessage({
                message: input,
                isSpecialMode,
                token,
                settings: {},
            });

            setTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    {
                        id: `${Date.now()}-bot`,
                        text: botResponse,
                        sender: 'bot',
                        timestamp: new Date().toLocaleTimeString(),
                    }
                ]);
                setIsTyping(false);
            }, isSpecialMode ? 3000 : 1000);

        } catch (err) {
            console.error('خطا در ارسال پیام:', err);
            setError('خطایی رخ داد. لطفاً مجدداً تلاش کنید.');
            setIsTyping(false);
        }
    }, [input, isSpecialMode, token]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    return (
        <ThemeProvider theme={theme}>
            <ChatContainer
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* هدر چت */}
                <ChatHeader>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <IoHappyOutline />
                        <span>دستیار هوشمند پزشک</span>
                    </div>
                    <UserInfo>
                        <IoPersonCircleOutline />
                        <span>کاربر</span>
                        <ToggleModeButton
                            type="theme"
                            isActive={isDarkMode}
                            toggleMode={toggleDarkMode}
                        />
                        <ToggleModeButton
                            type="mode"
                            isActive={isSpecialMode}
                            toggleMode={toggleSpecialMode}
                        />
                    </UserInfo>
                </ChatHeader>

                {/* نمایش تنظیمات تنها در حالت تخصصی */}
                {isSpecialMode && <ChatSettings />}

                {/* بخش پیام‌ها */}
                <MessageContainer ref={messageContainerRef}>
                    <AnimatePresence>
                        {messages.map((msg) => (
                            <MessageUI key={msg.id} message={msg} />
                        ))}
                    </AnimatePresence>

                    {isTyping && (
                        <TypingIndicator>
                            <span />
                            <span />
                            <span />
                        </TypingIndicator>
                    )}
                </MessageContainer>

                {/* نمایش خطا */}
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

                {/* نوار ارسال پیام */}
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
                        <IoSend style={{ transform: 'scaleX(-1)' }} />
                    </SendButton>
                </InputContainer>
            </ChatContainer>
        </ThemeProvider>
    );
};

export default ChatLogic;

