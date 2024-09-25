import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
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
    useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LockIcon from '@mui/icons-material/Lock';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    maxWidth: 450,
    margin: '0 auto',
    marginTop: theme.spacing(8),
    borderRadius: 16,
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
}));

const ContentBox = styled(Box)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: theme.spacing(3),
}));

const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: 25,
    padding: '10px 25px',
    fontSize: '1rem',
    fontWeight: 'bold',
    textTransform: 'none',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    transition: 'all 0.3s',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 10px 4px rgba(255, 105, 135, .3)',
    },
}));

const TransactionComponent = () => {
    const { token, isVerified } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [paymentUrl, setPaymentUrl] = useState(null);
    const theme = useTheme();

    const getPaymentLink = async () => {
        setLoading(true);

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            };

            const response = await axios.post('http://127.0.0.1:8000/api/transaction/', {}, config);
            setPaymentUrl(response.data.payment_url);
            toast.success('Payment link generated successfully!');
        } catch (err) {
            const errorMessage = err.response ? err.response.data.error : 'An error occurred while fetching the payment link.';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Fade in={true} timeout={1000}>
                <StyledPaper elevation={5}>
                    <ContentBox>
                        <Typography variant="h4" gutterBottom align="center" color="primary" style={{ fontWeight: 'bold' }}>
                            Secure Transaction
                        </Typography>
                        <Divider style={{ margin: theme.spacing(2, 0) }} />
                        {isVerified ? (
                            <Grow in={true} timeout={500}>
                                <Box display="flex" flexDirection="column" alignItems="center">
                                    {loading ? (
                                        <CircularProgress size={50} thickness={5} style={{ margin: theme.spacing(3) }} />
                                    ) : (
                                        !paymentUrl ? (
                                            <StyledButton
                                                variant="contained"
                                                color="primary"
                                                onClick={getPaymentLink}
                                                fullWidth
                                                startIcon={<CreditCardIcon />}
                                            >
                                                Request Payment Link
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
                                                Proceed to Payment
                                            </StyledButton>
                                        )
                                    )}
                                    <Typography variant="body2" style={{ marginTop: theme.spacing(2), color: theme.palette.text.secondary }}>
                                        Your transaction is protected by our secure payment system.
                                    </Typography>
                                </Box>
                            </Grow>
                        ) : (
                            <Box textAlign="center" mt={2}>
                                <LockIcon color="error" style={{ fontSize: 48, marginBottom: theme.spacing(2) }} />
                                <Typography color="error" variant="h6">
                                    Account Verification Required
                                </Typography>
                                <Typography color="textSecondary" style={{ marginTop: theme.spacing(1) }}>
                                    Please verify your account to proceed with the payment.
                                </Typography>
                            </Box>
                        )}
                    </ContentBox>
                </StyledPaper>
            </Fade>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Container>
    );
};

export default TransactionComponent;