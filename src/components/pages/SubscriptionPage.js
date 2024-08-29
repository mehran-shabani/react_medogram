import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { SubscriptionContext } from '../context/SubscriptionContext'; // اضافه کردن SubscriptionContext
import { Box, Typography, Button, MenuItem, Select, Paper } from '@mui/material';
import PaymentDetails from './PaymentDetails';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SubscriptionPage = () => {
    const { token } = useContext(AuthContext); // دریافت توکن از AuthContext
    const { subscriptions } = useContext(SubscriptionContext); // دریافت اطلاعات اشتراک‌ها از SubscriptionContext
    const [selectedDuration, setSelectedDuration] = useState('');
    const [showPaymentDetails, setShowPaymentDetails] = useState(false);

    const handleSelectChange = (event) => {
        setSelectedDuration(event.target.value);
    };

    const handleProceedToPayment = () => {
        if (!token) {
            toast.error('لطفاً وارد شوید تا بتوانید اشتراک خریداری کنید.');
            return;
        }

        // فرض می‌کنیم که هر کاربر فقط یک اشتراک دارد
        const currentSubscription = subscriptions.find(
            (sub) => sub.duration === selectedDuration
        );

        if (!currentSubscription) {
            toast.error('اشتراک انتخاب شده یافت نشد.');
            return;
        }

        setShowPaymentDetails(true);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 4 }}>
            <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 400 }}>
                <Typography variant="h5" gutterBottom>
                    انتخاب اشتراک
                </Typography>
                <Select
                    value={selectedDuration}
                    onChange={handleSelectChange}
                    displayEmpty
                    fullWidth
                    sx={{ mb: 2 }}
                >
                    <MenuItem value="" disabled>
                        انتخاب نوع اشتراک
                    </MenuItem>
                    <MenuItem value="1_month">1 ماهه - 30,000 تومان</MenuItem>
                    <MenuItem value="3_months">3 ماهه - 75,000 تومان</MenuItem>
                    <MenuItem value="6_months">6 ماهه - 140,000 تومان</MenuItem>
                </Select>

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleProceedToPayment}
                    disabled={!selectedDuration}
                >
                    ادامه
                </Button>
            </Paper>

            {showPaymentDetails && (
                <PaymentDetails
                    selectedSubscription={{
                        duration: selectedDuration,
                        user_id: subscriptions[0].user, // فرض بر این که user_id در subscriptions ذخیره شده است
                    }}
                />
            )}
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
        </Box>
    );
};

export default SubscriptionPage;
