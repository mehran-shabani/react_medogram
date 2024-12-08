// noinspection JSRemoveUnnecessaryParentheses

import React from 'react';
import { Container, Box, Typography, Grid, Link as MuiLink, useTheme, useMediaQuery, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import RedditIcon from '@mui/icons-material/Reddit';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AndroidIcon from '@mui/icons-material/Android';
import WebIcon from '@mui/icons-material/Web';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const FeatureBox = ({ icon, title, description }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <Paper
                elevation={2}
                sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: 4,
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    }
                }}
            >
                <Box
                    sx={{
                        width: 80,
                        height: 80,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                        mb: 2
                    }}
                >
                    {icon}
                </Box>
                <Typography
                    variant="h6"
                    sx={{
                        mb: 2,
                        fontWeight: 'bold',
                        background: 'linear-gradient(45deg, #1976d2, #2196f3)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}
                >
                    {title}
                </Typography>
                <Typography variant="body2" align="center" color="text.secondary">
                    {description}
                </Typography>
            </Paper>
        </motion.div>
    );
};

const SocialLink = ({ href, icon, color }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
        >
            <MuiLink
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                    mx: 1,
                    display: 'inline-flex',
                    color: color,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        color: `${color}99`
                    }
                }}
            >
                {icon}
            </MuiLink>
        </motion.div>
    );
};

const AppDownloadButton = ({ href, icon, text, gradient }) => {
    return (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <MuiLink
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#fff',
                    textDecoration: 'none',
                    background: gradient,
                    padding: '12px 24px',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    '&:hover': {
                        boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
                    }
                }}
            >
                {icon}
                <Typography sx={{ mr: 1 }}>{text}</Typography>
            </MuiLink>
        </motion.div>
    );
};

