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
    IconButton,
    Slider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LockIcon from '@mui/icons-material/Lock';
import PaymentIcon from '@mui/icons-material/Payment';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SecurityIcon from '@mui/icons-material/Security';
import DeleteIcon from '@mui/icons-material/Delete';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    maxWidth: '100%',
    width: '100%',
    margin: '0 auto',
    marginTop: theme.spacing(4),
    borderRadius: 20,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
    background: 'linear-gradient(135deg, #5A67D8 0%, #3182CE 100%)',
    transition: 'transform 0.4s ease-in-out',
    '&:hover': {
        transform: 'translateY(-7px)',
    },
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(3),
        marginTop: theme.spacing(2),
    },
}));

const ContentBox = styled(Box)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 24,
    padding: theme.spacing(4),
    boxShadow: 'inset 0 3px 20px rgba(0, 0, 0, 0.1)',
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(3),
    },
}));

const StyledButton = styled(Button)(() => ({
    borderRadius: 25,
    padding: '12px 30px',
    fontSize: '1rem',
    fontWeight: 'bold',
    textTransform: 'none',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
        transform: 'translateY(-5px) scale(1.05)',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.25)',
    },
}));

const AmountSlider = styled(Slider)(({ theme }) => ({
    color: theme.palette.primary.main,
    height: 6,
    '& .MuiSlider-thumb': {
        height: 20,
        width: 20,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    '& .MuiSlider-track': {
        borderRadius: 4,
    },
    '& .MuiSlider-rail': {
        opacity: 0.5,
        backgroundColor: '#bfbfbf',
    },
    [theme.breakpoints.down('sm')]: {
        height: 4,
    },
}));

const PaymentAmount = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(33, 150, 243, 0.15)',
    color: theme.palette.primary.main,
    padding: theme.spacing(3),
    borderRadius: 20,
    marginBottom: theme.spacing(4),
    border: '2px solid rgba(33, 150, 243, 0.3)',
    transition: 'all 0.4s ease',
    '&:hover': {
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
        transform: 'scale(1.05)',
    },
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
    },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: 15,
        transition: 'all 0.3s',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
        },
        '&.Mui-focused': {
            backgroundColor: 'rgba(0, 0, 0, 0.07)',
            boxShadow: '0 0 10px rgba(33, 150, 243, 0.4)'
        },
    },
    '& input': {
        pointerEvents: 'none',
    },
    [theme.breakpoints.down('sm')]: {
        '& .MuiOutlinedInput-root': {
            fontSize: '0.875rem',
        },
    },
}));

const SecurityBadge = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    padding: theme.spacing(2),
    borderRadius: 15,
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    color: theme.palette.success.main,
    marginTop: theme.spacing(3),
    boxShadow: '0 6px 15px rgba(76, 175, 80, 0.3)',
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1.5),
        gap: theme.spacing(1),
    },
}));

