import axios from 'axios';

/**
 * دریافت یوزرنیم کاربر
 * @param {string} token - توکن احراز هویت کاربر
 * @returns {Promise<Object>} - اطلاعات یوزرنیم کاربر
 */
export const getUsername = async (token) => {
    if (!token) {
        throw new Error('توکن احراز هویت یافت نشد.');
    }

    try {
        const response = await axios.get('https://api.medogram.ir/api/username/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'خطا در دریافت یوزرنیم');
    }
};

/**
 * به‌روزرسانی یوزرنیم کاربر
 * @param {string} token - توکن احراز هویت کاربر
 * @param {string} username - یوزرنیم جدید
 * @returns {Promise<Object>} - اطلاعات به‌روزرسانی شده کاربر
 */
export const updateUsername = async (token, username) => {
    if (!token) {
        throw new Error('توکن احراز هویت یافت نشد.');
    }

    try {
        const response = await axios.post(
            'https://api.medogram.ir/api/username/update/',
            { username },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'خطا در به‌روزرسانی یوزرنیم');
    }
};
