// components/Steps/StepFour.js
import React from 'react';
import { Typography, Box } from '@mui/material';
import { symptomCategories, insuranceTypes } from '../data/symptomData';

const StepFour = ({ formData }) => {
    // برای تبدیل مقدار سلکت شده به لیبل نمایش:
    const findLabel = (catIndex, value) => {
        if (!value) return 'هیچ';
        const found = symptomCategories[catIndex].options.find((o) => o.value === value);
        return found ? found.label : 'هیچ';
    };

    const insuranceLabel =
        insuranceTypes.find((item) => item.value === formData.insurance_type)?.label || 'مشخص نشده';

    return (
        <>
            <Typography variant="h6" sx={{ mb: 2 }}>
                خلاصه اطلاعات و تأیید نهایی
            </Typography>

            <Box sx={{ mb: 2, color: 'gray' }}>
                <Typography>نام: {formData.name}</Typography>
                <Typography>کد ملی: {formData.national_code}</Typography>
                <Typography>نوع بیمه: {insuranceLabel}</Typography>
                <Typography>نوع ویزیت: {formData.urgency}</Typography>

                <Typography>علائم عمومی: {findLabel(0, formData.general_symptoms)}</Typography>
                <Typography>علائم عصبی: {findLabel(1, formData.neurological_symptoms)}</Typography>
                <Typography>علائم قلبی عروقی: {findLabel(2, formData.cardiovascular_symptoms)}</Typography>
                <Typography>علائم گوارشی: {findLabel(3, formData.gastrointestinal_symptoms)}</Typography>
                <Typography>علائم تنفسی: {findLabel(4, formData.respiratory_symptoms)}</Typography>

                {formData.description && <Typography>توضیحات اضافی: {formData.description}</Typography>}
            </Box>

            <Typography variant="body2" sx={{ color: 'red' }}>
                اگر تمام موارد صحیح است، روی «بعدی» کلیک کنید.
            </Typography>
        </>
    );
};

export default StepFour;
