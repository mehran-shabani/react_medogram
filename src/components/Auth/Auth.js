import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
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
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { Phone, VpnKey, Send } from '@mui/icons-material';

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

const Auth = () => {
    const navigate = useNavigate();
    const { registerUser, verifyUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [codeSent, setCodeSent] = useState(false);
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [authCode, setAuthCode] = useState('');

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
        // Validate phone number format (starts with 09 and is 11 digits)
        const phoneNumberRegex = /^09\d{9}$/;

        if (!phoneNumberRegex.test(phoneNumber)) {
            toast.error('Invalid phone number. It should start with 09 and be 11 digits long.');
            return;
        }

        setLoading(true);
        try {
            await registerUser(phoneNumber);
            setCodeSent(true);
            setTimer(60);
            setCanResend(false);
            toast.success('Verification code sent!');
        } catch (error) {
            toast.error('Error sending verification code');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyCode = async () => {
        setLoading(true);
        try {
            await verifyUser(phoneNumber, authCode);
            toast.success('Verification successful!');
            navigate('/');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Invalid verification code');
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Container elevation={3}>
                <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
                    {codeSent ? 'Verify Code' : 'Authentication'}
                </Typography>
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
                            label="Phone Number"
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
                            <StyledTextField
                                label="Verification Code"
                                variant="outlined"
                                fullWidth
                                value={authCode}
                                onChange={(e) => setAuthCode(e.target.value)}
                                sx={{ mb: 2 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <VpnKey color="primary" />
                                        </InputAdornment>
                                    ),
                                }}
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
                            disabled={loading || (codeSent && !authCode)}
                            sx={{ mt: 2 }}
                            endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Send />}
                        >
                            {loading ? 'Processing...' : (codeSent ? 'Verify Code' : 'Send Code')}
                        </StyledButton>
                    </motion.div>

                    {codeSent && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                        >
                            <Button
                                variant="text"
                                fullWidth
                                sx={{ mt: 2 }}
                                onClick={handleSendCode}
                                disabled={!canResend}
                            >
                                {canResend ? 'Resend Code' : `Resend code in ${timer} seconds`}
                            </Button>
                        </motion.div>
                    )}
                </Box>
            </Container>
            <ToastContainer position={isMobile ? "bottom-center" : "top-right"} />
        </motion.div>
    );
};

export default Auth;