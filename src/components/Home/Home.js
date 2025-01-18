import React from 'react';
import {
    Container,
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
    IconButton,
    Grow,
} from '@mui/material';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import {
    MedicalServices,
    LocalHospital,
    Medication,
    FaceRetouchingNatural,
    ImageSearch,
} from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { motion } from "framer-motion";
import { styled } from '@mui/system';

// Theme Configuration
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

// Styled Components
const InsuranceSlider = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    height: '300px', // افزایش ارتفاع
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(6),
    marginTop: theme.spacing(4),
}));

const InsuranceCard = styled(motion.div)(({ theme }) => ({
    position: 'absolute',
    width: '300px',
    height: '200px',
    background: 'linear-gradient(145deg, #E3F2FD 0%, #B3E5FC 100%)',
    borderRadius: theme.shape.borderRadius * 3,
    boxShadow: '0 8px 20px rgba(33, 150, 243, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(4),
    cursor: 'pointer',
    textAlign: 'center',
    border: '1px solid rgba(33, 150, 243, 0.2)',
    transition: 'all 0.3s ease',
}));

const InsuranceIcon = styled(Box)(({ theme }) => ({
    width: '60px',
    height: '60px',
    marginBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    background: 'linear-gradient(45deg, #4CAF50, #2196F3)',
    color: '#fff',
    boxShadow: '0 4px 10px rgba(33, 150, 243, 0.3)',
}));

// Data
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
const insuranceCompanies = [
    {
        name: 'بیمه تامین اجتماعی',
        icon: 'social-security',
        description: 'خدمات درمانی تحت پوشش بیمه تامین اجتماعی'
    },
    {
        name: 'بیمه سلامت روستایی',
        icon: 'rural-health',
        description: 'خدمات درمانی ویژه مناطق روستایی'
    },
    {
        name: 'بیمه سلامت شهری',
        icon: 'urban-health',
        description: 'خدمات درمانی ویژه مناطق شهری'
    },
    {
        name: 'بیمه نیروهای مسلح',
        icon: 'military-health',
        description: 'خدمات درمانی ویژه نیروهای مسلح و خانواده'
    },
    {
        name: 'بیمه شرکت‌های نفت و گاز',
        icon: 'oil-gas',
        description: 'خدمات درمانی کارکنان صنعت نفت و گاز'
    },
    {
        name: 'سایر بیمه‌ها',
        icon: 'other-insurance',
        description: 'هزینه سایر بیمه‌ها با ارائه فاکتور معتبر مدوگرام، قابل استرداد است'
    }
];

const InsuranceCarousel = () => {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const nextCard = () => {
        setCurrentIndex((prev) => (prev + 1) % insuranceCompanies.length);
    };

    const prevCard = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? insuranceCompanies.length - 1 : prev - 1
        );
    };

    return (
        <InsuranceSlider>
            <IconButton
                onClick={prevCard}
                sx={{
                    position: 'absolute',
                    left: 20,
                    zIndex: 2,
                    background: 'rgba(255,255,255,0.9)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    '&:hover': {
                        background: 'rgba(255,255,255,1)',
                        transform: 'scale(1.1)'
                    },
                    transition: 'all 0.3s ease'
                }}
            >
                <ChevronLeftIcon />
            </IconButton>

            {insuranceCompanies.map((company, index) => {
                const distance = Math.abs(currentIndex - index);
                const isActive = index === currentIndex;

                return (
                    <InsuranceCard
                        key={company.name}
                        animate={{
                            scale: isActive ? 1 : 0.8,
                            x: isActive ? 0 : (index < currentIndex ? -280 : 280),
                            rotateY: isActive ? 0 : (index < currentIndex ? 45 : -45),
                            opacity: distance <= 2 ? 1 - (distance * 0.3) : 0,
                            zIndex: isActive ? 1 : 0,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 20
                        }}
                    >
                        <InsuranceIcon>
                            <LocalHospitalIcon sx={{ fontSize: 30 }} />
                        </InsuranceIcon>
                        <Typography
                            variant="h6"
                            sx={{
                                mb: 1,
                                fontWeight: 'bold',
                                color: '#1976d2'
                            }}
                        >
                            {company.name}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#666',
                                fontSize: '0.9rem'
                            }}
                        >
                            {company.description}
                        </Typography>
                    </InsuranceCard>
                );
            })}

            <IconButton
                onClick={nextCard}
                sx={{
                    position: 'absolute',
                    right: 20,
                    zIndex: 2,
                    background: 'rgba(255,255,255,0.9)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    '&:hover': {
                        background: 'rgba(255,255,255,1)',
                        transform: 'scale(1.1)'
                    },
                    transition: 'all 0.3s ease'
                }}
            >
                <ChevronRightIcon />
            </IconButton>
        </InsuranceSlider>
    );
};

