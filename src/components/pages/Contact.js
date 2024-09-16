import React from 'react';
import { Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import TelegramIcon from '@mui/icons-material/Telegram';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const Contact = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2rem',
                p: { xs: '1.5rem', sm: '2.5rem', md: '3.5rem' },
                margin: 'auto',
                borderRadius: '20px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#ffffff',
                width: { xs: '90%', sm: '80%', md: '60%', lg: '50%' },
                maxWidth: '600px',
                border: '3px solid',
                borderImageSlice: 1,
                borderImageSource: 'linear-gradient(to right, #2196F3, #21CBF3)',
            }}
        >
            <Typography variant="h4" sx={{ color: '#0056b3', fontWeight: 'bold', mb: 2 }}>
                با ما تماس بگیرید
            </Typography>
            <Typography variant="h6" sx={{ fontSize: '1.1rem', color: '#333', textAlign: 'center', mb: 3 }}>
                برای اطلاعات بیشتر در مورد سرویس‌های پزشکی مدوگرام
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
                <Button
                    variant="outlined"
                    startIcon={<PhoneIcon />}
                    href="tel:09135666326"
                    sx={{
                        justifyContent: 'flex-start',
                        color: '#0056b3',
                        borderColor: '#0056b3',
                        '&:hover': { backgroundColor: '#e3f2fd' }
                    }}
                >
                    0913-566-6326
                </Button>

                <Button
                    variant="outlined"
                    startIcon={<EmailIcon />}
                    href="mailto:info@medogram.ir"
                    sx={{
                        justifyContent: 'flex-start',
                        color: '#0056b3',
                        borderColor: '#0056b3',
                        '&:hover': { backgroundColor: '#e3f2fd' }
                    }}
                >
                    info@medogram.ir
                </Button>

                <Button
                    variant="outlined"
                    startIcon={<TelegramIcon />}
                    href="https://t.me/medogram3018"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                        justifyContent: 'flex-start',
                        color: '#0056b3',
                        borderColor: '#0056b3',
                        '&:hover': { backgroundColor: '#e3f2fd' }
                    }}
                >
                    @medogram3018
                </Button>
            </Box>

            <Typography variant="body2" sx={{ fontSize: '0.9rem', color: '#666', mt: 2, textAlign: 'center' }}>
                برای ارتباط سریع، می‌توانید از طریق تلگرام با ما در تماس باشید
            </Typography>
        </Box>
    );
};

export default Contact;