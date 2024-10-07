import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isVerified, setIsVerified] = useState(false);
    const [token, setToken] = useState(null);

    const registerUser = (phoneNumber) => {
        return axios.post('https://api.medogram.ir/api/register/', { phone_number: phoneNumber });
    };

    const verifyUser = (phoneNumber, authCode) => {
        console.log('Data being sent:', { phone_number: phoneNumber, code: authCode });

        return axios.post('https://api.medogram.ir/api/verify/', {
            code: authCode,
            phone_number: phoneNumber,
        })
            .then(response => {
                setIsVerified(true);
                setToken(response.data.access);
                return response;
            })
            .catch(error => {
                console.error('Verification error:', error.response.data);
                throw error;
            });
    };



    return (
        <AuthContext.Provider value={{ isVerified, registerUser, verifyUser, token }}>
            {children}
        </AuthContext.Provider>
    );
};
