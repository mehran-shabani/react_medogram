import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
    const { token, isVerified } = useContext(AuthContext);
    const [hasRecentTransaction, setHasRecentTransaction] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkTransaction = async () => {
            if (isVerified) {
                try {
                    const response = await fetch('https://api.medogram/check-transaction/', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setHasRecentTransaction(data.has_recent_transaction);
                    } else {
                        console.error('Error checking transaction:', response.status);
                    }
                } catch (error) {
                    console.error('Error:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        checkTransaction();
    }, [token, isVerified]);

    return (
        <TransactionContext.Provider value={{ hasRecentTransaction, loading }}>
            {children}
        </TransactionContext.Provider>
    );
};

export const useTransaction = () => {
    return useContext(TransactionContext);
};
