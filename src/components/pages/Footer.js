// Footer.js
import React from 'react';
import { Container, Box, Typography, Grid, Link as MuiLink } from '@mui/material';

const Footer = () => {
    return (
        <Container
            component="footer"
            maxWidth="lg"
            sx={{ mt: 8, py: 4, borderTop: '1px solid #ddd', direction: 'rtl' }}
        >
            <Grid container spacing={4} justifyContent="center">
                {/* ستون اول */}
                <Grid item xs={12} md={3}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/5488/5488385.png"
                            alt="کادر مجرب"
                            title="کادر مجرب"
                            style={{ width: 64, height: 64 }}
                        />
                        <Typography variant="h6" sx={{ mt: 2 }}>
                            کادر مجرب
                        </Typography>
                        <Typography variant="body2" align="center">
                            پزشکان و پرستاران ما با تجربه و تخصص بالا آماده ارائه خدمات آنلاین و تلفنی هستند.
                        </Typography>
                    </Box>
                </Grid>
                {/* ستون دوم */}
                <Grid item xs={12} md={3}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/4939/4939112.png"
                            alt="نیروهای آموزش دیده"
                            title="نیروهای آموزش دیده"
                            style={{ width: 64, height: 64 }}
                        />
                        <Typography variant="h6" sx={{ mt: 2 }}>
                            نیروهای آموزش دیده
                        </Typography>
                        <Typography variant="body2" align="center">
                            تمامی نیروهای ما دوره‌های آموزشی حرفه‌ای را گذرانده‌اند.
                        </Typography>
                    </Box>
                </Grid>
                {/* ستون سوم */}
                <Grid item xs={12} md={3}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/31/31679.png"
                            alt="پاسخگویی ۲۴ ساعته"
                            title="پاسخگویی ۲۴ ساعته"
                            style={{ width: 64, height: 64 }}
                        />
                        <Typography variant="h6" sx={{ mt: 2 }}>
                            پاسخگویی ۲۴ ساعته
                        </Typography>
                        <Typography variant="body2" align="center">
                            ما به صورت شبانه‌روزی آماده پاسخگویی به شما هستیم.
                        </Typography>
                    </Box>
                </Grid>
                {/* ستون لوگوها */}
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
                        {/* لوگوی ساماندهی */}
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
            <Box mt={4} textAlign="center">
                <Typography variant="body2">© .2024 Medogram All rights reserved</Typography>
                <Box mt={2}>
                    <MuiLink
                        href="https://www.instagram.com/medogram_abadeh"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ mx: 1 }}
                    >
                        <i className="fab fa-instagram fa-2x" title="Instagram"></i>
                    </MuiLink>
                    <MuiLink
                        href="https://t.me/medogram3018"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ mx: 1 }}
                    >
                        <i className="fab fa-telegram-plane fa-2x" title="Telegram"></i>
                    </MuiLink>
                </Box>
            </Box>
        </Container>
    );
};

export default Footer;
