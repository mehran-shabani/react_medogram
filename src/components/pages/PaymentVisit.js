import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PaymentVisit = () => {
    const { token } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [paymentLink, setPaymentLink] = useState('');

    const handleGetPaymentLink = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/transaction/', {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPaymentLink(response.data.payment_url);
        } catch (error) {
            console.error('Error fetching payment link:', error);
            toast.error('Failed to retrieve payment link.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
            <Typography variant="h5" gutterBottom>
                Payment Visit
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleGetPaymentLink}
                disabled={loading}
                sx={{ mb: 2 }}
            >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Get Payment Link'}
            </Button>
            {paymentLink && (
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => window.open(paymentLink, '_blank')}
                >
                    Enter Payment Gateway
                </Button>
            )}
            <ToastContainer />
        </Box>
    );
};

export default PaymentVisit;
