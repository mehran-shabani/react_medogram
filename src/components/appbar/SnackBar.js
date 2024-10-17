import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

const BottomNavBar = () => {
    const theme = useTheme();

    const iconStyle = {
        fontSize: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: theme.palette.text.secondary,
    };

    const labelStyle = {
        fontSize: '0.75rem',
        marginTop: '4px',
    };



    return (
        <AppBar
            position="fixed"
            color="default"
            sx={{
                top: 'auto',
                bottom: 0,
                backgroundColor: theme.palette.background.paper,
                boxShadow: '0px -2px 4px rgba(0,0,0,0.1)'
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-around' }}>
                <IconButton component={Link} to="/excluded-services" sx={iconStyle}>
                    <span role="img" aria-label="Excluded Services">❌</span>
                    <Typography sx={labelStyle}>خدمات مستثنی</Typography>
                </IconButton>
                <IconButton component={Link} to="/contact" sx={iconStyle}>
                    <span role="img" aria-label="Contact">📞</span>
                    <Typography sx={labelStyle}>تماس</Typography>
                </IconButton>

                <IconButton component={Link} to="/visits" sx={iconStyle}>
                    <span role="img" aria-label="Visit">🩺</span>
                    <Typography sx={labelStyle}>ویزیت</Typography>
                </IconButton>
                <IconButton component={Link} to="/profile" sx={iconStyle}>
                    <span role="img" aria-label="Profile">👤</span>
                    <Typography sx={labelStyle}>پروفایل</Typography>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default BottomNavBar;