const Home = () => {
    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
                <Box textAlign="center" sx={{ mb: 8 }}>
                    <Typography
                        variant="h2"
                        sx={{
                            background: 'linear-gradient(45deg, #2196f3, #00c853)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            mb: 2
                        }}
                    >
                        مدوگرام
                    </Typography>
                    <Typography variant="h5" color="text.secondary">
                        دسترسی آسان به خدمات پزشکی نوین
                    </Typography>
                </Box>

                <Box sx={{ mb: 10 }}>
                    <Grid
                        container
                        spacing={{ xs: 4, md: 6 }} // فاصله افقی ریسپانسیو
                        rowSpacing={{ xs: 6, md: 8 }} // فاصله عمودی بیشتر و ریسپانسیو
                    >
                        {serviceCards.map((card) => (
                            <Grid item xs={12} sm={6} md={4} key={card.id}>
                                <Card
                                    component={Link}
                                    to={card.link}
                                    sx={{
                                        minHeight: '280px', // ارتفاع حداقل برای یکسان‌سازی
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textDecoration: 'none',
                                        p: { xs: 3, md: 4 }, // پدینگ ریسپانسیو
                                        background: `linear-gradient(135deg, ${card.color}15, ${card.color}05)`,
                                        border: `1px solid ${card.color}20`,
                                        borderRadius: '16px',
                                        transition: 'all 0.3s ease',
                                        transform: 'translateY(0)',
                                        position: 'relative', // برای افکت سایه
                                        overflow: 'hidden', // برای افکت hover
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            background: `linear-gradient(135deg, ${card.color}05, ${card.color}15)`,
                                            opacity: 0,
                                            transition: 'opacity 0.3s ease',
                                        },
                                        '&:hover': {
                                            boxShadow: `0 10px 25px ${card.color}20`,
                                            transform: 'translateY(-8px)',
                                            '&::before': {
                                                opacity: 1,
                                            },
                                        },
                                    }}
                                >
                                    <IconButton
                                        sx={{
                                            backgroundColor: `${card.color}15`,
                                            mb: 3, // فاصله بیشتر از متن
                                            padding: '16px', // سایز بزرگتر برای آیکون
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                backgroundColor: `${card.color}25`,
                                                transform: 'scale(1.1) rotate(5deg)',
                                            },
                                        }}
                                    >
                                        {card.icon}
                                    </IconButton>
                                    <CardContent sx={{
                                        flexGrow: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        textAlign: 'center',
                                        zIndex: 1 // برای نمایش روی افکت hover
                                    }}>
                                        <Typography
                                            variant="h6"
                                            gutterBottom
                                            sx={{
                                                fontWeight: 'bold',
                                                color: card.color,
                                                mb: 2
                                            }}
                                        >
                                            {card.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                fontSize: '0.95rem',
                                                lineHeight: 1.6
                                            }}
                                        >
                                            {card.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Grow in={true} timeout={1500}>
                    <Box sx={{ mb: 6, mt: 8 }}>
                        <Typography
                            variant="h5"
                            align="center"
                            sx={{
                                mb: 4,
                                color: '#1976d2',
                                fontWeight: 'bold'
                            }}
                        >
                            بیمه‌های طرف قرارداد مدوگرام
                        </Typography>
                        <InsuranceCarousel />
                    </Box>
                </Grow>
            </Container>
        </ThemeProvider>
    );
};

export default Home;