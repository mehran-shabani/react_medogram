import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, IconButton } from '@mui/material';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import {
    MedicalServices,
    LocalHospital,
    Medication,
    FaceRetouchingNatural,
    ImageSearch,
} from '@mui/icons-material'; // حواستان باشد آیکن‌های جدید را وارد کنید

let theme = createTheme({
    palette: {
        primary: {
            main: '#2196f3',
            light: '#4dabf5',
            dark: '#1769aa',
        },
        secondary: {
            main: '#00c853',
            light: '#69f0ae',
            dark: '#00a839',
        },
    },
    typography: {
        fontFamily: 'IRANSans, Arial',
        h2: {
            fontWeight: 700,
        },
        h5: {
            fontWeight: 500,
        },
    },
});

theme = responsiveFontSizes(theme);

const serviceCards = [
    {
        id: 1,
        title: 'مشاوره آنلاین',
        icon: <MedicalServices sx={{ fontSize: 40 }} />,
        description: 'دریافت مشاوره پزشکی تخصصی با پزشکان مجرب',
        link: '/visits',
        color: '#2196f3',
    },
    {
        id: 2,
        title: 'تشخیص دیابت',
        icon: <LocalHospital sx={{ fontSize: 40 }} />,
        description: 'تشخیص دقیق و سریع دیابت با هوش مصنوعی',
        link: '/diabetes-prediction',
        color: '#00c853',
    },
    {
        id: 3,
        title: 'چت با هوش مصنوعی',
        icon: <Medication sx={{ fontSize: 40 }} />,
        description: 'چت و مشاوره آنلاین با دستیار هوشمند',
        link: '/chat',
        color: '#ff4081',
    },
    // --- کارت‌های جدید ---
    {
        id: 4,
        title: 'تمدید نسخ دارویی',
        icon: <Medication sx={{ fontSize: 40 }} />,
        description: 'تمدید سریع و راحت نسخ دارویی شما',
        link: '/visits',
        color: '#ff9800',
    },
    {
        id: 5,
        title: 'مشاوره زیبایی',
        icon: <FaceRetouchingNatural sx={{ fontSize: 40 }} />,
        description: 'مشاوره تخصصی در حوزه زیبایی و تناسب اندام',
        link: '/visits',
        color: '#e91e63',
    },
    {
        id: 6,
        title: 'تفسیر و بررسی جواب آزمایشات',
        icon: <ImageSearch sx={{ fontSize: 40 }} />,
        description: 'بررسی دقیق نتایج آزمایشات و تصاویر پزشکی شما',
        link: '/visits',
        color: '#9c27b0',
    },
];

const Home = () => {
    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
                {/* عنوان صفحه */}
                <Box textAlign="center" sx={{ mb: 6 }}>
                    <Typography
                        variant="h2"
                        sx={{
                            background: 'linear-gradient(45deg, #2196f3, #00c853)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        مدوگرام
                    </Typography>
                    <Typography variant="h5" color="text.secondary">
                        دسترسی آسان به خدمات پزشکی نوین
                    </Typography>
                </Box>

                {/* کارت‌های خدمات */}
                <Grid container spacing={4}>
                    {serviceCards.map((card) => (
                        <Grid item xs={12} sm={6} md={4} key={card.id}>
                            <Card
                                component={Link}
                                to={card.link}
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textDecoration: 'none',
                                    p: 3,
                                    background: `linear-gradient(135deg, ${card.color}15, ${card.color}05)`,
                                    border: `1px solid ${card.color}30`,
                                    '&:hover': {
                                        boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                                    },
                                }}
                            >
                                <IconButton
                                    sx={{
                                        backgroundColor: `${card.color}15`,
                                        mb: 2,
                                        '&:hover': {
                                            backgroundColor: `${card.color}25`,
                                        },
                                    }}
                                >
                                    {card.icon}
                                </IconButton>
                                <CardContent>
                                    <Typography variant="h6" color="primary" gutterBottom>
                                        {card.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" align="center">
                                        {card.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </ThemeProvider>
    );
};

export default Home;
