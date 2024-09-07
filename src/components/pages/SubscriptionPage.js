import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const SubscriptionPage = () => {
    const { token } = useContext(AuthContext);  // دریافت توکن از context
    const [selectedDuration, setSelectedDuration] = useState('');  // مدت زمان انتخاب‌شده
    const [hasSubscription, setHasSubscription] = useState(false);  // آیا کاربر اشتراکی دارد؟

    // بررسی وجود اشتراک برای کاربر
    useEffect(() => {
        // فرض می‌کنیم که شما اینجا API را برای چک کردن اشتراک کاربر فراخوانی می‌کنید
        axios.get('http://127.0.0.1:8000/api/subscriptions/create-payment/', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                if (response.data.length > 0) {
                    setHasSubscription(true);  // اگر اشتراکی وجود دارد
                }
            })
            .catch(error => {
                console.error('Error fetching subscriptions:', error);
            });
    }, [token]);

    const handleSelectChange = (event) => {
        setSelectedDuration(event.target.value);  // ذخیره مدت زمان انتخاب‌شده
    };

    const handleProceedToPayment = () => {
        console.log('handleProceedToPayment called!');

        // بررسی توکن
        if (!token) {
            toast.error('لطفاً ابتدا وارد شوید.');
            return;
        }

        // بررسی انتخاب مدت زمان
        if (!selectedDuration) {
            toast.error('لطفاً یک مدت زمان اشتراک انتخاب کنید.');
            return;
        }

        console.log('Sending request to backend for payment...');


        axios.post('http://127.0.0.1:8000/api/subscriptions/create-payment/', {
            duration: selectedDuration
        }, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                console.log('Response:', response);  // بررسی پاسخ
                if (response.data.payment_url) {
                    window.location.href = response.data.payment_url;  // هدایت به درگاه پرداخت
                } else {
                    toast.error('پرداخت انجام نشد. دوباره تلاش کنید.');
                }
            })
            .catch(error => {
                console.error('Error during payment creation:', error);
                toast.error('خطا در ایجاد پرداخت. لطفاً دوباره تلاش کنید.');
            });
    };

    return (
        <div>
            <h1>انتخاب اشتراک</h1>

            {!hasSubscription ? (
                <div>
                    <select value={selectedDuration} onChange={handleSelectChange}>
                        <option value="" disabled>یک طرح اشتراک انتخاب کنید</option>
                        <option value="1_month">یک ماهه - 300,000 تومان</option>
                        <option value="3_months">سه ماهه - 750,000 تومان</option>
                        <option value="6_months">شش ماهه - 1,400,000 تومان</option>
                    </select>

                    <button
                        onClick={handleProceedToPayment}
                        disabled={!selectedDuration}  // غیر فعال کردن دکمه اگر مدت زمان انتخاب نشده باشد
                    >
                        ادامه به پرداخت
                    </button>
                </div>
            ) : (
                <p>شما یک اشتراک فعال دارید.</p>
            )}
        </div>
    );
};

export default SubscriptionPage;
