import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
    const { token } = useContext(AuthContext);
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        if (token) {
            axios.get('http://127.0.0.1:8000/api/subscriptions/', {
                headers: { Authorization: `Bearer ${token}` }
            }).then(response => {
                setSubscriptions(response.data);
            });
        }
    }, [token]);

    const createSubscription = (duration) => {
        return axios.post('http://127.0.0.1:8000/api/subscriptions/', { duration }, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
            setSubscriptions([...subscriptions, response.data]);
        });
    };

    return (
        <SubscriptionContext.Provider value={{ subscriptions, createSubscription }}>
            {children}
        </SubscriptionContext.Provider>
    );
};
