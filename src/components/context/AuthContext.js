import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isVerified, setIsVerified] = useState(false);
    const [token, setToken] = useState(null);

    const registerUser = (phoneNumber) => {
        return axios.post('http://127.0.0.1:8000/api/register/', { phone_number: phoneNumber });
    };

    const verifyUser = (phoneNumber, authCode) => {
        return axios.post('http://127.0.0.1:8000/api/verify/', { phone_number: phoneNumber, code: authCode })
            .then(response => {
                setIsVerified(true);
                setToken(response.data.access);
            });
    };

    return (
        <AuthContext.Provider value={{ isVerified, registerUser, verifyUser, token }}>
            {children}
        </AuthContext.Provider>
    );
};
