import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, Grid, Card, CardContent, IconButton, useMediaQuery } from '@mui/material';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import '../../styles/Styles.css';
import { motion, AnimatePresence } from 'framer-motion';
import { MedicalServices, LocalHospital, Medication, ArrowForward } from '@mui/icons-material';

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
        background: {
            default: '#f8f9fa',
            paper: '#ffffff',
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
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    transition: 'all 0.3s ease-in-out',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 12,
                },
            },
        },
    },
});

theme = responsiveFontSizes(theme);

const serviceCards = [
    {
        title: 'مشاوره آنلاین',
        icon: <MedicalServices sx={{ fontSize: 40 }} />,
        description: 'دریافت مشاوره پزشکی تخصصی از راحتی خانه خود با پزشکان مجرب',
        color: '#2196f3',
    },
    {
        title: 'تشخیص هوشمند',
        icon: <LocalHospital sx={{ fontSize: 40 }} />,
        description: 'استفاده از فناوری پیشرفته هوش مصنوعی برای تشخیص دقیق و سریع بیماری‌ها',
        color: '#00c853',
    },
    {
        title: 'درمان شخصی‌سازی‌شده',
        icon: <Medication sx={{ fontSize: 40 }} />,
        description: 'برنامه‌های درمانی اختصاصی مطابق با نیازها و شرایط خاص شما',
        color: '#ff4081',
    },
];

const Home = () => {
    const [, setIsVisible] = useState(false);
    useMediaQuery(theme.breakpoints.down('sm'));
    useEffect(() => {
        setIsVisible(true);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
                <AnimatePresence>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        <Box
                            sx={{
                                background: 'linear-gradient(135deg, rgba(33,150,243,0.1) 0%, rgba(0,200,83,0.1) 100%)',
                                borderRadius: 8,
                                p: { xs: 3, md: 6 },
                                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                                backdropFilter: 'blur(10px)',
                            }}
                        >
                            <motion.div variants={itemVariants}>
                                <Typography
                                    variant="h2"
                                    color="primary"
                                    gutterBottom
                                    align="center"
                                    sx={{
                                        background: 'linear-gradient(45deg, #2196f3, #00c853)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        mb: 4,
                                    }}
                                >
                                    MEDOGRAM
                                </Typography>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Typography
                                    variant="h5"
                                    paragraph
                                    align="center"
                                    sx={{ mb: 6 }}
                                >
                                    تحولی نوین در مراقبت‌های پزشکی با تکنولوژی پیشرفته
                                </Typography>
                            </motion.div>

                            <Grid container spacing={4} sx={{ mb: 8 }}>
                                {serviceCards.map((card, index) => (
                                    <Grid item xs={12} md={4} key={index}>
                                        <motion.div
                                            variants={itemVariants}
                                            whileHover={{
                                                scale: 1.05,
                                                boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                                            }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Card
                                                sx={{
                                                    height: '100%',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    p: 3,
                                                    background: `linear-gradient(135deg, ${card.color}15, ${card.color}05)`,
                                                    border: `1px solid ${card.color}30`,
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
                                                    <Typography variant="h6" gutterBottom align="center" sx={{ fontWeight: 600, color: card.color }}>
                                                        {card.title}
                                                    </Typography>
                                                    <Typography variant="body1" color="text.secondary" align="center">
                                                        {card.description}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    </Grid>
                                ))}
                            </Grid>

                            <motion.div variants={itemVariants}>
                                <Box sx={{ mb: 6, p: 3, backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 4 }}>
                                    <Typography variant="body1" paragraph align="center" sx={{ lineHeight: 1.8 }}>
                                        در مدوگرام، با ترکیب تخصص پزشکی و فناوری‌های نوین، خدمات درمانی با کیفیت را به شکلی نوآورانه و مقرون به صرفه ارائه می‌دهیم.
                                        با استفاده از هوش مصنوعی و پلتفرم دیجیتال ما، مراقبت‌های پزشکی شخصی‌سازی شده را تجربه کنید.
                                    </Typography>
                                </Box>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Box
                                    textAlign="center"
                                    sx={{
                                        position: 'relative',
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            width: '200px',
                                            height: '200px',
                                            background: 'radial-gradient(circle, rgba(0,200,83,0.2) 0%, rgba(0,200,83,0) 70%)',
                                            borderRadius: '50%',
                                            zIndex: 0,
                                        },
                                    }}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Button
                                            component={Link}
                                            to="/visits"
                                            variant="contained"
                                            color="secondary"
                                            size="large"
                                            endIcon={<ArrowForward />}
                                            sx={{
                                                py: { xs: 1.5, md: 2 },
                                                px: { xs: 4, md: 6 },
                                                fontSize: { xs: '1.1rem', md: '1.3rem' },
                                                boxShadow: '0 10px 30px rgba(0,200,83,0.3)',
                                                position: 'relative',
                                                zIndex: 1,
                                                '&:hover': {
                                                    boxShadow: '0 15px 40px rgba(0,200,83,0.4)',
                                                },
                                            }}
                                        >
                                            رزرو ویزیت آنلاین
                                        </Button>
                                    </motion.div>
                                </Box>
                            </motion.div>
                        </Box>
                    </motion.div>
                </AnimatePresence>
            </Container>
        </ThemeProvider>
    );
};

export default Home;