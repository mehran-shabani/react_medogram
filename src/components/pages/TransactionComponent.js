import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';  // Import the Auth context you created

const TransactionComponent = () => {
    const { token, isVerified } = useContext(AuthContext); // Get the token and verification state from AuthContext
    const [loading, setLoading] = useState(false);         // State for loading status
    const [paymentUrl, setPaymentUrl] = useState(null);    // State to store the payment URL
    const [error, setError] = useState(null);              // State to store any errors

    const getPaymentLink = async () => {
        setLoading(true);  // Start loading
        setError(null);    // Clear previous errors

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`, // Use the token for authenticated request
                }
            };

            const response = await axios.post('https://api.medogram.ir/api/transaction/', {}, config);
            setPaymentUrl(response.data.payment_url); // Get the payment URL from the API response
        } catch (err) {
            setError(err.response ? err.response.data.error : 'An error occurred while fetching the payment link.');
        } finally {
            setLoading(false);  // Stop loading
        }
    };

    return (
        <div>
            {isVerified ? (
                <>
                    {loading ? (
                        <button disabled>Loading...</button>  // Show loading state
                    ) : (
                        !paymentUrl ? (
                            <button onClick={getPaymentLink}>Request Payment Link</button>
                        ) : (
                            <a href={paymentUrl} target="_blank" rel="noopener noreferrer">
                                <button>Proceed to Payment</button>
                            </a>
                        )
                    )}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </>
            ) : (
                <p>Please verify your account to continue with the payment.</p>
            )}
        </div>
    );
};

export default TransactionComponent;
