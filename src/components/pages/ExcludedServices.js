import React from 'react';
import {
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Box,
    Tooltip,
    useTheme,
    useMediaQuery,
    Fade,
    Grow
} from '@mui/material';
import { styled, keyframes } from '@mui/system';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WarningIcon from '@mui/icons-material/Warning';
import { motion } from 'framer-motion';

const pulseAnimation = keyframes`
    0% {
        box-shadow: 0 0 0 0 rgba(255, 59, 48, 0.7);
    }
    70% {
        box-shadow: 0 0 0 15px rgba(255, 59, 48, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(255, 59, 48, 0);
    }
`;

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(6),
    maxWidth: '900px',
    margin: '40px auto',
    backgroundColor: '#fff',
    borderRadius: theme.shape.borderRadius * 3,
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    position: 'relative',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 'inherit',
        animation: `${pulseAnimation} 2s infinite`,
        pointerEvents: 'none',
    },
}));

const GradientBackground = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '200px',
    background: 'linear-gradient(45deg, #FF3B30, #FF9500, #FF2D55)',
    backgroundSize: '200% 200%',
    animation: `${gradientAnimation} 15s ease infinite`,
    opacity: 0.1,
    zIndex: 0,
}));

const ContentWrapper = styled(Box)({
    position: 'relative',
    zIndex: 1,
});

const StyledListItem = styled(ListItem)(({ theme }) => ({
    marginBottom: theme.spacing(3),
    backgroundColor: '#ffffff',
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.4s ease',
    '&:hover': {
        transform: 'translateY(-5px) scale(1.02)',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    },
}));

const MotionListItem = motion(StyledListItem);

const ExcludedServices = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const services = [
        'Management of life-threatening emergencies such as cardiac arrest, stroke, and major accidents.',
        'Physical transfer and transport of patients to healthcare facilities.',
        'On-site medical services at accident scenes for immediate examination and stabilization.',
        'Emergency surgical interventions requiring in-person surgical teams and equipment.',
        'Immediate administration of life-saving medications like epinephrine or naloxone.',
        'Stabilizing critical conditions such as controlling blood pressure or assisting with breathing.',
        'Physical examinations that require direct patient contact, such as pulse checks or abdominal palpation.'
    ];

    return (
        <StyledPaper elevation={5}>
            <GradientBackground />
            <ContentWrapper>
                <Fade in={true} timeout={1000}>
                    <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <WarningIcon sx={{ fontSize: 40, color: '#FF3B30', mr: 2 }} />
                        <Typography variant={isMobile ? "h5" : "h4"} align="center" sx={{ color: '#FF3B30', fontWeight: 'bold', letterSpacing: 0.5 }}>
                            Critical Alert: Services Not Covered
                        </Typography>
                    </Box>
                </Fade>
                <Grow in={true} timeout={1500}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
                        <Typography variant="subtitle1" align="center" sx={{ color: '#333', maxWidth: '700px', fontWeight: 'medium', lineHeight: 1.6 }}>
                            The following critical medical procedures and emergency services fall outside Medogram's scope.
                            These situations require immediate professional medical intervention. Please seek in-person medical attention immediately if you encounter any of these scenarios.
                        </Typography>
                    </Box>
                </Grow>
                <List>
                    {services.map((service, index) => (
                        <MotionListItem
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <ListItemIcon>
                                <MedicalServicesIcon sx={{ color: '#FF3B30', fontSize: 28 }} />
                            </ListItemIcon>
                            <ListItemText
                                primary={service}
                                primaryTypographyProps={{
                                    variant: 'body1',
                                    fontWeight: 'medium',
                                    color: theme.palette.text.primary,
                                    fontSize: '1.1rem',
                                }}
                            />
                        </MotionListItem>
                    ))}
                </List>
                <Tooltip title="If you're experiencing any of these situations, call emergency services immediately." arrow placement="top">
                    <Typography variant="caption" align="center" sx={{ display: 'block', mt: 4, color: '#666', fontStyle: 'italic' }}>
                        In case of emergency, always dial your local emergency number.
                    </Typography>
                </Tooltip>
            </ContentWrapper>
        </StyledPaper>
    );
};

export default ExcludedServices;