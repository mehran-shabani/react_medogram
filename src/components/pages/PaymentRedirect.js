import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import {
    Box,
    Container,
    Typography,
    Paper,
    CircularProgress,
    Fade,
    Snackbar,
    Alert,
    Button,
    ThemeProvider,
    createTheme,
    CssBaseline,
} from '@mui/material';
import { styled } from '@mui/system';
import { CheckCircle, Error, ArrowBack } from '@mui/icons-material';
import { motion } from 'framer-motion';

const theme = createTheme({
    palette: {
        primary: {
            main: '#6200EE',
        },
        secondary: {
            main: '#03DAC6',
        },
        background: {
            default: '#f5f5f5',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h4: {
            fontWeight: 700,
        },
        h6: {
            fontWeight: 500,
        },
    },
    shape: {
        borderRadius: 12,
    },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
    overflow: 'hidden',
    position: 'relative',
}));

const AnimatedBox = styled(motion.div)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
});

const BackgroundPattern = styled(Box)({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.05,
    background: `repeating-linear-gradient(
    45deg,
    #6200EE,
    #6200EE 10px,
    #7722FF 10px,
    #7722FF 20px
  )`,
    zIndex: 0,
});

const ContentBox = styled(Box)({
    position: 'relative',
    zIndex: 1,
});

const PaymentRedirect = () => {
    const location = useLocation();
    const [transId, setTransId] = useState(null);
    const [idGet, setIdGet] = useState(null);
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const transIdFromURL = params.get('trans_id');
        const idGetFromURL = params.get('id_get');

        if (transIdFromURL && idGetFromURL) {
            setTransId(transIdFromURL);
            setIdGet(idGetFromURL);
        } else {
            setStatus('Missing payment information');
            setIsLoading(false);
        }
    }, [location]);

    const verifyPayment = useCallback(async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/verify-payment/', {
                trans_id: transId,
                id_get: idGet,
            });
            setStatus('Payment Verified');
            setSnackbar({ open: true, message: response.data.message, severity: 'success' });
        } catch (error) {
            setStatus('Payment Verification Failed');
            setSnackbar({
                open: true,
                message: error.response?.data?.error || 'An error occurred',
                severity: 'error',
            });
        } finally {
            setIsLoading(false);
        }
    }, [transId, idGet]);

    useEffect(() => {
        if (transId && idGet) {
            verifyPayment();
        }
    }, [transId, idGet, verifyPayment]);

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="sm">
                <Box sx={{ mt: 8, mb: 4 }}>
                    <StyledPaper elevation={3}>
                        <BackgroundPattern />
                        <ContentBox>
                            <Typography variant="h4" component="h1" gutterBottom color="primary">
                                Payment Verification
                            </Typography>
                            <AnimatedBox
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Box sx={{ my: 4, position: 'relative', height: 150, width: '100%' }}>
                                    <Fade in={isLoading} unmountOnExit>
                                        <CircularProgress
                                            size={80}
                                            thickness={4}
                                            sx={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                marginTop: '-40px',
                                                marginLeft: '-40px',
                                            }}
                                        />
                                    </Fade>
                                    <Fade in={!isLoading} unmountOnExit>
                                        <Box sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            {status === 'Payment Verified' ? (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                                                >
                                                    <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                                                >
                                                    <Error sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
                                                </motion.div>
                                            )}
                                            <Typography variant="h6" color="text.secondary">{status}</Typography>
                                        </Box>
                                    </Fade>
                                </Box>
                            </AnimatedBox>
                            <Button
                                component={Link}
                                to="/"
                                startIcon={<ArrowBack />}
                                variant="outlined"
                                color="primary"
                                sx={{ mt: 2 }}
                            >
                                Back to Home
                            </Button>
                        </ContentBox>
                    </StyledPaper>
                </Box>
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert onClose={handleSnackbarClose} severity={snackbar.severity} variant="filled">
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Container>
        </ThemeProvider>
    );
};

export default PaymentRedirect;