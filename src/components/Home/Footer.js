// noinspection JSRemoveUnnecessaryParentheses
import React, { useState } from 'react';
import {
    Container,
    Box,
    Typography,
    Grid,
    Link as MuiLink,
    useTheme,
    useMediaQuery,
    Paper,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Avatar
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
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

const ReasonItem = ({ number, text, color }) => (
    <motion.li
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: number * 0.1 }}
        style={{
            marginBottom: '12px',
            padding: '12px',
            borderRadius: '8px',
            background: `linear-gradient(135deg, ${color}15, ${color}05)`,
            border: `1px solid ${color}20`,
            display: 'flex',
            alignItems: 'center',
            listStyle: 'none',
        }}
    >
        <Box
            sx={{
                minWidth: '28px',
                height: '28px',
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${color}, ${color}cc)`,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '12px',
                fontSize: '0.875rem',
                fontWeight: 'bold',
            }}
        >
            {number}
        </Box>
        <Typography variant="body2">{text}</Typography>
    </motion.li>
);

const FeatureBox = ({ icon, title, description }) => {
    return (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
                    },
                    fontFamily: 'Vazir, sans-serif',
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
                        mb: 2,
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
                        WebkitTextFillColor: 'transparent',
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
        <motion.div whileHover={{ scale: 1.2, rotate: 10 }} whileTap={{ scale: 0.9 }}>
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
                        color: `${color}99`,
                    },
                    fontFamily: 'Vazir, sans-serif',
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
                    },
                    fontFamily: 'Vazir, sans-serif',
                }}
            >
                {icon}
                <Typography sx={{ mr: 1 }}>{text}</Typography>
            </MuiLink>
        </motion.div>
    );
};

const reasons = [
    { text: 'بهره‌مندی از هوش مصنوعی پزشک‌یار', color: '#4CAF50' },
    { text: 'دسترسی سریع و ۲۴ ساعته به خدمات پزشکی', color: '#2196F3' },
    { text: 'پزشکان آموزش‌دیده در زمینهٔ پزشکی راه دور', color: '#00BCD4' },
    { text: 'امکان ویزیت آنلاین بدون تشریفات اضافی', color: '#009688' },
    { text: 'عدم سردرگمی در انتخاب پزشک در میان صدها متخصص', color: '#8BC34A' },
    { text: 'سیستم پیشرفته مبتنی بر استاندارد آپتودیت', color: '#4CAF50' },
    { text: 'استفاده از متدهای روز دنیا در تلمدیسین', color: '#66BB6A' },
    { text: 'تضمین کیفیت خدمات با استفاده از فناوری‌های جدید', color: '#81C784' },
    { text: 'پوشش بیماران در مناطق دوردست و کم‌برخوردار', color: '#A5D6A7' },
    { text: 'رابط کاربری ساده و قابل فهم برای همه', color: '#C8E6C9' },
    { text: 'امکان دسترسی به پرونده پزشکی در هر زمان', color: '#2E7D32' },
    { text: 'حفظ حریم خصوصی و امنیت اطلاعات بیمار', color: '#1B5E20' },
    { text: 'پشتیبانی حرفه‌ای و همراهی گام به گام بیمار', color: '#388E3C' },
];

const Footer = () => {
    const theme = useTheme();
    useMediaQuery(theme.breakpoints.down('sm'));

    const features = [
        {
            icon: (
                <img
                    src="https://cdn-icons-png.flaticon.com/512/5488/5488385.png"
                    alt="کادر مجرب"
                    style={{ width: 40, height: 40 }}
                />
            ),
            title: 'کادر مجرب',
            description: 'تیم پزشکی متخصص با سال‌ها تجربه در خدمت سلامت شما',
        },
        {
            icon: (
                <img
                    src="https://cdn-icons-png.flaticon.com/512/4939/4939112.png"
                    alt="آموزش مداوم"
                    style={{ width: 40, height: 40 }}
                />
            ),
            title: 'آموزش مداوم',
            description: 'به‌روزرسانی دانش پزشکی با آخرین استانداردهای جهانی',
        },
        {
            icon: (
                <img
                    src="https://cdn-icons-png.flaticon.com/512/31/31679.png"
                    alt="پشتیبانی"
                    style={{ width: 40, height: 40 }}
                />
            ),
            title: 'پشتیبانی ۲۴/۷',
            description:
                'در تمام ساعات شبانه‌روز آماده خدمت‌رسانی به شما عزیزان هستیم',
        },
    ];

    const [expanded, setExpanded] = useState(false);

    const handleChange = (event, isExpanded) => {
        setExpanded(isExpanded);
    };

    return (
        <Box
            component="footer"
            sx={{
                background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                pt: 8,
                pb: 4,
                mt: 8,
                borderTop: '1px solid #dee2e6',
                direction: 'rtl',
                fontFamily: 'Vazir, sans-serif',
            }}
        >
            <Container maxWidth="lg">
                <Box mb={4}>
                    <Accordion
                        expanded={expanded}
                        onChange={handleChange}
                        sx={{
                            background: 'transparent',
                            boxShadow: 'none',
                            '&:before': { display: 'none' },
                        }}
                    >
                        <AccordionSummary
                            expandIcon={
                                <ExpandMoreIcon sx={{
                                    color: '#4CAF50',
                                    transform: expanded ? 'rotate(180deg)' : 'rotate(0)',
                                    transition: 'transform 0.3s ease',
                                }} />
                            }
                            sx={{
                                background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
                                borderRadius: '16px',
                                mb: 2,
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #C8E6C9 0%, #A5D6A7 100%)',
                                },
                                '& .MuiAccordionSummary-content': {
                                    margin: '16px 0',
                                },
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar sx={{
                                    bgcolor: '#4CAF50',
                                    width: 40,
                                    height: 40,
                                }}>
                                    <QuestionMarkIcon />
                                </Avatar>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 'bold',
                                        background: 'linear-gradient(45deg, #2E7D32, #4CAF50)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                >
                                    چرا مدوگرام؟
                                </Typography>
                            </Box>
                        </AccordionSummary>

                        <AccordionDetails sx={{
                            background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 100%)',
                            borderRadius: '16px',
                            p: 4,
                        }}>
                            <Typography
                                variant="body1"
                                sx={{
                                    mb: 4,
                                    color: '#1B5E20',
                                    fontWeight: 500,
                                }}
                            >
                                دلایل اصلی که باعث شده مدوگرام یک گزینهٔ عالی برای تلمدیسین و ارائه خدمات درمانی آنلاین باشد:
                            </Typography>

                            <Box component="ul" sx={{ p: 0 }}>
                                {reasons.map((reason, index) => (
                                    <ReasonItem
                                        key={index}
                                        number={index + 1}
                                        text={reason.text}
                                        color={reason.color}
                                    />
                                ))}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </Box>

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
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    }}
                >
                    <Grid container spacing={4} justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <Box textAlign="center" mb={4}>
                                <Typography
                                    variant="h5"
                                    sx={{ fontWeight: 'bold', mb: 3, color: '#1976d2' }}
                                >
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
                                <Typography
                                    variant="h5"
                                    sx={{ fontWeight: 'bold', mb: 3, color: '#1976d2' }}
                                >
                                    ارتباط با ما
                                </Typography>
                                <Grid container spacing={2} justifyContent="center">
                                    <Grid item xs={12}>
                                        <MuiLink
                                            href="tel:09961733668"
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#555',
                                                textDecoration: 'none',
                                                '&:hover': { color: '#1976d2' },
                                                fontFamily: 'Vazir, sans-serif',
                                            }}
                                        >
                                            <PhoneIcon sx={{ ml: 1 }} /> ۰۹۹۶-۱۷۳-۳۶۶۸
                                        </MuiLink>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MuiLink
                                            href="mailto:info@medogram.ir"
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#555',
                                                textDecoration: 'none',
                                                '&:hover': { color: '#1976d2' },
                                                fontFamily: 'Vazir, sans-serif',
                                            }}
                                        >
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
                                        transform: 'scale(1.05)',
                                    },
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
                        pt: 4,
                        fontFamily: 'Vazir, sans-serif',
                    }}
                >
                    © {new Date().getFullYear()} Medogram - All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;