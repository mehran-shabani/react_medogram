import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../Auth/AuthContext';
import {
    Button,
    Typography,
    Paper,
    CircularProgress,
    Box,
    Container,
    Fade,
    Grow,
    Divider,
    useTheme,
    TextField,
    Tooltip,
    Zoom,
    IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LockIcon from '@mui/icons-material/Lock';
import PaymentIcon from '@mui/icons-material/Payment';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SecurityIcon from '@mui/icons-material/Security';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    maxWidth: 450,
    margin: '0 auto',
    marginTop: theme.spacing(8),
    borderRadius: 24,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    background: 'linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-5px)',
    },
}));

const ContentBox = styled(Box)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: theme.spacing(4),
    boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.1)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: 30,
    padding: '12px 30px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    textTransform: 'none',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
        transform: 'translateY(-3px) scale(1.02)',
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)',
    },
}));

const AmountButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(0.7),
    borderRadius: 20,
    padding: '8px 20px',
    transition: 'all 0.2s ease',
    '&:hover': {
        transform: 'scale(1.05)',
    },
    '&.Mui-selected': {
        background: theme.palette.primary.main,
        color: '#fff',
    },
}));

const PaymentAmount = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(25, 118, 210, 0.08)',
    color: theme.palette.primary.main,
    padding: theme.spacing(3),
    borderRadius: 16,
    marginBottom: theme.spacing(3),
    border: '2px solid rgba(25, 118, 210, 0.2)',
    transition: 'all 0.3s ease',
    '&:hover': {
        backgroundColor: 'rgba(25, 118, 210, 0.12)',
        transform: 'scale(1.02)',
    },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: 12,
        transition: 'all 0.2s',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
        },
        '&.Mui-focused': {
            backgroundColor: 'rgba(0, 0, 0, 0.03)',
        },
    },
}));

const SecurityBadge = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    padding: theme.spacing(1.5),
    borderRadius: 12,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    color: theme.palette.success.main,
    marginTop: theme.spacing(2),
}));

