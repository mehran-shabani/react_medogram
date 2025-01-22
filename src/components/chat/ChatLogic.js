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
    SendButton,
    ErrorMessage,
    TypingIndicator,
    MessageUI,
    ActionButton
} from './ChatUI';
import ToggleModeButton from './ToggleModeButton';
import ChatSettings from './ChatSettings';
import { ChatContext } from './ChatContext';
import { AuthContext } from '../Auth/AuthContext';
import { IoHappyOutline, IoPersonCircleOutline, IoClose, IoSend } from "react-icons/io5";
import { sendMessage } from './api';

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

    // از ChatContext و AuthContext
    const { isDarkMode, toggleDarkMode, isSpecialMode, toggleSpecialMode } = useContext(ChatContext);
    const { token } = useContext(AuthContext);

    // ارسال پیام کاربر
    const handleSendMessage = useCallback(async () => {
        if (!input.trim()) return; // اگر ورودی خالی بود برنگرد

        // ساخت آبجکت پیام کاربر
        const userMessage = {
            id: `${Date.now()}`, // پیشنهاد: یا nanoid
            text: input,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString(),
        };

        // افزودن پیام کاربر به لیست
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setError(null);
        setIsTyping(true);

        try {
            // صدا زدن تابع ارسال پیام از api.js
            const botResponse = await sendMessage({
                message: input,
                isSpecialMode,
                token,
                settings: {} // اگر تنظیمات اضافه دارید، اینجا پاس دهید
            });

            // شبیه‌سازی تأخیر پاسخ سرور
            setTimeout(() => {
                setMessages(prev => [
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

    // ارسال پیام با فشردن Enter (بدون شیفت)
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // اسکرول خودکار به آخرین پیام
    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    return (
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
                    {messages.map(msg => (
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

            {/* نمایش خطا (در صورت وجود) */}
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
    );
};

export default ChatLogic;
