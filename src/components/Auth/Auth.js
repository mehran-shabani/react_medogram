import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    TextField,
    Button,
    CircularProgress,
    Typography,
    Checkbox,
    FormControlLabel,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthContext } from './AuthContext';      // مسیر دقیق را طبق پروژه خود اصلاح کنید
import { getUsername, updateUsername } from './userUpdate'; // متدهای API شما

// استایل کارت ورود
const StyledContainer = styled(Box)(({ theme }) => ({
    maxWidth: 500,
    margin: '50px auto',
    padding: theme.spacing(4),
    borderRadius: '12px',
    background: 'white',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
}));

const Auth = () => {
    const [state, setState] = useState({
        step: 'phone', // مراحل: phone, verify, collectUsername, loading
        phoneNumber: '',
        authCode: '',
        username: '',
        agreeToTerms: false,
        loading: false,
    });

    const { registerUser, verifyUser, token } = useContext(AuthContext);
    const navigate = useNavigate();

    // ارسال کد به شماره موبایل
    const handleSendCode = async () => {
        if (!/^09\d{9}$/.test(state.phoneNumber)) {
            toast.error('شماره موبایل باید با 09 شروع شود و 11 رقم باشد.');
            return;
        }

        setState(prev => ({ ...prev, loading: true }));
        try {
            await registerUser(state.phoneNumber);
            toast.success('کد احراز هویت ارسال شد.');
            setState(prev => ({ ...prev, step: 'verify' }));
        } catch (error) {
            toast.error('ارسال کد با خطا مواجه شد.');
        } finally {
            setState(prev => ({ ...prev, loading: false }));
        }
    };

    // تأیید کد و دریافت توکن
    const handleVerifyCode = async () => {
        if (!state.agreeToTerms) {
            toast.error('لطفاً شرایط و ضوابط را بپذیرید.');
            return;
        }

        if (state.authCode.length !== 6) {
            toast.error('کد تایید باید 6 رقمی باشد.');
            return;
        }

        setState(prev => ({ ...prev, loading: true }));
        try {
            // verifyUser اکنون فقط توکن را برمی‌گرداند
            const newToken = await verifyUser(state.phoneNumber, state.authCode);

            // در صورت موفقیت: newToken را داریم
            if (!newToken) {
                throw new Error('توکن دریافت نشد یا کد اشتباه بود!');
            }

            // با توکن، username کاربر را می‌گیریم
            const userData = await getUsername(newToken);

            // اگر یوزرنیم برابر با شماره موبایل باشد، یعنی کاربر نام خود را هنوز ثبت نکرده
            if (userData.username === state.phoneNumber) {
                setState(prev => ({ ...prev, step: 'collectUsername' }));
            } else {
                toast.success('ورود موفقیت‌آمیز');
                navigate('/');
            }
        } catch (error) {
            toast.error(error.message || 'کد واردشده صحیح نیست');
        } finally {
            setState(prev => ({ ...prev, loading: false }));
        }
    };

    // بروزرسانی نام و نام خانوادگی
    const handleUpdateUsername = async () => {
        if (!state.username) {
            toast.error('لطفاً نام و نام خانوادگی خود را وارد کنید.');
            return;
        }

        setState(prev => ({ ...prev, loading: true }));
        try {
            // استفاده از توکن موجود در Context
            await updateUsername(token, state.username);

            toast.success('نام و نام خانوادگی با موفقیت ثبت شد.');
            navigate('/');
        } catch (error) {
            toast.error(error.message || 'ذخیره اطلاعات با خطا مواجه شد.');
        } finally {
            setState(prev => ({ ...prev, loading: false }));
        }
    };

    return (
        <StyledContainer>
            {state.step === 'phone' && (
                <Box>
                    <Typography variant="h5" mb={2}>
                        ورود به حساب کاربری
                    </Typography>
                    <TextField
                        fullWidth
                        label="شماره موبایل"
                        value={state.phoneNumber}
                        onChange={e => setState({ ...state, phoneNumber: e.target.value })}
                        disabled={state.loading}
                        margin="normal"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={state.agreeToTerms}
                                onChange={e => setState({ ...state, agreeToTerms: e.target.checked })}
                            />
                        }
                        label={
                            <Typography variant="body2">
                                <a
                                    href="/terms"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: '#1976d2', textDecoration: 'none' }}
                                >
                                    شرایط و ضوابط
                                </a>{' '}
                                را می‌پذیرم.
                            </Typography>
                        }
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleSendCode}
                        disabled={state.loading}
                    >
                        {state.loading ? <CircularProgress size={24} /> : 'ارسال کد'}
                    </Button>
                </Box>
            )}

            {state.step === 'verify' && (
                <Box>
                    <Typography variant="h5" mb={2}>
                        تایید کد
                    </Typography>
                    <TextField
                        fullWidth
                        label="کد تایید"
                        value={state.authCode}
                        onChange={e => setState({ ...state, authCode: e.target.value })}
                        disabled={state.loading}
                        margin="normal"
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleVerifyCode}
                        disabled={state.loading}
                    >
                        {state.loading ? <CircularProgress size={24} /> : 'تایید'}
                    </Button>
                </Box>
            )}

            {state.step === 'collectUsername' && (
                <Box>
                    <Typography variant="h5" mb={2}>
                        ثبت نام و نام خانوادگی
                    </Typography>
                    <TextField
                        fullWidth
                        label="نام و نام خانوادگی"
                        value={state.username}
                        onChange={e => setState({ ...state, username: e.target.value })}
                        disabled={state.loading}
                        margin="normal"
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleUpdateUsername}
                        disabled={state.loading}
                    >
                        {state.loading ? <CircularProgress size={24} /> : 'ذخیره'}
                    </Button>
                </Box>
            )}

            {state.step === 'loading' && (
                <Box textAlign="center">
                    <CircularProgress size={40} />
                    <Typography mt={2}>در حال بارگذاری، لطفاً صبر کنید...</Typography>
                </Box>
            )}

            <ToastContainer />
        </StyledContainer>
    );
};

export default Auth;
