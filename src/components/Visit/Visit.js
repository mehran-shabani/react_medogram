// components/Visit.js

import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
// اگر از AuthContext استفاده نمی‌کنید، با توجه به پروژه‌ی خود تغییر دهید
import { AuthContext } from '../Auth/AuthContext';

import {
    Box,
    Button,
    Typography,
    Paper,
    Grid,
    Stepper,
    Step,
    StepLabel,
    CircularProgress,
} from '@mui/material';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import { insuranceTypes } from '../data/symptomData';

function Visit() {
    // اگر از AuthContext استفاده نمی‌کنید، این خط را به‌تناسب پروژه تغییر یا حذف کنید:
    const { token } = useContext(AuthContext);

    // چهـار استپ:
    //  0 -> اطلاعات بیمار
    //  1 -> علائم عمومی و عصبی
    //  2 -> علائم قلبی، گوارشی و تنفسی
    //  3 -> تأیید و ثبت نهایی
    const [activeStep, setActiveStep] = useState(0);
    const [loading, setLoading] = useState(false);

    // داده‌های فرم
    const [formData, setFormData] = useState({
        name: '',
        national_code: '',
        insurance_type: '',
        urgency: 'prescription',
        general_symptoms: '',
        neurological_symptoms: '',
        cardiovascular_symptoms: '',
        gastrointestinal_symptoms: '',
        respiratory_symptoms: '',
        description: '',
    });

    // برای انیمیشن ظهور/محو صفحه
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
    }, []);

    // تعریف لیبل‌های مراحل (تعداد باید با تعداد استپ‌ها یکی باشد)
    const steps = [
        'اطلاعات بیمار',
        'علائم (۱/۲)',
        'علائم (۲/۲)',
        'تأیید و ثبت نهایی',
    ];

    // تابع اعتبارسنجی مرحله‌ای
    const validateStep = (step) => {
        if (step === 0) {
            // مرحله اول: نام، کد ملی، بیمه
            if (!formData.name.trim()) {
                toast.error('لطفا نام را وارد کنید.');
                return false;
            }
            if (!formData.national_code.trim()) {
                toast.error('لطفا کد ملی را وارد کنید.');
                return false;
            }
            if (!/^[0-9]{10}$/.test(formData.national_code)) {
                toast.error('کد ملی باید عددی و ۱۰ رقمی باشد.');
                return false;
            }
            if (!formData.insurance_type.trim()) {
                toast.error('لطفا نوع بیمه را انتخاب کنید.');
                return false;
            }
        } else if (step === 1) {
            // مرحله دوم: علائم عمومی اجباری
            if (!formData.general_symptoms) {
                toast.error('لطفا حداقل یکی از علائم عمومی را انتخاب کنید.');
                return false;
            }
        }
        // مرحله سوم (ایندکس 2) را میتوانید در صورت لزوم ولیدیت کنید
        return true;
    };

    // وقتی کاربر روی دکمه "بعدی" کلیک می‌کند:
    const handleNext = () => {
        // اعتبارسنجی مرحله فعلی:
        if (!validateStep(activeStep)) return;

        // اگر مشکلی نبود برو استپ بعدی
        setActiveStep((prev) => prev + 1);
    };

    // وقتی کاربر روی دکمه "بازگشت" کلیک می‌کند:
    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };

    // وقتی در فیلدهای فرم تغییر ایجاد می‌شود:
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // تابع سابمیت نهایی فرم (تنها در مرحله آخر اجرا می‌شود)
    const handleSubmit = async (e) => {
        e.preventDefault();

        // اگر می‌خواهید حتماً استپ‌های قبلی درست پر شده باشد، دوباره چک کنید
        if (!validateStep(0) || !validateStep(1)) {
            // اگر پر نشده باشد، جلو ثبت را می‌گیرد.
            return;
        }
        // در این مثال، مرحله 2 اختیاری است. در صورت نیاز می‌توانید validateStep(2) هم بگذارید.

        setLoading(true);

        try {
            // توضیحات نهایی را با درج کد ملی و بیمه بسازیم
            const insuranceLabel =
                insuranceTypes.find((x) => x.value === formData.insurance_type)?.label || 'مشخص نشده';

            const finalDescription = `کد ملی: ${formData.national_code}
نوع بیمه: ${insuranceLabel}
${formData.description}`;

            // آبجکت نهایی که می‌خواهیم به سرور بفرستیم:
            const payload = {
                ...formData,
                description: finalDescription,
            };

            // ارسال درخواست
            const response = await axios.post('https://api.medogram.ir/api/visit/', payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // بعد از موفقیت، فرم را ریست کنیم و به استپ صفر برگردیم
            setFormData({
                name: '',
                national_code: '',
                insurance_type: '',
                urgency: 'prescription',
                general_symptoms: '',
                neurological_symptoms: '',
                cardiovascular_symptoms: '',
                gastrointestinal_symptoms: '',
                respiratory_symptoms: '',
                description: '',
            });
            setActiveStep(0);

            toast.success(`ویزیت برای ${response.data.name} با موفقیت ثبت شد.`);
        } catch (error) {
            console.error('Error creating visit:', error);
            if (error.response && error.response.status === 401) {
                toast.error('احراز هویت ناموفق بود! لطفا دوباره وارد شوید.');
            } else {
                toast.error('خطا در ثبت ویزیت.');
            }
        } finally {
            setLoading(false);
        }
    };

    // این تابع بسته به استپ فعلی، یکی از کامپوننت‌های مرحله را رندر می‌کند:
    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return <StepOne formData={formData} handleChange={handleChange} />;
            case 1:
                return <StepTwo formData={formData} handleChange={handleChange} />;
            case 2:
                return <StepThree formData={formData} handleChange={handleChange} />;
            case 3:
                return <StepFour formData={formData} />;
            default:
                return null;
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#f5f5f5',
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: { xs: 2, sm: 4 },
                    width: '90%',
                    maxWidth: 600,
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
                    backgroundColor: '#ffffff',
                    borderRadius: 4,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
                    ثبت ویزیت جدید
                </Typography>

                <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {renderStepContent(activeStep)}
                        </Grid>
                    </Grid>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            variant="outlined"
                        >
                            بازگشت
                        </Button>

                        {/* اگر در مرحله آخر باشیم (استپ 3)، دکمه "ثبت" نشان می‌دهیم، در غیر این صورت "بعدی" */}
                        {activeStep === steps.length ? (
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"    // اینجا یعنی دکمه واقعا submit فرم است
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : 'ثبت'}
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                disabled={loading}
                                type="button"    // دکمه مرحله میانی، submit نیست
                            >
                                بعدی
                            </Button>
                        )}
                    </Box>
                </Box>
            </Paper>

            <ToastContainer />
        </Box>
    );
}

export default Visit;
