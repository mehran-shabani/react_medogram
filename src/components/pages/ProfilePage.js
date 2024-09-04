import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, TextField, Button, Paper, Box, Typography, CircularProgress } from '@mui/material';
import { AuthContext } from '../context/AuthContext'; // AuthContext import

const ProfilePage = () => {
    const { isVerified, token } = useContext(AuthContext); // Use `isVerified` and `token` from AuthContext
    const [profile, setProfile] = useState({
        username: '',
        email: ''
    });
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // If the user is not verified, show a toast message and redirect them after a delay
        if (!isVerified) {
            toast.error('Please verify your account to access the profile page.');
            setTimeout(() => {
                window.location.href = '/login'; // Redirect to login after showing the message
            }, 3000); // Delay of 3 seconds before redirect
            return;
        }

        // Fetch profile if user is verified
        const fetchProfile = async () => {
            try {
                console.log('Fetching profile...');
                const response = await axios.get('http://localhost:8000/api/profile/', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
                    },

                });
                console.log('Profile fetched successfully:', response.data); // Log success response
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error.response || error.message); // Log error
                toast.error('Error fetching profile!');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [isVerified, token]);

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Submitting profile update:', profile); // Log the data being submitted
            const response = await axios.post('http://localhost:8000/api/profile/update/', profile, {
                headers: {
                    Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
                },

            });
            console.log('Profile updated successfully:', response.data); // Log success response
            setProfile(response.data);
            setErrors({});
            setIsEditing(false);
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error.response || error.message); // Log error
            if (error.response && error.response.data) {
                setErrors(error.response.data);
                toast.error('Error updating profile!');
            } else {
                toast.error('Error updating profile!');
            }
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
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Profile Page
                </Typography>
                {isEditing ? (
                    <form onSubmit={handleSubmit}>
                        <Box mb={2}>
                            <TextField
                                fullWidth
                                label="Username"
                                name="username"
                                value={profile.username}
                                onChange={handleChange}
                                error={!!errors.username}
                                helperText={errors.username}
                                variant="outlined"
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={profile.email}
                                onChange={handleChange}
                                error={!!errors.email}
                                helperText={errors.email}
                                variant="outlined"
                            />
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                            <Button type="submit" variant="contained" color="primary">
                                Save
                            </Button>
                            <Button variant="outlined" color="secondary" onClick={() => setIsEditing(false)}>
                                Cancel
                            </Button>
                        </Box>
                    </form>
                ) : (
                    <Box>
                        <Typography variant="body1"><strong>Username:</strong> {profile.username}</Typography>
                        <Typography variant="body1"><strong>Email:</strong> {profile.email}</Typography>
                        <Box mt={2}>
                            <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
                                Edit Profile
                            </Button>
                        </Box>
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default ProfilePage;
