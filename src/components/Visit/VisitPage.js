import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, Paper, Typography, Box, Alert, Link } from '@mui/material';
import { motion } from 'framer-motion';
import Visit from './Visit';

// ساخت تم دلخواه
const theme = createTheme({
    palette: {
        primary: {
            main: '#00838f',
        },
        background: {
            default: '#e0f7fa',
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
    },
});

// کامپوننتی که Container را استایل و انیمیت می‌کند
const StyledContainer = ({ children }) => (
    <Container
        component={motion.div}
        maxWidth="md"
        sx={{
            display: 'flex',

            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: '100vh',
            py: 4,
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        {children}
    </Container>
);

// کامپوننتی که Paper را استایل می‌کند
const StyledPaper = ({ children }) => (
    <Paper
        elevation={3}
        sx={{
            borderRadius: 4,
            p: { xs: 3, md: 4 },
            pb: 0,
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
        }}
    >
        {children}
    </Paper>
);

const VisitPage = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <StyledContainer>
                <StyledPaper>
                    <Box component="header" sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography variant="h4" component="h1" color="primary" gutterBottom>
                            زمان‌بندی ویزیت شما
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            برای رزرو نوبت با متخصصان سلامت ما، وقت بگیرید
                        </Typography>
                    </Box>

                    <Alert
                        severity="warning"
                        sx={{
                            mb: 4,
                            direction: 'rtl',
                            backgroundColor: '#ffecb3',
                            color: '#bf360c',
                            '& .MuiAlert-icon': {
                                color: '#bf360c',
                            },
                        }}
                    >
                        {/* این تیتر را برجسته‌تر می‌کنیم */}
                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: 'bold',

                                fontSize: '1.1rem',
                                mb: 1,
                            }}
                        >
                            شما باید قبل از ویزیت، مبلغ یک ویزیت را در حسابتان داشته باشید!
                        </Typography>

                        <Typography variant="body2">
                            قیمت هر ویزیت 29,950 تومان است. لطفاً قبل از ویزیت به صفحه{' '}
                            <Link href={'payment-visit/'} color="inherit" underline="always" sx={{ fontWeight: 'bold' }}>
                                پرداخت ویزیت
                            </Link>{' '}
                            بروید.
                        </Typography>
                    </Alert>

                    <Visit sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }} />
                </StyledPaper>
            </StyledContainer>
        </ThemeProvider>
    );
};

export default VisitPage;
