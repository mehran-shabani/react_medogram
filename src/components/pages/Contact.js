import React from 'react';
import { Typography, Link } from '@mui/material';
import { Box } from '@mui/system';

const Contact = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2rem',
                p: { xs: '1rem', sm: '2rem', md: '3rem' },
                margin: 'auto',
                borderRadius: '15px',
                boxShadow: 3,
                backgroundColor: '#E3F2FD', // رنگ پس‌زمینه آبی روشن
                width: { xs: '90%', sm: '80%', md: '60%', lg: '50%' }, // عرض واکنش‌گرا
                maxWidth: '600px',
                height: 'auto', // ارتفاع بر اساس محتوای داخلی
                border: '10px solid',
                borderImageSlice: 1,
                borderImageSource: 'linear-gradient(to right, #2196F3, #21CBF3)', // حاشیه با طیف آبی
            }}
        >
            <Typography variant="h4" sx={{ color: '#3f50b5', fontWeight: 'bold', textShadow: '1px 1px 2px black' }}>
                با ما تماس بگیرید
            </Typography>
            <Typography variant="h6" sx={{ fontSize: '1.2rem', color: '#1E88E5', textAlign: 'center' }}>
                برای اطلاعات بیشتر در مورد سرویس‌های پزشکی مدوگرام
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#1565C0', fontWeight: 'bold' }}>
                Tel:&nbsp;
                <Link href="tel:09135666326" sx={{ color: '#1565C0', textDecoration: 'none' }}>
                    0913-566-6326
                </Link>
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#1565C0', fontWeight: 'bold' }}>
                E-mail:&nbsp;
                <Link href="mailto:info@medogram.ir" sx={{ color: '#1565C0', textDecoration: 'none' }}>
                    info@medogram.ir
                </Link>
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#1565C0', fontWeight: 'bold' }}>
                Telegram:&nbsp;
                <Link href="https://t.me/medogram3018" target="_blank" sx={{ color: '#1565C0', textDecoration: 'none' }}>
                    @medogram
                </Link>
            </Typography>
        </Box>
    );
};

export default Contact;
