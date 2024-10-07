import React from 'react';
import { Container, Box, Typography, Grid, Link as MuiLink, useTheme, useMediaQuery } from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
    const theme = useTheme();
    useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Container
            component="footer"
            maxWidth="lg"
            sx={{
                mt: 8,
                py: 6,
                borderTop: '1px solid #ddd',
                direction: 'rtl',
                backgroundColor: '#f8f9fa',
            }}
        >
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} md={3}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/5488/5488385.png"
                            alt="کادر مجرب"
                            title="کادر مجرب"
                            style={{ width: 64, height: 64 }}
                        />
                        <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', color: '#0056b3' }}>
                            کادر مجرب
                        </Typography>
                        <Typography variant="body2" align="center" sx={{ mt: 1, color: '#555' }}>
                            پزشکان و پرستاران ما با تجربه و تخصص بالا آماده ارائه خدمات آنلاین و تلفنی هستند.
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/4939/4939112.png"
                            alt="نیروهای آموزش دیده"
                            title="نیروهای آموزش دیده"
                            style={{ width: 64, height: 64 }}
                        />
                        <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', color: '#0056b3' }}>
                            نیروهای آموزش دیده
                        </Typography>
                        <Typography variant="body2" align="center" sx={{ mt: 1, color: '#555' }}>
                            تمامی نیروهای ما دوره‌های آموزشی حرفه‌ای را گذرانده‌اند.
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/31/31679.png"
                            alt="پاسخگویی ۲۴ ساعته"
                            title="پاسخگویی ۲۴ ساعته"
                            style={{ width: 64, height: 64 }}
                        />
                        <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', color: '#0056b3' }}>
                            پاسخگویی ۲۴ ساعته
                        </Typography>
                        <Typography variant="body2" align="center" sx={{ mt: 1, color: '#555' }}>
                            ما به صورت شبانه‌روزی آماده پاسخگویی به شما هستیم.
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <MuiLink
                            href="https://trustseal.enamad.ir/?id=520504&Code=jdx3UPD8Cqkiw4vGO7mwQBuVLfP5ZsCG"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src="https://trustseal.enamad.ir/logo.aspx?id=520504&Code=jdx3UPD8Cqkiw4vGO7mwQBuVLfP5ZsCG"
                                alt="اعتماد"
                                style={{ cursor: 'pointer', height: 50 }}
                            />
                        </MuiLink>
                        <MuiLink
                            href="https://bitpay.ir/certificate-671591-medogram.ir"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ mt: 2 }}
                        >
                            <img
                                src="https://bitpay.ir/theme/public/images/trusted-logo.svg"
                                alt="Bitpay Certificate"
                                style={{ height: 50 }}
                            />
                        </MuiLink>
                        <img
                            referrerPolicy="origin"
                            id="rgvjjzpejxlzsizpesgtrgvj"
                            style={{ cursor: 'pointer', height: 50, marginTop: 16 }}
                            onClick={() =>
                                window.open(
                                    'https://logo.samandehi.ir/Verify.aspx?id=371903&p=xlaojyoerfthpfvlobpdxlao',
                                    'Popup',
                                    'toolbar=no, scrollbars=no, location=no, statusbar=no, menubar=no, resizable=0, width=450, height=630, top=30'
                                )
                            }
                            alt="logo-samandehi"
                            src="https://logo.samandehi.ir/logo.aspx?id=371903&p=qftiyndtnbpdbsiylymaqfti"
                        />
                    </Box>
                </Grid>
            </Grid>
            <Box mt={6} textAlign="center">
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#0056b3', mb: 2 }}>
                    ارتباط با ما
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                        <MuiLink href="tel:09961733668" sx={{ display: 'flex', alignItems: 'center', color: '#555', textDecoration: 'none' }}>
                            <PhoneIcon sx={{ mr: 1 }} /> 0996-173-3668
                        </MuiLink>
                    </Grid>
                    <Grid item>
                        <MuiLink href="mailto:info@medogram.ir" sx={{ display: 'flex', alignItems: 'center', color: '#555', textDecoration: 'none' }}>
                            <EmailIcon sx={{ mr: 1 }} /> info@medogram.ir
                        </MuiLink>
                    </Grid>
                </Grid>
                <Box mt={3}>
                    <MuiLink
                        href="https://www.instagram.com/medogram_online"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ mx: 1 }}
                    >
                        <InstagramIcon fontSize="large" sx={{ color: '#E1306C' }} titleAccess="Instagram" />
                    </MuiLink>
                    <MuiLink
                        href="https://t.me/medogram3018"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ mx: 1 }}
                    >
                        <TelegramIcon fontSize="large" sx={{ color: '#0088cc' }} titleAccess="Telegram" />
                    </MuiLink>
                    <MuiLink
                        href="https://t.me/medogramiran"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ mx: 1 }}
                    >
                        <TelegramIcon fontSize="large" sx={{ color: '#0088cc' }} titleAccess="Telegram" />
                    </MuiLink>
                </Box>
            </Box>
            <Typography variant="body2" align="center" sx={{ mt: 4, color: '#777' }}>
                © 2024 Medogram. All rights reserved.
            </Typography>
        </Container>
    );
};

export default Footer;