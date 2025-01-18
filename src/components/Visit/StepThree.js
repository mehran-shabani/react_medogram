// components/Steps/StepThree.js
import React from 'react';
import { TextField, MenuItem, Typography } from '@mui/material';
import { symptomCategories } from '../data/symptomData';

const StepThree = ({ formData, handleChange }) => {
    // دسته علائم قلبی (ایندکس 2)، گوارشی (3) و تنفسی (4)
    const categoriesToShow = symptomCategories.slice(2);

    return (
        <>
            <Typography variant="body1" sx={{ mb: 1, color: 'gray' }}>
                علائم قلبی عروقی، گوارشی و تنفسی را وارد کنید (در صورت وجود).
                همچنین می‌توانید در صورت نیاز، توضیحات اضافه وارد نمایید.
            </Typography>

            {categoriesToShow.map((category) => (
                <TextField
                    key={category.key}
                    select
                    label={category.label}
                    name={category.key}
                    value={formData[category.key]}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                >
                    <MenuItem value="">هیچ کدام</MenuItem>
                    {category.options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            ))}

            <TextField
                label="توضیحات اضافی"
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                margin="normal"
                helperText="در صورت تمایل، توضیحات دلخواه خود را وارد کنید."
            />
        </>
    );
};

export default StepThree;
