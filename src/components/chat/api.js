// src/chat/api.js
import axios from 'axios';

// آدرس API در حالت عادی:
const regularChatAPI = 'http://127.0.0.1:8000/api/chat/';
// آدرس API در حالت سفارشی (پیشرفته):
const customChatAPI = 'http://127.0.0.1:8000/api/customchatbot/';

export const sendMessage = async ({ message, isSpecialMode, token, settings = {} }) => {
    // بسته به حالت (isSpecialMode) سراغ یکی از دو آدرس می‌رویم:
    const apiEndpoint = isSpecialMode
        ? `${customChatAPI}message/`
        : `${regularChatAPI}message/`;

    // پِی‌لودی که به سرور می‌فرستیم. در حالت پیشرفته ممکن است تنظیمات بیشتری باشد:
    const payload = isSpecialMode
        ? { message, ...settings }
        : { message };

    try {
        const response = await axios.post(apiEndpoint, payload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data.bot_response; // فرض بر این که پاسخ سرور با کلید bot_response برمی‌گردد
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

export const saveChatSettings = async ({ settings, token }) => {
    // فرض می‌کنیم تنظیمات تخصصی فقط در این مسیر ذخیره می‌شوند:
    const apiSettingsEndpoint = `${customChatAPI}settings/`;

    try {
        const response = await axios.post(apiSettingsEndpoint, settings, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error saving chat settings:', error);
        throw error;
    }
};
