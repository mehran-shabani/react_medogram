import React, { useState, useContext } from 'react';
import { SubscriptionContext } from '../context/SubscriptionContext';
import { SubscriptionContainer, SubscriptionList, SubscriptionItem, SubscriptionSelect, SubscriptionButton } from '../../styles/Subscription.styles';

const Subscription = () => {
    const { subscriptions, createSubscription } = useContext(SubscriptionContext);
    const [duration, setDuration] = useState('');

    const handleCreateSubscription = () => {
        createSubscription(duration).then(() => {
            alert('اشتراک جدید ایجاد شد.');
        }).catch(error => {
            console.error('Error creating subscription:', error);
        });
    };

    return (
        <SubscriptionContainer>
            <h2>مدیریت اشتراک‌ها</h2>
            <SubscriptionList>
                {subscriptions.map(sub => (
                    <SubscriptionItem key={sub.id}>
                        {sub.duration} - {sub.is_active ? 'فعال' : 'غیرفعال'}
                    </SubscriptionItem>
                ))}
            </SubscriptionList>

            <div>
                <SubscriptionSelect value={duration} onChange={(e) => setDuration(e.target.value)}>
                    <option value="1_month">1 ماهه</option>
                    <option value="3_months">3 ماهه</option>
                    <option value="6_months">6 ماهه</option>
                </SubscriptionSelect>
                <SubscriptionButton onClick={handleCreateSubscription}>ایجاد اشتراک</SubscriptionButton>
            </div>
        </SubscriptionContainer>
    );
};

export default Subscription;
