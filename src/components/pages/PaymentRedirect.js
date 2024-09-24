import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const PaymentRedirect = () => {
    const location = useLocation();
    const [transId, setTransId] = useState(null);
    const [idGet, setIdGet] = useState(null);
    const [status, setStatus] = useState('');

    // Extract trans_id and id_get from URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const transIdFromURL = params.get('trans_id');
        const idGetFromURL = params.get('id_get');

        if (transIdFromURL && idGetFromURL) {
            setTransId(transIdFromURL);
            setIdGet(idGetFromURL);
        }
    }, [location]);

    // Function to send data to the backend
    const verifyPayment = useCallback(async () => {
        try {
            const response = await axios.post('https://api.medogram.ir/api/verify-payment/', {
                trans_id: transId,
                id_get: idGet
            });
            setStatus('Payment Verified: ' + response.data.message);
        } catch (error) {
            setStatus('Error verifying payment: ' + error.response?.data?.error || 'Error occurred');
        }
    }, [transId, idGet]);

    // Automatically call verifyPayment once we have the trans_id and id_get
    useEffect(() => {
        if (transId && idGet) {
            verifyPayment();
        }
    }, [transId, idGet, verifyPayment]);

    return (
        <div>
            <h1>Payment Verification</h1>
            {status ? <p>{status}</p> : <p>Verifying payment...</p>}
        </div>
    );
};

export default PaymentRedirect;