const TransactionComponent = () => {
    const { token, isVerified } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [paymentUrl, setPaymentUrl] = useState(null);
    const [amount, setAmount] = useState(300000);
    const [amountError, setAmountError] = useState('');
    const theme = useTheme();

    const predefinedAmounts = [300000, 600000, 900000, 1200000];

    const handleAmountChange = (event) => {
        const value = parseInt(event.target.value);
        if (isNaN(value)) {
            setAmountError('لطفاً یک عدد معتبر وارد کنید');
            return;
        }
        if (value < 100000) {
            setAmountError('حداقل مبلغ ۱۰۰,۰۰۰ تومان است');
        } else if (value > 5000000) {
            setAmountError('حداکثر مبلغ ۵,۰۰۰,۰۰۰ تومان است');
        } else {
            setAmountError('');
        }
        setAmount(value);
        setPaymentUrl(null);
    };

    const handlePresetAmountClick = (preset) => {
        setAmount(preset);
        setPaymentUrl(null);
        setAmountError('');
    };

    const getPaymentLink = async () => {
        if (amountError) return;

        setLoading(true);
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const response = await axios.post('https://api.medogram.ir/api/transaction/', {
                amount: amount
            }, config);
            setPaymentUrl(response.data.payment_url);
            toast.success('لینک پرداخت با موفقیت ایجاد شد!', {
                position: "top-center",
                autoClose: 3000
            });
        } catch (err) {
            const errorMessage = err.response?.data.error || 'خطایی در دریافت لینک پرداخت رخ داده است.';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const formatAmount = (value) => {
        return new Intl.NumberFormat('fa-IR').format(value);
    };

    return (
        <Container maxWidth="sm">
            <Fade in={true} timeout={1000}>
                <StyledPaper elevation={5}>
                    <ContentBox>
                        <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
                            <PaymentIcon style={{ fontSize: 40, color: theme.palette.primary.main, marginRight: 10 }} />
                            <Typography variant="h4" color="primary" style={{ fontWeight: 'bold' }}>
                                پرداخت امن
                            </Typography>
                        </Box>

                        <Box mb={4}>
                            <Typography variant="h6" gutterBottom align="center" color="textSecondary">
                                مبلغ مورد نظر را انتخاب کنید
                            </Typography>
                            <Box display="flex" flexWrap="wrap" justifyContent="center" mb={3}>
                                {predefinedAmounts.map((preset) => (
                                    <Zoom in={true} key={preset} style={{ transitionDelay: `${predefinedAmounts.indexOf(preset) * 100}ms` }}>
                                        <AmountButton
                                            variant={amount === preset ? "contained" : "outlined"}
                                            color="primary"
                                            onClick={() => handlePresetAmountClick(preset)}
                                            className={amount === preset ? 'Mui-selected' : ''}
                                        >
                                            {formatAmount(preset)} تومان
                                        </AmountButton>
                                    </Zoom>
                                ))}
                            </Box>
                            <StyledTextField
                                fullWidth
                                label="مبلغ دلخواه (تومان)"
                                type="number"
                                value={amount}
                                onChange={handleAmountChange}
                                error={Boolean(amountError)}
                                helperText={amountError || "مبلغ باید بین ۱۰۰,۰۰۰ تا ۵,۰۰۰,۰۰۰ تومان باشد"}
                                InputProps={{
                                    endAdornment: (
                                        <Tooltip title="مبلغ را به تومان وارد کنید" arrow placement="top">
                                            <IconButton size="small">
                                                <HelpOutlineIcon color="primary" />
                                            </IconButton>
                                        </Tooltip>
                                    ),
                                }}
                            />
                        </Box>

                        <PaymentAmount>
                            <PaymentIcon style={{ marginRight: theme.spacing(1), fontSize: 28 }} />
                            <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                                مبلغ قابل پرداخت: {formatAmount(amount)} تومان
                            </Typography>
                        </PaymentAmount>

                        <Divider style={{ margin: theme.spacing(3, 0) }} />

                        {isVerified ? (
                            <Grow in={true} timeout={500}>
                                <Box display="flex" flexDirection="column" alignItems="center">
                                    {loading ? (
                                        <CircularProgress size={56} thickness={4} />
                                    ) : (
                                        !paymentUrl ? (
                                            <StyledButton
                                                variant="contained"
                                                color="primary"
                                                onClick={getPaymentLink}
                                                fullWidth
                                                disabled={Boolean(amountError)}
                                                startIcon={<CreditCardIcon />}
                                            >
                                                دریافت لینک پرداخت
                                            </StyledButton>
                                        ) : (
                                            <StyledButton
                                                variant="contained"
                                                color="secondary"
                                                href={paymentUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                fullWidth
                                                startIcon={<CreditCardIcon />}
                                            >
                                                ادامه به درگاه پرداخت
                                            </StyledButton>
                                        )
                                    )}

                                    <SecurityBadge>
                                        <SecurityIcon color="success" />
                                        <Typography variant="body2">
                                            تراکنش شما با پروتکل (اس اس ال) محافظت می‌شود
                                        </Typography>
                                    </SecurityBadge>
                                </Box>
                            </Grow>
                        ) : (
                            <Box textAlign="center" mt={2}>
                                <LockIcon color="error" style={{ fontSize: 56, marginBottom: theme.spacing(2) }} />
                                <Typography color="error" variant="h6" gutterBottom>
                                    تایید حساب الزامی است
                                </Typography>
                                <Typography color="textSecondary">
                                    لطفا برای ادامه، حساب کاربری خود را تایید کنید.
                                </Typography>
                            </Box>
                        )}
                    </ContentBox>
                </StyledPaper>
            </Fade>

            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={true}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </Container>
    );
};

export default TransactionComponent;