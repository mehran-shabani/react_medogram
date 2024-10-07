import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Container, TextField, Button, Box, Typography, CircularProgress, Avatar,
    Card, CardContent, CardActions, Divider, IconButton, Fade, Paper
} from '@mui/material';
import { styled } from '@mui/system';
import { Edit, Save, Cancel, Person, AccountBalance } from '@mui/icons-material';
import { AuthContext } from './AuthContext';

const StyledCard = styled(Card)(({ theme }) => ({
    maxWidth: 500,
    margin: '2rem auto',
    padding: theme.spacing(3),
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    borderRadius: theme.shape.borderRadius * 2,
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: '0 auto',
    backgroundColor: theme.palette.primary.main,
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
                <StyledCard>
                    <CardContent>
                        <ProfileAvatar>
                            <Person fontSize="large" />
                        </ProfileAvatar>
                        <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ mt: 2 }}>
                            {profile.username}
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <WalletPaper elevation={3}>
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
                                <IconButton color="primary" onClick={handleSubmit}>
                                    <Save />
                                </IconButton>
                                <IconButton color="secondary" onClick={() => setIsEditing(false)}>
                                    <Cancel />
                                </IconButton>
                            </>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<Edit />}
                                onClick={() => setIsEditing(true)}
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