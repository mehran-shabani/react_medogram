import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    MenuItem,
    Grid,
    Stepper,
    Step,
    StepLabel,
    CircularProgress,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const symptomCategories = [
    {
        label: 'General Symptoms',
        key: 'general_symptoms', // اصلاح نام کلیدها مطابق با نیاز سرور
        options: [
            { value: 'fever', label: 'Fever' },
            { value: 'fatigue', label: 'Fatigue' },
            { value: 'weight_loss', label: 'Weight Loss' },
            { value: 'appetite_loss', label: 'Loss of Appetite' },
            { value: 'night_sweats', label: 'Night Sweats' },
            { value: 'general_pain', label: 'General Pain' },
            { value: 'swollen_lymph_nodes', label: 'Swollen Lymph Nodes' },
            { value: 'chills', label: 'Chills' },
            { value: 'malaise', label: 'General Malaise' },
        ],
    },
    {
        label: 'Neurological Symptoms',
        key: 'neurological_symptoms',
        options: [
            { value: 'headache', label: 'Headache' },
            { value: 'dizziness', label: 'Dizziness' },
            { value: 'seizures', label: 'Seizures' },
            { value: 'numbness', label: 'Numbness' },
            { value: 'weakness', label: 'Muscle Weakness' },
            { value: 'memory_loss', label: 'Memory Loss' },
            { value: 'speech_difficulty', label: 'Speech Difficulty' },
            { value: 'vision_problems', label: 'Vision Problems' },
            { value: 'migraine', label: 'Migraine' },
            { value: 'tremor', label: 'Tremor' },
        ],
    },
    {
        label: 'Cardiovascular Symptoms',
        key: 'cardiovascular_symptoms',
        options: [
            { value: 'chest_pain', label: 'Chest Pain' },
            { value: 'palpitations', label: 'Palpitations' },
            { value: 'shortness_of_breath', label: 'Shortness of Breath' },
            { value: 'swelling', label: 'Swelling' },
            { value: 'high_blood_pressure', label: 'High Blood Pressure' },
            { value: 'fatigue', label: 'Fatigue' },
            { value: 'fainting', label: 'Fainting' },
            { value: 'irregular_heartbeat', label: 'Irregular Heartbeat' },
            { value: 'low_blood_pressure', label: 'Low Blood Pressure' },
        ],
    },
    {
        label: 'Gastrointestinal Symptoms',
        key: 'gastrointestinal_symptoms',
        options: [
            { value: 'nausea', label: 'Nausea' },
            { value: 'vomiting', label: 'Vomiting' },
            { value: 'diarrhea', label: 'Diarrhea' },
            { value: 'constipation', label: 'Constipation' },
            { value: 'abdominal_pain', label: 'Abdominal Pain' },
            { value: 'bloating', label: 'Bloating' },
            { value: 'heartburn', label: 'Heartburn' },
            { value: 'loss_of_appetite', label: 'Loss of Appetite' },
            { value: 'indigestion', label: 'Indigestion' },
        ],
    },
    {
        label: 'Respiratory Symptoms',
        key: 'respiratory_symptoms',
        options: [
            { value: 'cough', label: 'Cough' },
            { value: 'shortness_of_breath', label: 'Shortness of Breath' },
            { value: 'wheezing', label: 'Wheezing' },
            { value: 'chest_tightness', label: 'Chest Tightness' },
            { value: 'sore_throat', label: 'Sore Throat' },
            { value: 'runny_nose', label: 'Runny Nose' },
            { value: 'fever', label: 'Fever' },
            { value: 'sneezing', label: 'Sneezing' },
            { value: 'difficulty_breathing', label: 'Difficult Breathing'},
        ],
    },
];

const Visit = () => {
    const { token } = useContext(AuthContext);
    const [activeStep, setActiveStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        urgency: 'prescription',
        general_symptoms: '',
        neurological_symptoms: '',
        cardiovascular_symptoms: '',
        gastrointestinal_symptoms: '',
        respiratory_symptoms: '',
        description: '',
    });

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!formData.name.trim()) {
            toast.error('Please insert name.');
            return;
        }

        const symptoms = symptomCategories.map((category) => formData[category.key]).filter(Boolean);
        if (symptoms.length === 0) {
            toast.error('Please select at least one symptom.');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/visit/',
                formData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setFormData({
                name: '',
                urgency: 'prescription',
                general_symptoms: '',
                neurological_symptoms: '',
                cardiovascular_symptoms: '',
                gastrointestinal_symptoms: '',
                respiratory_symptoms: '',
                description: '',
            });
            setActiveStep(0);
            toast.success(`Visit successfully registered for ${response.data.name}.`);
        } catch (error) {
            console.error('Error creating visit:', error);
            if (error.response && error.response.status === 401) {
                toast.error('Authentication failed! Please log in again.');
            } else {
                toast.error('Error registering the visit.');
            }
        } finally {
            setLoading(false);
        }
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <>
                        <TextField
                            label="Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            select
                            label="Type of Visit"
                            name="urgency"
                            value={formData.urgency}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        >
                            <MenuItem value="prescription">Prescription of common drugs</MenuItem>
                            <MenuItem value="diet">Diet Therapy</MenuItem>
                            <MenuItem value="addiction">Addiction Treatment</MenuItem>
                            <MenuItem value="online_consultation">Online Consultation</MenuItem>
                        </TextField>
                    </>
                );
            case 1:
                return symptomCategories.slice(0, 3).map((category) => (
                    <TextField
                        key={category.key}
                        select
                        label={category.label}
                        name={category.key}
                        value={formData[category.key]}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    >
                        {category.options.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                ));
            case 2:
                return (
                    <>
                        {symptomCategories.slice(3).map((category) => (
                            <TextField
                                key={category.key}
                                select
                                label={category.label}
                                name={category.key}
                                value={formData[category.key]}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            >
                                {category.options.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        ))}
                        <TextField
                            label="Additional Notes"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={4}
                            margin="normal"
                        />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#f5f5f5',
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: { xs: 2, sm: 4 },
                    width: '90%',
                    maxWidth: 600,
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
                    backgroundColor: '#ffffff',
                    borderRadius: 4,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
                    New Visit Registration
                </Typography>
                <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                    <Step>
                        <StepLabel>Patient Info</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Symptoms (1/2)</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Symptoms (2/2)</StepLabel>
                    </Step>
                </Stepper>
                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {renderStepContent(activeStep)}
                        </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            variant="outlined"
                        >
                            Back
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={activeStep === 2 ? handleSubmit : handleNext}
                            disabled={loading}
                        >
                            {loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : activeStep === 2 ? (
                                'Submit'
                            ) : (
                                'Next'
                            )}
                        </Button>
                    </Box>
                </Box>
            </Paper>
            <ToastContainer />
        </Box>
    );
};

export default Visit;
