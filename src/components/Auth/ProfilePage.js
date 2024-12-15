import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Container, TextField, Button, Box, Typography, CircularProgress, Avatar,
    Card, CardContent, CardActions, Divider, IconButton, Fade, Paper
} from '@mui/material';
import { styled } from '@mui/system';
import { Edit, Save, Cancel, AccountBalance } from '@mui/icons-material';
import { AuthContext } from './AuthContext';
import { generateGeometricAvatar } from '../utils/AvatarGenerator';
import { motion } from 'framer-motion';

const StyledCard = styled(Card)(({ theme }) => ({
    maxWidth: 500,
    margin: '2rem auto',
    padding: theme.spacing(3),
    boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
    borderRadius: theme.shape.borderRadius * 3,
    transition: 'transform 0.5s',
    '&:hover': {
        transform: 'scale(1.05)',
    },
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: '0 auto',
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const ProfileField = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
}));

const WalletPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    marginBottom: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0px 4px 10px rgba(0,0,0,0.15)',
    transition: 'background-color 0.5s',
    '&:hover': {
        backgroundColor: theme.palette.secondary.light,
    }
}));

const ProfilePage = () => {
    const { isVerified, token } = useContext(AuthContext);
    const [profile, setProfile] = useState({
        username: '',
        email: ''
    });
    const [walletAmount, setWalletAmount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (!isVerified) {
            toast.error('لطفاً حساب خود را تایید کنید تا به صفحه پروفایل دسترسی داشته باشید.');
            setTimeout(() => {
                window.location.href = '/login';
            }, 3000);
            return;
        }

        const fetchProfileAndWallet = async () => {
            try {
                const [profileResponse, walletResponse] = await Promise.all([
                    axios.get('https://api.medogram.ir/api/profile/', {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get('https://api.medogram.ir/api/box', {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                ]);
                setProfile(profileResponse.data);
                setWalletAmount(walletResponse.data.amount);
            } catch (error) {
                console.error('خطا در دریافت اطلاعات:', error.response || error.message);
                toast.error('خطا در دریافت اطلاعات پروفایل یا کیف پول!');
            } finally {
                setLoading(false);
            }
        };

        fetchProfileAndWallet();
    }, [isVerified, token]);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://api.medogram.ir/api/profile/update/', profile, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProfile(response.data);
            setErrors({});
            setIsEditing(false);
            toast.success('پروفایل با موفقیت به‌روزرسانی شد!');
        } catch (error) {
            console.error('خطا در به‌روزرسانی پروفایل:', error.response || error.message);
            if (error.response && error.response.data) {
                setErrors(error.response.data);
            }
            toast.error('خطا در به‌روزرسانی پروفایل!');
        }
    };

    if (loading) {
        return (
            <Container>
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm">
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
            <Fade in={true} timeout={800}>
                <StyledCard component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} whileHover={{ scale: 1.05 }}>
                    <CardContent>
                        <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity }}>
                            <ProfileAvatar>
                                {generateGeometricAvatar(profile.username)}
                            </ProfileAvatar>
                        </motion.div>
                        <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ mt: 2 }}>
                            {profile.username}
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <WalletPaper elevation={3} component={motion.div} initial={{ scale: 0.8 }} animate={{ scale: 1 }} whileHover={{ scale: 1.1 }}>
                            <AccountBalance sx={{ mr: 1 }} />
                            <Typography variant="h6">
                                موجودی کیف پول: 💵  ﷼ {walletAmount !== null ? walletAmount.toFixed(0) : 'N/A'}
                            </Typography>
                        </WalletPaper>
                        {isEditing ? (
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    fullWidth
                                    label="نام کاربری"
                                    name="username"
                                    value={profile.username}
                                    onChange={handleChange}
                                    error={!!errors.username}
                                    helperText={errors.username}
                                    variant="outlined"
                                    margin="normal"
                                />
                                <TextField
                                    fullWidth
                                    label="ایمیل"
                                    name="email"
                                    type="email"
                                    value={profile.email}
                                    onChange={handleChange}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    variant="outlined"
                                    margin="normal"
                                />
                            </form>
                        ) : (
                            <>
                                <ProfileField>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mr: 1 }}>نام کاربری:</Typography>
                                    <Typography variant="body1">{profile.username}</Typography>
                                </ProfileField>
                                <ProfileField>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mr: 1 }}>ایمیل:</Typography>
                                    <Typography variant="body1">{profile.email}</Typography>
                                </ProfileField>
                            </>
                        )}
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'center' }}>
                        {isEditing ? (
                            <>
                                <IconButton color="primary" onClick={handleSubmit} component={motion.div} whileHover={{ scale: 1.2 }}>
                                    <Save />
                                </IconButton>
                                <IconButton color="secondary" onClick={() => setIsEditing(false)} component={motion.div} whileHover={{ scale: 1.2 }}>
                                    <Cancel />
                                </IconButton>
                            </>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<Edit />}
                                onClick={() => setIsEditing(true)}
                                component={motion.div}
                                whileHover={{ scale: 1.1 }}
                            >
                                ویرایش پروفایل
                            </Button>
                        )}
                    </CardActions>
                </StyledCard>
            </Fade>
        </Container>
    );
};

export default ProfilePage;
