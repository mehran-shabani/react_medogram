import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { AuthContainer, AuthInput, AuthButton, SuccessMessage } from '../../styles/Auth.styles';

const Auth = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [authCode, setAuthCode] = useState('');
    const { isVerified, registerUser, verifyUser } = useContext(AuthContext);

    const handleRegister = () => {
        registerUser(phoneNumber).then(() => {
            alert('کد احراز هویت ارسال شد.');
        }).catch(error => {
            console.error('Error during registration:', error);
        });
    };

    const handleVerify = () => {
        verifyUser(phoneNumber, authCode).then(() => {
            alert('احراز هویت با موفقیت انجام شد.');
        }).catch(error => {
            console.error('Error during verification:', error);
        });
    };

    return (
        <AuthContainer>
            <h2>احراز هویت</h2>
            <AuthInput
                type="text"
                placeholder="شماره تلفن"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <AuthButton onClick={handleRegister}>ارسال کد</AuthButton>

            {isVerified ? (
                <SuccessMessage>شما احراز هویت شده‌اید.</SuccessMessage>
            ) : (
                <div>
                    <AuthInput
                        type="text"
                        placeholder="کد احراز هویت"
                        value={authCode}
                        onChange={(e) => setAuthCode(e.target.value)}
                    />
                    <AuthButton onClick={handleVerify}>احراز هویت</AuthButton>
                </div>
            )}
        </AuthContainer>
    );
};

export default Auth;
