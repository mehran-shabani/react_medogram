import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { SubscriptionContext } from '../context/SubscriptionContext';
import { Typography, Button, MenuItem, Select, Paper, Container } from '@mui/material';
import PaymentDetails from './PaymentDetails';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SubscriptionPage = () => {
    const { token } = useContext(AuthContext);
    const { subscriptions } = useContext(SubscriptionContext);
    const [selectedDuration, setSelectedDuration] = useState('');
    const [showPaymentDetails, setShowPaymentDetails] = useState(false);

    const handleSelectChange = (event) => {
        setSelectedDuration(event.target.value);
    };

    const handleProceedToPayment = () => {
        if (!token) {
            toast.error('Please log in first.');
            return;
        }

        const currentSubscription = subscriptions.find(
            (sub) => sub.duration === selectedDuration
        );

        if (!currentSubscription) {
            toast.error('Selected subscription not found.');
            return;
        }

        setShowPaymentDetails(true);
    };

    return (
        <Container maxWidth="sm" sx={{ padding: 4 }}>
            <Paper elevation={6} sx={{ padding: 4, borderRadius: 2 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Choose Your Subscription
                </Typography>
                <Select
                    value={selectedDuration}
                    onChange={handleSelectChange}
                    displayEmpty
                    fullWidth
                    sx={{ mb: 3, '& .MuiOutlinedInput-notchedOutline': { borderColor: '#1976d2' } }}
                >
                    <MenuItem value="" disabled>
                        Select a subscription plan
                    </MenuItem>
                    <MenuItem value="1_month">1 Month - $10</MenuItem>
                    <MenuItem value="3_months">3 Months - $25</MenuItem>
                    <MenuItem value="6_months">6 Months - $45</MenuItem>
                </Select>

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleProceedToPayment}
                    disabled={!selectedDuration}
                    sx={{ padding: 1.5, fontSize: '1.1rem' }}
                >
                    Continue to Payment
                </Button>
            </Paper>

            {showPaymentDetails && (
                <PaymentDetails
                    selectedSubscription={{
                        duration: selectedDuration,
                        user_id: subscriptions[0].user,
                    }}
                />
            )}
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
        </Container>
    );
};

export default SubscriptionPage;