const Footer = () => {
    const theme = useTheme();
    useMediaQuery(theme.breakpoints.down('sm'));
    const features = [
        {
            icon: <img src="https://cdn-icons-png.flaticon.com/512/5488/5488385.png" alt="کادر مجرب" style={{ width: 40, height: 40 }} />,
            title: 'کادر مجرب',
            description: 'تیم پزشکی متخصص با سال‌ها تجربه در خدمت سلامت شما'
        },
        {
            icon: <img src="https://cdn-icons-png.flaticon.com/512/4939/4939112.png" alt="آموزش مداوم" style={{ width: 40, height: 40 }} />,
            title: 'آموزش مداوم',
            description: 'به‌روزرسانی دانش پزشکی با آخرین استانداردهای جهانی'
        },
        {
            icon: <img src="https://cdn-icons-png.flaticon.com/512/31/31679.png" alt="پشتیبانی" style={{ width: 40, height: 40 }} />,
            title: 'پشتیبانی ۲۴/۷',
            description: 'در تمام ساعات شبانه‌روز آماده خدمت‌رسانی به شما عزیزان هستیم'
        },
    ];

    return (
        <Box
            component="footer"
            sx={{
                background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                pt: 8,
                pb: 4,
                mt: 8,
                borderTop: '1px solid #dee2e6',
                direction: 'rtl'
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {features.map((feature, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <FeatureBox {...feature} />
                        </Grid>
                    ))}
                </Grid>

                <Box
                    sx={{
                        mt: 8,
                        p: 4,
                        borderRadius: 4,
                        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                    }}
                >
                    <Grid container spacing={4} justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <Box textAlign="center" mb={4}>
                                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: '#1976d2' }}>
                                    دانلود اپلیکیشن
                                </Typography>
                                <Grid container spacing={2} justifyContent="center">
                                    <Grid item>
                                        <AppDownloadButton
                                            href="https://api.medogram.ir/api/download-apk/"
                                            icon={<AndroidIcon sx={{ ml: 1 }} />}
                                            text="نسخه اندروید"
                                            gradient="linear-gradient(45deg, #43a047, #66bb6a)"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <AppDownloadButton
                                            href="https://pwa.medogram.ir/"
                                            icon={<WebIcon sx={{ ml: 1 }} />}
                                            text="وب اپلیکیشن"
                                            gradient="linear-gradient(45deg, #1976d2, #2196f3)"
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Box textAlign="center">
                                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: '#1976d2' }}>
                                    ارتباط با ما
                                </Typography>
                                <Grid container spacing={2} justifyContent="center">
                                    <Grid item xs={12}>
                                        <MuiLink href="tel:09961733668" sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#555',
                                            textDecoration: 'none',
                                            '&:hover': { color: '#1976d2' }
                                        }}>
                                            <PhoneIcon sx={{ ml: 1 }} /> ۰۹۹۶-۱۷۳-۳۶۶۸
                                        </MuiLink>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MuiLink href="mailto:info@medogram.ir" sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#555',
                                            textDecoration: 'none',
                                            '&:hover': { color: '#1976d2' }
                                        }}>
                                            <EmailIcon sx={{ ml: 1 }} /> info@medogram.ir
                                        </MuiLink>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                        <SocialLink
                            href="https://www.instagram.com/medogram_online"
                            icon={<InstagramIcon fontSize="large" />}
                            color="#E1306C"
                        />
                        <SocialLink
                            href="https://t.me/medogramiran"
                            icon={<TelegramIcon fontSize="large" />}
                            color="#0088cc"
                        />
                        <SocialLink
                            href="https://wa.me/message/VKSEYAAIRRJNH1?src=qr"
                            icon={<WhatsAppIcon fontSize="large" />}
                            color="#25D366"
                        />
                        <SocialLink
                            href="https://www.reddit.com/u/medogram/s/t84wODnQId"
                            icon={<RedditIcon fontSize="large" />}
                            color="#FF4500"
                        />
                        <SocialLink
                            href="https://x.com/dr_hossein24918"
                            icon={<TwitterIcon fontSize="large" />}
                            color="#1DA1F2"
                        />
                    </Box>
                </Box>

                <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item>
                            <MuiLink
                                href="https://trustseal.enamad.ir/?id=520504&Code=jdx3UPD8Cqkiw4vGO7mwQBuVLfP5ZsCG"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src="https://trustseal.enamad.ir/logo.aspx?id=520504&Code=jdx3UPD8Cqkiw4vGO7mwQBuVLfP5ZsCG"
                                    alt="نماد اعتماد"
                                    style={{ height: 60 }}
                                />
                            </MuiLink>
                        </Grid>
                        <Grid item>
                            <MuiLink
                                href="https://bitpay.ir/certificate-671591-medogram.ir"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src="https://bitpay.ir/theme/public/images/trusted-logo.svg"
                                    alt="درگاه پرداخت"
                                    style={{ height: 60 }}
                                />
                            </MuiLink>
                        </Grid>
                        <Grid item>
                            <Box
                                component="img"
                                referrerPolicy="origin"
                                id="rgvjjzpejxlzsizpesgtrgvj"
                                src="https://logo.samandehi.ir/logo.aspx?id=371903&p=qftiyndtnbpdbsiylymaqfti"
                                alt="نماد ساماندهی"
                                sx={{
                                    height: 60,
                                    cursor: 'pointer',
                                    transition: 'transform 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.05)'
                                    }
                                }}
                                onClick={() =>
                                    window.open(
                                        'https://logo.samandehi.ir/Verify.aspx?id=371903&p=xlaojyoerfthpfvlobpdxlao',
                                        'Popup',
                                        'toolbar=no, scrollbars=no, location=no, statusbar=no, menubar=no, resizable=0, width=450, height=630, top=30'
                                    )
                                }
                            />
                        </Grid>
                    </Grid>
                </Box>

                <Typography
                    variant="body2"
                    align="center"
                    sx={{
                        mt: 4,
                        color: '#6c757d',
                        borderTop: '1px solid #dee2e6',
                        pt: 4
                    }}
                >
                    © {new Date().getFullYear()} Medogram - All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;