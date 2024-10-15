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
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { Phone, Send, ExitToApp } from '@mui/icons-material';

const Container = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    maxWidth: 400,
    margin: '100px auto',
    textAlign: 'center',
    borderRadius: 16,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: theme.palette.primary.main,
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
        },
    },
}));

const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: 25,
    padding: '10px 0',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },
}));

const VerificationCodeInput = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
}));

const DigitInput = styled(TextField)(({ theme }) => ({
    width: '40px',
    '& input': {
        textAlign: 'center',
        fontSize: '1.2rem',
    },
}));

const Auth = () => {
    const navigate = useNavigate();
    const { registerUser, verifyUser, isVerified, logout } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [codeSent, setCodeSent] = useState(false);
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [authCode, setAuthCode] = useState(['', '', '', '', '', '']);
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        let interval;
        if (codeSent && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setCanResend(true);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [codeSent, timer]);

    const handleSendCode = async () => {
        const phoneNumberRegex = /^09\d{9}$/;

        if (!phoneNumberRegex.test(phoneNumber)) {
            toast.error('شماره تلفن نامعتبر است. باید با 09 شروع شود و 11 رقم داشته باشد.');
            return;
        }

        setLoading(true);
        try {
            await registerUser(phoneNumber);
            setCodeSent(true);
            setTimer(60);
            setCanResend(false);
            toast.success('کد تایید ارسال شد!');
        } catch (error) {
            toast.error('خطا در ارسال کد تایید');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyCode = async () => {
        if (!agreeToTerms) {
            toast.error('لطفا قوانین و مقررات را بپذیرید.');
            return;
        }

        setLoading(true);
        try {
            await verifyUser(phoneNumber, authCode.join(''));
            toast.success('تایید موفقیت‌آمیز بود!');
            navigate('/');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('کد تایید نامعتبر است');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDigitChange = (index, value) => {
        if (value.length <= 1) {
            const newAuthCode = [...authCode];
            newAuthCode[index] = value;
            setAuthCode(newAuthCode);

            // Move focus to the next input
            if (value !== '' && index < 5) {
                document.getElementById(`digit-${index + 1}`).focus();
            }
        }
    };

    const handleLogout = () => {
        logout();
        toast.success('با موفقیت خارج شدید');
        navigate('/');  // یا هر مسیر دیگری که می‌خواهید بعد از خروج به آن هدایت شود
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Container elevation={3}>
                <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
                    {isVerified ? 'پروفایل کاربر' : (codeSent ? 'تایید کد' : 'احراز هویت')}
                </Typography>

                {isVerified ? (
                    <Box sx={{ mt: 3 }}>
                        <Typography variant="body1" gutterBottom>
                            شما با موفقیت وارد شده‌اید.
                        </Typography>
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <StyledButton
                                variant="contained"
                                fullWidth
                                onClick={handleLogout}
                                sx={{ mt: 2 }}
                                endIcon={<ExitToApp />}
                            >
                                خروج
                            </StyledButton>
                        </motion.div>
                    </Box>
                ) : (
                    <Box
                        component="form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            codeSent ? handleVerifyCode() : handleSendCode();
                        }}
                        sx={{ mt: 3 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <StyledTextField
                                label="شماره تلفن"
                                variant="outlined"
                                fullWidth
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                disabled={codeSent}
                                sx={{ mb: 2 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Phone color="primary" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </motion.div>

                        {codeSent && (
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                            >
                                <VerificationCodeInput>
                                    {authCode.map((digit, index) => (
                                        <DigitInput
                                            key={index}
                                            id={`digit-${index}`}
                                            variant="outlined"
                                            value={digit}
                                            onChange={(e) => handleDigitChange(index, e.target.value)}
                                            inputProps={{
                                                maxLength: 1,
                                                pattern: '[0-9]*',
                                                inputMode: 'numeric',
                                            }}
                                        />
                                    ))}
                                </VerificationCodeInput>
                            </motion.div>
                        )}

                        {codeSent && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={agreeToTerms}
                                            onChange={(e) => setAgreeToTerms(e.target.checked)}
                                            color="primary"
                                        />
                                    }
                                    label={
                                        <Typography variant="body2">
                                            من <Link to="/excluded-services" target="_blank">قوانین و مقررات</Link> را می‌پذیرم
                                        </Typography>
                                    }
                                />
                            </motion.div>
                        )}

                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <StyledButton
                                type="submit"
                                variant="contained"
                                fullWidth
                                disabled={loading || (codeSent && authCode.some(digit => digit === ''))}
                                sx={{ mt: 2 }}
                                endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Send />}
                            >
                                {loading ? 'در حال پردازش...' : (codeSent ? 'تایید کد' : 'ارسال کد')}
                            </StyledButton>
                        </motion.div>

                        {codeSent && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.5 }}
                            >
                                <Button
                                    variant="text"
                                    fullWidth
                                    sx={{ mt: 2 }}
                                    onClick={handleSendCode}
                                    disabled={!canResend}
                                >
                                    {canResend ? 'ارسال مجدد کد' : `ارسال مجدد کد در ${timer} ثانیه`}
                                </Button>
                            </motion.div>
                        )}
                    </Box>
                )}
            </Container>
            <ToastContainer position={isMobile ? "bottom-center" : "top-right"} />
        </motion.div>
    );
};

export default Auth;