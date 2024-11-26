import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isVerified, setIsVerified] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            setToken(storedToken);
            setIsVerified(true);
        }
    }, []);

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
                // Store the token in localStorage
                localStorage.setItem('authToken', response.data.access);
                return response;
            })
            .catch(error => {
                console.error('Verification error:', error.response.data);
                throw error;
            });
    };

    const logout = () => {
        setIsVerified(false);
        setToken(null);
        localStorage.removeItem('authToken');
    };

    // Add an axios interceptor to include the token in all requests
    useEffect(() => {
        const interceptor = axios.interceptors.request.use(
            config => {
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );

        // Clean up the interceptor when the component unmounts
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