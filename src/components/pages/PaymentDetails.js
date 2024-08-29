import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Typography, Button, CircularProgress, Paper } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PaymentDetails = ({ selectedSubscription }) => {
    const { token } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [paymentUrl, setPaymentUrl] = useState(null);

    const priceMap = {
        '1_month': '30,000 تومان',
        '3_months': '75,000 تومان',
        '6_months': '140,000 تومان',
    };

    const handlePayment = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/subscriptions/${selectedSubscription.user_id}/create-payment/`,
                { duration: selectedSubscription.duration },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setPaymentUrl(response.data.payment_url);
            setLoading(false);
        } catch (error) {
            console.error('Error during payment creation:', error);
            toast.error('خطا در ایجاد پرداخت. لطفاً دوباره تلاش کنید.');
            setLoading(false);
        }
    };

    const handleRedirectToPayment = () => {
        if (paymentUrl) {
            window.location.href = paymentUrl;
        }
    };

    return (
        <Paper elevation={3} sx={{ padding: 3, maxWidth: 400, margin: '20px auto' }}>
            <Typography variant="h6" gutterBottom>
                جزئیات اشتراک
            </Typography>
            <Typography>مدت اشتراک: {selectedSubscription.duration === '1_month' ? '1 ماهه' : selectedSubscription.duration === '3_months' ? '3 ماهه' : '6 ماهه'}</Typography>
            <Typography>مبلغ: {priceMap[selectedSubscription.duration]}</Typography>

            {!paymentUrl && (
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 3 }}
                    onClick={handlePayment}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} /> : 'ادامه به پرداخت'}
                </Button>
            )}

            {paymentUrl && (
                <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    sx={{ mt: 3 }}
                    onClick={handleRedirectToPayment}
                >
                    ورود به درگاه پرداخت
                </Button>
            )}
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
        </Paper>
    );
};

export default PaymentDetails;