const TransactionComponent = () => {
    const { token, isVerified } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [paymentUrl, setPaymentUrl] = useState(null);
    const [amount, setAmount] = useState(300000);
    const [amountError, setAmountError] = useState('');
    const theme = useTheme();

    const handleSliderChange = (event, newValue) => {
        setAmount(newValue);
        setAmountError('');
        setPaymentUrl(null);
    };

    const incrementAmount = () => {
        setAmount((prev) => {
            const newValue = Math.min(prev + 10000, 5000000);
            handleSliderChange(null, newValue);
            return newValue;
        });
    };

    const decrementAmount = () => {
        setAmount((prev) => {
            const newValue = Math.max(prev - 10000, 100000);
            handleSliderChange(null, newValue);
            return newValue;
        });
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
            if (response.data && response.data.payment_url) {
                setPaymentUrl(response.data.payment_url);
                toast.success('لینک پرداخت با موفقیت ایجاد شد!', {
                    position: "top-center",
                    autoClose: 3000
                });
            } else {
                throw new Error('پاسخی از سمت سرور دریافت نشد.');
            }
        } catch (err) {
            const errorMessage = err.response?.data?.error || err.message || 'خطایی در دریافت لینک پرداخت رخ داده است. مجددا با تلفن همراه احراز هویت کنید.';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const formatAmount = (value) => {
        return new Intl.NumberFormat('fa-IR').format(value);
    };

    const handleResetPayment = () => {
        setPaymentUrl(null);
        setAmount(300000);
        setAmountError('');
    };

    return (
        <Container maxWidth="sm">
            <Fade in={true} timeout={1200}>
                <StyledPaper elevation={6}>
                    <ContentBox>
                        <Box display="flex" alignItems="center" justifyContent="center" mb={4}>
                            <PaymentIcon style={{ fontSize: 40, color: theme.palette.primary.main, marginRight: 10 }} />
                            <Typography variant="h5" color="primary" style={{ fontWeight: 'bold', fontFamily: 'Roboto, sans-serif' }}>
                                سیستم پرداخت
                            </Typography>
                        </Box>

                        <Box mb={5} display="flex" alignItems="center" justifyContent="space-between">
                            <IconButton onClick={decrementAmount} color="primary">
                                <RemoveIcon />
                            </IconButton>
                            <AmountSlider
                                value={amount}
                                onChange={handleSliderChange}
                                min={100000}
                                max={5000000}
                                step={10000}
                                marks={[
                                    { value: 100000, label: '۱۰۰,۰۰۰' },
                                    { value: 5000000, label: '۵,۰۰۰,۰۰۰' }
                                ]}
                                valueLabelDisplay="auto"
                                aria-labelledby="amount-slider"
                            />
                            <IconButton onClick={incrementAmount} color="primary">
                                <AddIcon />
                            </IconButton>
                        </Box>

                        <StyledTextField
                            fullWidth
                            label="مبلغ دلخواه (ریال)"
                            type="number"
                            value={amount}
                            onChange={() => {}}
                            error={Boolean(amountError)}
                            helperText={amountError || "مبلغ باید بین ۱۰۰,۰۰۰ تا ۵,۰۰۰,۰۰۰ ریال باشد"}
                            InputProps={{
                                endAdornment: (
                                    <Tooltip title="مبلغ را به ریال وارد کنید" arrow placement="top">
                                        <IconButton size="small">
                                            <HelpOutlineIcon color="primary" />
                                        </IconButton>
                                    </Tooltip>
                                ),
                            }}
                        />

                        <PaymentAmount>
                            <PaymentIcon style={{ marginRight: theme.spacing(1), fontSize: 30 }} />
                            <Typography variant="h6" style={{ fontWeight: 'bold', fontFamily: 'Roboto, sans-serif' }}>
                                مبلغ قابل پرداخت: {formatAmount(amount)}ریال
                            </Typography>
                        </PaymentAmount>

                        <Divider style={{ margin: theme.spacing(3, 0) }} />

                        {isVerified ? (
                            <Grow in={true} timeout={600}>
                                <Box display="flex" flexDirection="column" alignItems="center">
                                    {loading ? (
                                        <CircularProgress size={50} thickness={4} />
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
                                            <Box>
                                                <StyledButton
                                                    variant="contained"
                                                    color="secondary"
                                                    href={paymentUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    fullWidth
                                                    startIcon={<CreditCardIcon />}
                                                >
                                                    ورود به درگاه پرداخت
                                                </StyledButton>
                                                <Box mt={2} display="flex" justifyContent="space-between">
                                                    <Button
                                                        variant="outlined"
                                                        color="secondary"
                                                        startIcon={<DeleteIcon />}
                                                        onClick={() => setPaymentUrl(null)}
                                                    >

                                                    حذف لینک پرداخت
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        color="primary"
                                                        startIcon={<RotateLeftIcon />}
                                                        onClick={handleResetPayment}
                                                    >
                                                        تغییر مبلغ
                                                    </Button>
                                                </Box>
                                            </Box>
                                        )
                                    )}

                                    <SecurityBadge>
                                        <SecurityIcon color="success" />
                                        <Typography variant="body2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                            (SSL) تراکنش شما با پروتکل  محافظت می‌شود
                                        </Typography>
                                    </SecurityBadge>
                                </Box>
                            </Grow>
                        ) : (
                            <Box textAlign="center" mt={3}>
                                <LockIcon color="error" style={{ fontSize: 60, marginBottom: theme.spacing(3) }} />
                                <Typography color="error" variant="h6" gutterBottom style={{ fontFamily: 'Roboto, sans-serif' }}>
                                    تایید حساب الزامی است
                                </Typography>
                                <Typography color="textSecondary" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                    لطفا برای ادامه، حساب کاربری خود را تایید کنید (ورود از طریق شماره تلفن همراه)
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
