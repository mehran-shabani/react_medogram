import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import '../../styles/Styles.css'; // Ensure this path is correct

const theme = createTheme({
    palette: {
        primary: {
            main: '#007bff', // Brand Blue Color
        },
    },
    typography: {
        fontFamily: 'IRANSans, Arial',
    },
});

const Home = () => {
    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Box className="gradient-background">
                    <Typography variant="h4" color="primary" gutterBottom className="typography-animation">
                         مدوگرام
                    </Typography>
                    <Typography variant="body1" paragraph className="typography-animation">
                        در مدوگرام، ما به دنبال ارائه بهترین خدمات پزشکی و مراقبت‌های بالینی به صورت آنلاین و تلفنی هستیم که به راحتی در هر مکان قابل دسترسی باشد. با تکیه بر دانش پیشرفته و بهره‌گیری از هوش مصنوعی، ما تغییرات بنیادی در پروسه‌های تشخیصی، درمانی و کمک پزشکی ایجاد کرده‌ایم تا جمعیت‌های بیشتری بتوانند با هزینه‌های کمتر، از جدیدترین و مدرن‌ترین روش‌های درمانی و تشخیصی بهره‌مند شوند.
                    </Typography>
                    <Typography variant="body1" paragraph className="typography-animation">
                        خدمات ما شامل ارزیابی دقیق و شخصی‌سازی شده برای هر بیمار، استفاده از تکنولوژی‌های روز در تشخیص و درمان، و نظارت مستمر بر فرآیندهای درمانی است. با استفاده از هوش مصنوعی، ما می‌توانیم پروسه‌های درمانی را بهینه‌سازی کنیم و خدماتی با کیفیت بالا و در کمترین زمان ممکن ارائه دهیم.
                    </Typography>
                    <Typography variant="body1" paragraph className="typography-animation">
                        ما به دنبال این هستیم که با کاهش هزینه‌ها و استفاده از تکنولوژی‌های نوین، دسترسی به خدمات پزشکی پیشرفته را برای همه افراد جامعه فراهم کنیم. با مدوگرام، شما می‌توانید اطمینان داشته باشید که بهترین مراقبت‌های پزشکی را به صورت آنلاین دریافت خواهید کرد.
                    </Typography>
                    <Box textAlign="center" mt={4}>
                        <Button
                            component={Link}
                            to="/visits"
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{
                                borderRadius: '50px',
                                padding: '1rem 2rem',
                                fontSize: '1.5rem',
                                boxShadow: '0 0 20px rgba(0, 123, 255, 0.7)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.1)',
                                    boxShadow: '0 0 30px rgba(0, 123, 255, 1)',
                                },
                            }}
                        >
                            ثبت ویزیت
                        </Button>
                    </Box>
                </Box>
            </Container>
            <Footer />
        </ThemeProvider>
    );
};

export default Home;
