// components/Steps/StepTwo.js
import React from 'react';
import { TextField, MenuItem, Typography } from '@mui/material';
import { symptomCategories } from '../data/symptomData';

const StepTwo = ({ formData, handleChange }) => {
    // دسته علائم عمومی و عصبی -> ایندکس 0 و 1 از آرایه symptomCategories
    const categoriesToShow = symptomCategories.slice(0, 2);

    return (
        <>
            <Typography variant="body1" sx={{ mb: 1, color: 'gray' }}>
                علائم عمومی و عصبی را وارد کنید. حداقل یکی از علائم عمومی الزامی است.
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

                    {category.options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            ))}
        </>
    );
};

export default StepTwo;
