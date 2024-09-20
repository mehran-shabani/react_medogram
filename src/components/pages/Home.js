import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, Grid, Card, CardContent, IconButton, useMediaQuery } from '@mui/material';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import '../../styles/Styles.css';
import { motion } from 'framer-motion';
import { MedicalServices, LocalHospital, Medication } from '@mui/icons-material';

let theme = createTheme({
    palette: {
        primary: {
            main: '#007bff',
        },
        secondary: {
            main: '#00c853',
        },
        background: {
            default: '#f5f5f5',
        },
    },
    typography: {
        fontFamily: 'IRANSans, Arial',
    },
});

theme = responsiveFontSizes(theme);

const serviceCards = [
    { title: 'Online Consultations', icon: <MedicalServices />, description: 'Get expert medical advice from the comfort of your home.' },
    { title: 'AI-Powered Diagnostics', icon: <LocalHospital />, description: 'Cutting-edge AI technology for accurate and fast diagnoses.' },
    { title: 'Personalized Treatment', icon: <Medication />, description: 'Tailored treatment plans designed specifically for you.' },
];

const Home = () => {
    const [isVisible, setIsVisible] = useState(false);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
                    transition={{ duration: 0.8 }}
                >
                    <Box className="gradient-background" sx={{ borderRadius: 4, p: 4, boxShadow: 3 }}>
                        <Typography variant="h2" color="primary" gutterBottom className="typography-animation" align="center">
                            Medogram
                        </Typography>
                        <Typography variant="h5" paragraph className="typography-animation" align="center">
                            Revolutionary Healthcare at Your Fingertips
                        </Typography>
                        <Grid container spacing={4} sx={{ mt: 4 }}>
                            {serviceCards.map((card, index) => (
                                <Grid item xs={12} md={4} key={index}>
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Card raised sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
                                            <IconButton color="primary" sx={{ fontSize: 40 }}>
                                                {card.icon}
                                            </IconButton>
                                            <CardContent>
                                                <Typography variant="h6" component="div" gutterBottom align="center">
                                                    {card.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" align="center">
                                                    {card.description}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </Grid>
                            ))}
                        </Grid>
                        <Box sx={{ mt: 6, mb: 4 }}>
                            <Typography variant="body1" paragraph className="typography-animation">
                                At Medogram, we're revolutionizing healthcare by making advanced medical services accessible to everyone. Our AI-powered platform offers personalized care, cutting-edge diagnostics, and continuous monitoring, all at a fraction of traditional costs.
                            </Typography>
                        </Box>
                        <Box textAlign="center" mt={4}>
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Button
                                    component={Link}
                                    to="/visits"
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    sx={{
                                        borderRadius: '50px',
                                        padding: isMobile ? '0.8rem 1.5rem' : '1rem 2rem',
                                        fontSize: isMobile ? '1.2rem' : '1.5rem',
                                        boxShadow: '0 0 20px rgba(0, 200, 83, 0.7)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            boxShadow: '0 0 30px rgba(0, 200, 83, 1)',
                                        },
                                    }}
                                >
                                    Book a Visit Now
                                </Button>
                            </motion.div>
                        </Box>
                    </Box>
                </motion.div>
            </Container>

        </ThemeProvider>
    );
};

export default Home;