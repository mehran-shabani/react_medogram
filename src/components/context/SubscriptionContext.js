import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
    const { token } = useContext(AuthContext);  // توکن از AuthContext دریافت می‌شود
    const [subscriptions, setSubscriptions] = useState([]);  // حالت برای ذخیره‌سازی اشتراک‌ها

    useEffect(() => {
        if (token) {  // اگر توکن موجود است
            axios.get('http://127.0.0.1:8000/api/subscriptions/create-payment', {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    console.log('API Response:', response.data);  // بررسی پاسخ API
                    setSubscriptions(response.data);  // ذخیره اشتراک‌ها در state
                })
                .catch(error => {
                    console.error('Error fetching subscriptions:', error);  // بررسی خطا
                });
        }
    }, [token]);  // اجرا هنگام تغییر توکن

    return (
        <SubscriptionContext.Provider value={{ subscriptions }}>
            {children}
        </SubscriptionContext.Provider>
    );
};
