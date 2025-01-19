import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isVerified, setIsVerified] = useState(false);
    const [token, setToken] = useState(null);

    // تلاش برای بازیابی توکن از localStorage (مثلاً اگر کاربر از قبل لاگین کرده)
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            setToken(storedToken);
            setIsVerified(true);
        }
    }, []);

    // ارسال کد ثبت‌نام به موبایل
    const registerUser = (phoneNumber) => {
        return axios.post('https://api.medogram.ir/api/register/', {
            phone_number: phoneNumber,
        });
    };

    // تأیید کد و دریافت توکن
    const verifyUser = (phoneNumber, authCode) => {
        console.log('Data being sent:', { phone_number: phoneNumber, code: authCode });

        return axios
            .post('https://api.medogram.ir/api/verify/', {
                code: authCode,
                phone_number: phoneNumber,
            })
            .then((response) => {
                // در پاسخ سرور، توکن را دریافت می‌کنیم
                const accessToken = response.data?.access;

                if (!accessToken) {
                    throw new Error('توکن در پاسخ سرور موجود نیست!');
                }

                // ذخیره در State و localStorage
                setIsVerified(true);
                setToken(accessToken);
                localStorage.setItem('authToken', accessToken);

                // نکته اصلی: برگرداندن توکن در اینجا
                return accessToken;
            })
            .catch((error) => {
                console.error('Verification error:', error.response?.data);
                throw error;
            });
    };

    // خروج از حساب کاربری
    const logout = () => {
        setIsVerified(false);
        setToken(null);
        localStorage.removeItem('authToken');
    };

    // برای اینکه در هر درخواست axios، هدر Authorization را قرار دهیم
    useEffect(() => {
        const interceptor = axios.interceptors.request.use(
            (config) => {
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // پاک کردن اینترسپتور پس از خروج از کامپوننت یا تعویض توکن
        return () => {
            axios.interceptors.request.eject(interceptor);
        };
    }, [token]);

    return (
        <AuthContext.Provider value={{ isVerified, registerUser, verifyUser, token, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
