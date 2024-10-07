import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, Paper, Typography, Box, Alert, Link } from '@mui/material';
import { motion } from 'framer-motion';
import Visit from './Visit';

// Create a custom theme
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

// Styled components using MUI's sx prop
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

const StyledPaper = ({ children }) => (
    <Paper
        elevation={3}
        sx={{
            borderRadius: 4,
            p: { xs: 3, md: 4 },
            backgroundColor: 'white',
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
                            backgroundColor: '#ffecb3',
                            color: '#bf360c',
                            '& .MuiAlert-icon': {
                                color: '#bf360c',
                            },
                        }}
                    >
                        قیمت هر ویزیت 29,950 تومان است. لطفاً قبل از ویزیت به صفحه{' '}
                        <Link  href="/payment-visit" color="inherit" underline="always">
                            پرداخت ویزیت
                        </Link>{' '}
                        بروید.
                    </Alert>

                    <Visit />
                </StyledPaper>
            </StyledContainer>
        </ThemeProvider>
    );
};

export default VisitPage;