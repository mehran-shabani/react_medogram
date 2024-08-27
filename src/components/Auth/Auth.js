import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
} from '@mui/material';
import { styled } from '@mui/system';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    maxWidth: 400,
    margin: '100px auto',
    textAlign: 'center',
}));

const Auth = () => {
    const navigate = useNavigate();
    const { registerUser, verifyUser } = useContext(AuthContext);
    const [loading, setLoading] = React.useState(false);
    const [codeSent, setCodeSent] = React.useState(false);
    const [timer, setTimer] = React.useState(60);
    const [canResend, setCanResend] = React.useState(false);
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [authCode, setAuthCode] = React.useState('');

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
        setLoading(true);
        try {
            await registerUser(phoneNumber);
            setCodeSent(true);
            setTimer(60); // تنظیم تایمر برای ارسال مجدد کد
            setCanResend(false);
            toast.success('کد احراز هویت ارسال شد!');
        } catch (error) {
            toast.error('خطا در ارسال کد احراز هویت');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyCode = async () => {
        setLoading(true);
        try {
            await verifyUser(phoneNumber, authCode);
            toast.success('احراز هویت با موفقیت انجام شد!');
            navigate('/');
        } catch (error) {
            toast.error('کد احراز هویت نامعتبر است');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Container elevation={3}>
                <Typography variant="h5" gutterBottom>
                    احراز هویت
                </Typography>
                <Box
                    component="form"
                    onSubmit={codeSent ? handleVerifyCode : handleSendCode}
                    sx={{ mt: 2 }}
                >
                    <TextField
                        label="شماره تلفن"
                        variant="outlined"
                        fullWidth
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        disabled={codeSent}
                        sx={{ mb: 2 }}
                    />

                    {codeSent && (
                        <TextField
                            label="کد احراز هویت"
                            variant="outlined"
                            fullWidth
                            value={authCode}
                            onChange={(e) => setAuthCode(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                    )}

                    <Button
                        type="button"
                        variant="contained"
                        fullWidth
                        onClick={codeSent ? handleVerifyCode : handleSendCode}
                        disabled={loading || (codeSent && !authCode)} // دکمه تایید کد بدون تایمر
                        sx={{ mt: 2 }}
                    >
                        {loading ? 'در حال انجام...' : (codeSent ? 'تایید کد' : 'ارسال کد')}
                    </Button>

                    {codeSent && (
                        <Button
                            variant="text"
                            fullWidth
                            sx={{ mt: 2 }}
                            onClick={handleSendCode}
                            disabled={!canResend}
                        >
                            {canResend ? 'ارسال مجدد کد' : `ارسال مجدد کد در ${timer} ثانیه`}
                        </Button>
                    )}
                </Box>
            </Container>
            <ToastContainer />
        </>
    );
};

export default Auth;
