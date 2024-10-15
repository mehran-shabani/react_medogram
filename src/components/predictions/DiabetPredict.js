import React, { useState } from 'react';
import axios from 'axios';
import {
    TextField,
    Button,
    Typography,
    Container,
    Snackbar,
    Alert,
    CircularProgress,
    Stepper,
    Step,
    StepLabel,
    Paper,
    Box,
    Radio,
    RadioGroup,
    FormControlLabel,
    Tooltip,
    ThemeProvider,
    createTheme,
    CssBaseline,
    LinearProgress,
    Divider
} from '@mui/material';
import { styled } from '@mui/system';
import { motion, AnimatePresence } from 'framer-motion';
import { InfoOutlined } from '@mui/icons-material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
        background: {
            default: '#f5f5f5',
        },
    },
    typography: {
        fontFamily: 'Vazirmatn, Arial, sans-serif',
    },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
    borderRadius: '20px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    marginBottom: theme.spacing(3),
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: theme.palette.primary.main,
        },
    },
}));

const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
    padding: theme.spacing(1, 3),
    borderRadius: '25px',
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)',
    transition: 'all 0.3s',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 10px 4px rgba(0, 0, 0, .1)',
    },
}));

const InfoIcon = styled(InfoOutlined)(({ theme }) => ({
    marginLeft: theme.spacing(1),
    fontSize: '1rem',
    color: theme.palette.text.secondary,
}));

const DiabetesPredictionForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        n_pregnant: '0',
        glucose: '',
        tension: '',
        thickness: '20',
        height: '',
        weight: '',
        age: '',
        num_parents: '0',
        num_siblings: '0',
        num_grandparents: '0',
        num_uncles_aunts: '0',
        name: '',
        gender: 'male'
    });
    const [errors, setErrors] = useState({});
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validateStep = (currentStep) => {
        const newErrors = {};
        let isValid = true;

        switch(currentStep) {
            case 1:
                if (!formData.age) newErrors.age = 'سن الزامی است';
                if (!formData.height) newErrors.height = 'قد الزامی است';
                if (!formData.weight) newErrors.weight = 'وزن الزامی است';
                break;
            case 2:
                if (formData.gender === 'female' && !formData.n_pregnant) newErrors.n_pregnant = 'تعداد بارداری الزامی است';
                if (!formData.glucose) newErrors.glucose = 'قند خون الزامی است';
                if (!formData.tension) newErrors.tension = 'فشار خون الزامی است';
                if (!formData.thickness) newErrors.thickness = 'ضخامت پوست الزامی است';
                break;
            case 3:
                if (!formData.num_parents) newErrors.num_parents = 'تعداد والدین مبتلا الزامی است';
                if (!formData.num_siblings) newErrors.num_siblings = 'تعداد خواهر/برادر مبتلا الزامی است';
                if (!formData.num_grandparents) newErrors.num_grandparents = 'تعداد پدربزرگ/مادربزرگ مبتلا الزامی است';
                if (!formData.num_uncles_aunts) newErrors.num_uncles_aunts = 'تعداد عمو/خاله/دایی/عمه مبتلا الزامی است';
                break;
            default:
                break;
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            isValid = false;
        }

        return isValid;
    };

    const nextStep = () => {
        if (validateStep(step)) {
            setStep(step + 1);
        } else {
            setSnackbarOpen(true);
            setError('لطفاً همه فیلدهای الزامی را پر کنید.');
        }
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const submitPrediction = async () => {
        if (validateStep(3)) {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.post('https://api.medogram.ir/predict/api/diabetes/', formData);
                setPrediction(response.data.probability);
                nextStep();
            } catch (error) {
                setError('مشکلی در پیش‌بینی رخ داده است. لطفاً دوباره تلاش کنید.');
                setSnackbarOpen(true);
            }
            setLoading(false);
        } else {
            setSnackbarOpen(true);
            setError('لطفاً همه فیلدهای الزامی را پر کنید.');
        }
    };

    const submitOutcome = async (outcome) => {
        setLoading(true);
        setError(null);
        try {
            const data = { ...formData, actual_outcome: outcome };
            await axios.post('https://api.medogram.ir/predict/api/store_user_input/', data);
            setSnackbarOpen(true);
        } catch (error) {
            setError('مشکلی در ارسال پاسخ رخ داده است.');
            setSnackbarOpen(true);
        }
        setLoading(false);
    };

    const steps = ['اطلاعات شخصی', 'اطلاعات پزشکی', 'سابقه خانوادگی', 'نتیجه'];

    const renderStepContent = (step) => {
        const fadeProps = {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -20 },
            transition: { duration: 0.5 }
        };

        switch (step) {
            case 1:
                return (
                    <motion.div {...fadeProps}>
                        <Typography variant="h5" gutterBottom>مرحله ۱: اطلاعات شخصی</Typography>
                        <StyledTextField label="نام شما" name="name" fullWidth value={formData.name} onChange={handleChange} />
                        <StyledTextField
                            label="سن شما"
                            name="age"
                            type="number"
                            fullWidth
                            value={formData.age}
                            onChange={handleChange}
                            error={!!errors.age}
                            helperText={errors.age}
                            required
                        />
                        <StyledTextField
                            label="قد (سانتی‌متر)"
                            name="height"
                            type="number"
                            fullWidth
                            value={formData.height}
                            onChange={handleChange}
                            error={!!errors.height}
                            helperText={errors.height}
                            required
                        />
                        <StyledTextField
                            label="وزن (کیلوگرم)"
                            name="weight"
                            type="number"
                            fullWidth
                            value={formData.weight}
                            onChange={handleChange}
                            error={!!errors.weight}
                            helperText={errors.weight}
                            required
                        />
                        <RadioGroup row name="gender" value={formData.gender} onChange={handleChange}>
                            <FormControlLabel value="male" control={<Radio />} label="مرد" />
                            <FormControlLabel value="female" control={<Radio />} label="زن" />
                        </RadioGroup>
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div {...fadeProps}>
                        <Typography variant="h5" gutterBottom>مرحله ۲: اطلاعات پزشکی</Typography>
                        {formData.gender === 'female' && (
                            <Tooltip title="تعداد دفعاتی که باردار شده‌اید" placement="top-start">
                                <StyledTextField
                                    label="تعداد بارداری"
                                    name="n_pregnant"
                                    type="number"
                                    fullWidth
                                    value={formData.n_pregnant}
                                    onChange={handleChange}
                                    error={!!errors.n_pregnant}
                                    helperText={errors.n_pregnant}
                                    required
                                    InputProps={{
                                        endAdornment: <InfoIcon />,
                                    }}
                                />
                            </Tooltip>
                        )}
                        <Tooltip title="میزان قند خون ناشتا (mg/dL)" placement="top-start">
                            <StyledTextField
                                label="قند خون"
                                name="glucose"
                                type="number"
                                fullWidth
                                value={formData.glucose}
                                onChange={handleChange}
                                error={!!errors.glucose}
                                helperText={errors.glucose}
                                required
                                InputProps={{
                                    endAdornment: <InfoIcon />,
                                }}
                            />
                        </Tooltip>
                        <Tooltip title="فشار خون سیستولیک (mmHg)" placement="top-start">
                            <StyledTextField
                                label="فشار خون"
                                name="tension"
                                type="number"
                                fullWidth
                                value={formData.tension}
                                onChange={handleChange}
                                error={!!errors.tension}
                                helperText={errors.tension}
                                required
                                InputProps={{
                                    endAdornment: <InfoIcon />,
                                }}
                            />
                        </Tooltip>
                        <Tooltip title="ضخامت چین پوستی سه سر بازو (میلی‌متر) - معمولاً بین 10 تا 50 میلی‌متر" placement="top-start">
                            <StyledTextField
                                label="ضخامت پوست (میلی‌متر)"
                                name="thickness"
                                type="number"
                                fullWidth
                                value={formData.thickness}
                                onChange={handleChange}
                                error={!!errors.thickness}
                                helperText={errors.thickness}
                                required
                                InputProps={{
                                    endAdornment: <InfoIcon />,
                                }}
                            />
                        </Tooltip>
                    </motion.div>
                );
            case 3:
                return (
                    <motion.div {...fadeProps}>
                        <Typography variant="h5" gutterBottom>مرحله ۳: سابقه خانوادگی</Typography>
                        <StyledTextField
                            label="تعداد والدین مبتلا به دیابت"
                            name="num_parents"
                            type="number"
                            fullWidth
                            value={formData.num_parents}
                            onChange={handleChange}
                            error={!!errors.num_parents}
                            helperText={errors.num_parents}
                            required
                        />
                        <StyledTextField
                            label="تعداد خواهر/برادر مبتلا به دیابت"
                            name="num_siblings"
                            type="number"
                            fullWidth
                            value={formData.num_siblings}
                            onChange={handleChange}
                            error={!!errors.num_siblings}
                            helperText={errors.num_siblings}
                            required
                        />
                        <StyledTextField
                            label="تعداد پدربزرگ/مادربزرگ مبتلا به دیابت"
                            name="num_grandparents"
                            type="number"
                            fullWidth
                            value={formData.num_grandparents}
                            onChange={handleChange}
                            error={!!errors.num_grandparents}
                            helperText={errors.num_grandparents}
                            required
                        />
                        <StyledTextField
                            label="تعداد عمو/خاله/دایی/عمه مبتلا به دیابت"
                            name="num_uncles_aunts"
                            type="number"
                            fullWidth
                            value={formData.num_uncles_aunts}
                            onChange={handleChange}
                            error={!!errors.num_uncles_aunts}
                            helperText={errors.num_uncles_aunts}
                            required
                        />
                    </motion.div>
                );
            case 4:
                return (
                    <motion.div {...fadeProps}>
                        <Typography variant="h5" gutterBottom>نتیجه پیش‌بینی</Typography>
                        <Box sx={{ my: 4, textAlign: 'center' }}>
                            <Typography variant="h4" color="primary" gutterBottom>
                                احتمال ابتلای شما به دیابت:
                            </Typography>
                            <Typography variant="h2" color="secondary" gutterBottom>
                                {prediction ? `${(prediction * 100).toFixed(2)}%` : 'N/A'}
                            </Typography>
                            <LinearProgress
                                variant="determinate"
                                value={prediction ? prediction * 100 : 0}
                                sx={{ height: 10, borderRadius: 5, my: 2 }}
                            />
                        </Box>
                        <Divider sx={{ my: 4 }} />
                        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>برای افزایش دقت مدل ما، آیا مایلید به سوال زیر پاسخ دهید؟</Typography>
                        <Typography variant="body1" gutterBottom>آیا خود شما دیابت اثبات شده دارید؟</Typography>
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                            <StyledButton variant="contained" color="success" onClick={() => submitOutcome(true)}>بله</StyledButton>
                            <StyledButton variant="contained" color="error" onClick={() => submitOutcome(false)}>خیر</StyledButton>
                        </Box>
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="md">
                <StyledPaper elevation={3}>
                    <Stepper activeStep={step - 1} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <Box sx={{ mt: 4 }}>
                        <AnimatePresence mode='wait'>
                            {renderStepContent(step)}
                        </AnimatePresence>
                    </Box>
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                        {step > 1 && (
                            <StyledButton variant="outlined" onClick={prevStep}>
                                قبلی
                            </StyledButton>
                        )}
                        {step < 4 && (
                            <StyledButton variant="contained" color="primary" onClick={step === 3 ? submitPrediction : nextStep}>
                                {loading ? <CircularProgress size={24} /> : (step === 3 ? 'ارسال' : 'بعدی')}
                            </StyledButton>
                        )}
                    </Box>
                </StyledPaper>
                <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                    <Alert onClose={handleSnackbarClose} severity={error ? "error" : "success"} sx={{ width: '100%' }}>
                        {error || 'پاسخ شما با موفقیت ارسال شد!'}
                    </Alert>
                </Snackbar>
            </Container>
        </ThemeProvider>
    );
};

export default DiabetesPredictionForm;