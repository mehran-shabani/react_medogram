// components/Steps/StepOne.js
import React from 'react';
import { TextField, MenuItem, Typography } from '@mui/material';
import { insuranceTypes } from '../data/symptomData';

const StepOne = ({ formData, handleChange }) => {
    return (
        <>
            <Typography variant="body1" sx={{ mb: 1, color: 'gray' }}>
                لطفا اطلاعات بیمار را وارد کنید.
            </Typography>

            <TextField
                label="نام کامل"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                helperText="نام خود را وارد کنید."
            />

            <TextField
                label="کد ملی"
                name="national_code"
                value={formData.national_code}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                helperText="کد ملی ۱۰ رقمی خود را وارد کنید."
            />

            <TextField
                select
                label="نوع بیمه"
                name="insurance_type"
                value={formData.insurance_type}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                helperText="لطفا نوع بیمه خود را انتخاب کنید."
            >
                <MenuItem value="">انتخاب کنید</MenuItem>
                {insuranceTypes.map((ins) => (
                    <MenuItem key={ins.value} value={ins.value}>
                        {ins.label}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                select
                label="نوع ویزیت"
                name="urgency"
                value={formData.urgency}
                onChange={handleChange}
                fullWidth
                margin="normal"
                helperText="لطفا یکی از گزینه‌های مربوط به نوع ویزیت را انتخاب کنید."
            >
                <MenuItem value="prescription">نسخه نویسی داروهای شما</MenuItem>
                <MenuItem value="diet">مشاوره و در خواست رژیم غذایی</MenuItem>
                <MenuItem value="addiction">مشاوره زیبایی</MenuItem>
                <MenuItem value="online_consultation">ویزیت و مشاوره آنلاین</MenuItem>
                <MenuItem value="online_consultation">مشاوره اعصاب و روان</MenuItem>
            </TextField>
        </>
    );
};

export default StepOne;
