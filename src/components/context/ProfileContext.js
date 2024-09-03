import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext'; // فرض کنید که AuthContext قبلاً ایجاد شده باشد

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const [profile, setProfile] = useState({
        username: '',
        email: ''
    });
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isAuthenticated) {
            const fetchProfile = async () => {
                try {
                    const response = await axios.get('http://localhost:8000/api/profile/', {
                        withCredentials: true,
                    });
                    setProfile(response.data);
                } catch (error) {
                    console.error('Error fetching profile:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchProfile();
        } else {
            setLoading(false);
        }
    }, [isAuthenticated]);

    const updateProfile = async (updatedProfile) => {
        try {
            const response = await axios.post('http://localhost:8000/api/profile/update/', updatedProfile, {
                withCredentials: true,
            });
            setProfile(response.data);
            setErrors({});
            return true;
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                console.error('Error updating profile:', error);
            }
            return false;
        }
    };

    return (
        <ProfileContext.Provider value={{ profile, loading, errors, updateProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};
