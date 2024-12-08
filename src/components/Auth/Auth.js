import React, { useEffect, useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    CircularProgress,
    InputAdornment,
    useTheme,
    useMediaQuery,
    Checkbox,
    FormControlLabel,
    Container as MuiContainer,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Send, ExitToApp, Lock, MobileFriendly,  } from '@mui/icons-material';

const StyledContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(6),
    maxWidth: 480,
    margin: '40px auto',
    borderRadius: 32,
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '6px',
        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    marginBottom: theme.spacing(3),
    '& .MuiOutlinedInput-root': {
        borderRadius: 16,
        background: 'rgba(255, 255, 255, 0.8)',
        transition: 'all 0.3s ease',
        '&:hover': {
            background: 'rgba(255, 255, 255, 0.95)',
            transform: 'translateY(-2px)',
        },
        '&.Mui-focused': {
            background: '#ffffff',
            transform: 'translateY(-2px)',
        },
    },
}));

const ActionButton = styled(Button)(({ theme }) => ({
    borderRadius: 25,
    padding: '12px 24px',
    fontSize: '1.1rem',
    textTransform: 'none',
    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: `0 8px 24px ${theme.palette.primary.main}40`,
    },
    '&:active': {
        transform: 'translateY(-1px)',
    },
}));

const CodeInput = styled(StyledTextField)(() => ({
    '& input': {
        fontSize: '1.6rem',
        letterSpacing: '0.3em',
        textAlign: 'center',
        fontFamily: 'monospace',
        caretColor: 'transparent',

    },
}));

const Auth = () => {
    const [state, setState] = useState({
        loading: false,
        codeSent: false,
        timer: 60,
        canResend: false,
        phoneNumber: '',
        authCode: '',
        agreeToTerms: false,
    });

    const navigate = useNavigate();
    const { registerUser, verifyUser, isVerified, logout } = useContext(AuthContext);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        let interval;
        if (state.codeSent && state.timer > 0) {
            interval = setInterval(() => {
                setState(prev => ({ ...prev, timer: prev.timer - 1 }));
            }, 1000);
        } else if (state.timer === 0) {
            setState(prev => ({ ...prev, canResend: true }));
        }
        return () => clearInterval(interval);
    }, [state.codeSent, state.timer]);

    const handleSendCode = async () => {
        if (!/^09\d{9}$/.test(state.phoneNumber)) {
            toast.error('شماره موبایل باید با 09 شروع شود و 11 رقم باشد');
            return;
        }

        setState(prev => ({ ...prev, loading: true }));
        try {
            await registerUser(state.phoneNumber);
            setState(prev => ({
                ...prev,
                codeSent: true,
                timer: 60,
                canResend: false,
            }));
            toast.success('کد تایید ارسال شد');
        } catch (error) {
            toast.error('خطا در ارسال کد');
        } finally {
            setState(prev => ({ ...prev, loading: false }));
        }
    };

    const handleVerifyCode = async () => {
        if (!state.agreeToTerms) {
            toast.error('لطفا قوانین و مقررات را مطالعه کنید و تیک آبی رو بزنید.');
            return;
        }

        if (state.authCode.length !== 6) {
            toast.error('کد تایید باید 6 رقمی باشد');
            return;
        }

        setState(prev => ({ ...prev, loading: true }));
        try {
            await verifyUser(state.phoneNumber, state.authCode);
            toast.success('ورود موفقیت‌آمیز');
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || 'کد نامعتبر است');
        } finally {
            setState(prev => ({ ...prev, loading: false }));
        }
    };

    return (
        <MuiContainer maxWidth="sm">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <StyledContainer>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={isVerified ? 'profile' : (state.codeSent ? 'verify' : 'phone')}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Box textAlign="center" mb={4}>
                                {isVerified ? <MobileFriendly sx={{ fontSize: 48, color: 'primary.main' }} /> :
                                    (state.codeSent ? <Lock sx={{ fontSize: 48, color: 'primary.main' }} /> :
                                        <Phone sx={{ fontSize: 48, color: 'primary.main' }} />)}
                                <Typography variant="h4" fontWeight="bold" mt={2}>
                                    {isVerified ? 'خوش آمدید' :
                                        (state.codeSent ? 'تایید کد' : 'ورود به حساب')}
                                </Typography>
                            </Box>

                            {isVerified ? (
                                <ActionButton
                                    fullWidth
                                    variant="contained"
                                    onClick={() => {
                                        logout();
                                        toast.success('خروج موفقیت‌آمیز');
                                        navigate('/');
                                    }}
                                    endIcon={<ExitToApp />}
                                >
                                    خروج از حساب
                                </ActionButton>
                            ) : (
                                <Box component="form" onSubmit={(e) => {
                                    e.preventDefault();
                                    state.codeSent ? handleVerifyCode() : handleSendCode();
                                }}>
                                    <StyledTextField
                                        fullWidth
                                        label="شماره موبایل"
                                        value={state.phoneNumber}
                                        onChange={(e) => setState(prev => ({ ...prev, phoneNumber: e.target.value }))}
                                        disabled={state.codeSent}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Phone color="primary" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />

                                    {state.codeSent && (
                                        <>
                                            <CodeInput
                                                fullWidth
                                                value={state.authCode}
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/\D/g, '');
                                                    if (value.length <= 6) {
                                                        setState(prev => ({ ...prev, authCode: value }));
                                                    }
                                                }}
                                                placeholder="------"
                                                sx={{ mb: 6 }}
                                            />

                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={state.agreeToTerms}
                                                        onChange={(e) => setState(prev => ({ ...prev, agreeToTerms: e.target.checked }))}
                                                    />
                                                }
                                                label={
                                                    <Typography variant="body2" style={{
                                                        direction: "rtl", justifyContent: 'center', alignItems: 'center' }}>
                                                        <Link to="/terms" style={{ color: theme.palette.primary.main,}}>
                                                            قوانین و مقررات
                                                        </Link> را می‌پذیرم
                                                    </Typography>
                                                }
                                            />
                                        </>
                                    )}

                                    <ActionButton
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        disabled={state.loading || (state.codeSent && state.authCode.length !== 6)}
                                        endIcon={state.loading ? <CircularProgress size={24} /> : <Send />}
                                    >
                                        {state.loading ? 'لطفا صبر کنید...' :
                                            (state.codeSent ? 'تایید کد' : 'دریافت کد')}
                                    </ActionButton>

                                    {state.codeSent && (
                                        <Button
                                            fullWidth
                                            sx={{ mt: 2 }}
                                            disabled={!state.canResend}
                                            onClick={handleSendCode}
                                        >
                                            {state.canResend ? 'ارسال مجدد کد' :
                                                `ارسال مجدد کد تا ${state.timer} ثانیه دیگر`}
                                        </Button>
                                    )}
                                </Box>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </StyledContainer>
            </motion.div>
            <ToastContainer
                position={isMobile ? "bottom-center" : "top-right"}
                theme="colored"
            />
        </MuiContainer>
    );
};

export default Auth;