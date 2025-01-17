import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../Auth/AuthContext';
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
        label: 'علائم عمومی',
        key: 'general_symptoms',
        options: [
            { value: 'fever', label: 'تب و لرز' },
            { value: 'fatigue', label: 'اسهال و استفراغ' },
            { value: 'weight_loss', label: 'سر درد' },
            { value: 'appetite_loss', label: 'کاهش اشتها' },
            { value: 'night_sweats', label: 'تنگی نفس' },
            { value: 'general_pain', label: 'علائم سرماخوردگی' },
            { value: 'swollen_lymph_nodes', label: 'بدن درد' },
            { value: 'chills', label: 'دندان درد' },
            { value: 'malaise', label: 'نمیدونم مشکلم چیه!' },
            { value: 'other_general_symptom', label: 'سایر' },
        ],
    },
    {
        label: 'علائم عصبی',
        key: 'neurological_symptoms',
        options: [
            { value: 'headache', label: 'سردرد' },
            { value: 'dizziness', label: 'سرگیجه' },
            { value: 'seizures', label: 'تشنج' },
            { value: 'numbness', label: 'بی‌حسی' },
            { value: 'weakness', label: 'ضعف عضلانی' },
            { value: 'memory_loss', label: 'از دست دادن حافظه' },
            { value: 'speech_difficulty', label: 'مشکل در تکلم' },
            { value: 'vision_problems', label: 'مشکلات بینایی' },
            { value: 'migraine', label: 'میگرن' },
            { value: 'tremor', label: 'لرزش' },
        ],
    },
    {
        label: 'علائم قلبی عروقی',
        key: 'cardiovascular_symptoms',
        options: [
            { value: 'chest_pain', label: 'درد قفسه سینه' },
            { value: 'palpitations', label: 'تپش قلب' },
            { value: 'shortness_of_breath', label: 'تنگی نفس' },
            { value: 'swelling', label: 'ورم' },
            { value: 'high_blood_pressure', label: 'فشار خون بالا' },
            { value: 'fatigue', label: 'خستگی' },
            { value: 'fainting', label: 'غش کردن' },
            { value: 'irregular_heartbeat', label: 'ضربان قلب نامنظم' },
            { value: 'low_blood_pressure', label: 'فشار خون پایین' },
        ],
    },
    {
        label: 'علائم گوارشی',
        key: 'gastrointestinal_symptoms',
        options: [
            { value: 'nausea', label: 'حالت تهوع' },
            { value: 'vomiting', label: 'استفراغ' },
            { value: 'diarrhea', label: 'اسهال' },
            { value: 'constipation', label: 'یبوست' },
            { value: 'abdominal_pain', label: 'درد شکم' },
            { value: 'bloating', label: 'نفخ' },
            { value: 'heartburn', label: 'سوزش سر دل' },
            { value: 'loss_of_appetite', label: 'بی‌اشتهایی' },
            { value: 'indigestion', label: 'سوءهاضمه' },
        ],
    },
    {
        label: 'علائم تنفسی',
        key: 'respiratory_symptoms',
        options: [
            { value: 'cough', label: 'سرفه' },
            { value: 'shortness_of_breath', label: 'تنگی نفس' },
            { value: 'wheezing', label: 'خس خس سینه' },
            { value: 'chest_tightness', label: 'تنگی قفسه سینه' },
            { value: 'sore_throat', label: 'گلودرد' },
            { value: 'runny_nose', label: 'آبریزش بینی' },
            { value: 'fever', label: 'تب' },
            { value: 'sneezing', label: 'عطسه' },
            { value: 'difficulty_breathing', label: 'مشکل در تنفس' },
        ],
    },
];

// لیست انواع بیمه
const insuranceTypes = [
    { value: 'taamin_ejtemaei', label: 'بیمه تامین اجتماعی' },
    { value: 'salamat_urban', label: 'بیمه سلامت همگانی شهری' },
    { value: 'salamat_isargaran', label: 'بیمه سلامت همگانی ایثارگران' },
    { value: 'salamat_karkonan', label: 'بیمه سلامت کارکنان' },
    { value: 'salamat_roostaei', label: 'بیمه سلامت همگانی روستایی' },
    { value: 'naft_gas', label: 'بیمه شرکت نفت و گاز جمهوری اسلامی ایران' },
    { value: 'niro_mosallah', label: 'بیمه نیروهای مسلح' },
    { value: 'others', label: 'سایر' },
    { value: 'none', label: 'آزاد' },
];

function Visit() {
    const { token } = useContext(AuthContext);
    const [activeStep, setActiveStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        national_code: '',
        insurance_type: '',
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

        // ۱) ولیدیشن نام
        if (!formData.name.trim()) {
            toast.error('لطفا نام را وارد کنید.');
            return;
        }

        // ۲) ولیدیشن کد ملی
        if (!formData.national_code.trim()) {
            toast.error('لطفا کد ملی را وارد کنید.');
            return;
        }

        // کد ملی حتما باید عددی و ده رقمی باشد
        if (!/^[0-9]{10}$/.test(formData.national_code)) {
            toast.error('کد ملی باید عددی و ۱۰ رقمی باشد.');
            return;
        }

        // ۳) ولیدیشن نوع بیمه
        if (!formData.insurance_type.trim()) {
            toast.error('لطفا نوع بیمه را انتخاب کنید.');
            return;
        }

        // ۴) کاربر باید حداقل یکی از علائم عمومی را انتخاب کرده باشد
        if (!formData.general_symptoms) {
            toast.error('لطفا حداقل یکی از علائم عمومی را انتخاب کنید (حتی اگر گزینه «سایر» باشد).');
            return;
        }

        setLoading(true);
        try {
            // ساختن فیلد توضیحات نهایی با اضافه کردن کد ملی و نوع بیمه
            const finalDescription = `کد ملی: ${formData.national_code}
نوع بیمه: ${insuranceTypes.find((x) => x.value === formData.insurance_type)?.label || 'مشخص نشده'}
${formData.description}`;

            const payload = {
                ...formData,
                description: finalDescription,
            };

            const response = await axios.post(
                'https://api.medogram.ir/api/visit/',
                payload,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setFormData({
                name: '',
                national_code: '',
                insurance_type: '',
                urgency: 'prescription',
                general_symptoms: '',
                neurological_symptoms: '',
                cardiovascular_symptoms: '',
                gastrointestinal_symptoms: '',
                respiratory_symptoms: '',
                description: '',
            });
            setActiveStep(0);
            toast.success(`ویزیت برای ${response.data.name} با موفقیت ثبت شد.`);
        } catch (error) {
            console.error('Error creating visit:', error);
            if (error.response && error.response.status === 401) {
                toast.error('احراز هویت ناموفق بود! لطفا دوباره وارد شوید.');
            } else {
                toast.error('خطا در ثبت ویزیت.');
            }
        } finally {
            setLoading(false);
        }
    };

    // متدی برای رندر کردن محتوای هر مرحله از فرم
    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <>
                        <Typography variant="body1" sx={{ mb: 1, color: 'gray' }}>
                            لطفا اطلاعات بیمار را وارد کنید.
                        </Typography>
                        <TextField
                            label="نام کامل"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                            helperText="نام خود را وارد کنید."
                        />
                        <TextField
                            label="کد ملی"
                            name="national_code"
                            value={formData.national_code}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                            helperText="کد ملی ۱۰ رقمی خود را وارد کنید."
                        />
                        <TextField
                            select
                            label="نوع بیمه"
                            name="insurance_type"
                            value={formData.insurance_type}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                            helperText="لطفا نوع بیمه خود را انتخاب کنید."
                        >
                            <MenuItem value="">انتخاب کنید</MenuItem>
                            {insuranceTypes.map((ins) => (
                                <MenuItem key={ins.value} value={ins.value}>
                                    {ins.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            label="نوع ویزیت"
                            name="urgency"
                            value={formData.urgency}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            helperText="لطفا یکی از گزینه‌های مربوط به نوع ویزیت را انتخاب کنید."
                        >
                            <MenuItem value="prescription">نسخه نویسی داروهای شما</MenuItem>
                            <MenuItem value="diet">درخواست رژیم غذایی</MenuItem>
                            <MenuItem value="addiction">ترک اعتیاد</MenuItem>
                            <MenuItem value="online_consultation">مشاوره و ویزیت آنلاین</MenuItem>
                        </TextField>
                    </>
                );
            case 1:
                return (
                    <>
                        <Typography variant="body1" sx={{ mb: 1, color: 'gray' }}>
                            علائم عمومی و عصبی را وارد کنید. حتما حداقل یکی از علائم عمومی را انتخاب نمایید.
                        </Typography>
                        {symptomCategories.slice(0, 2).map((category) => (
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
                                <MenuItem value="">هیچ کدام</MenuItem>
                                {category.options.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        ))}
                    </>
                );
            case 2:
                return (
                    <>
                        <Typography variant="body1" sx={{ mb: 1, color: 'gray' }}>
                            علائم قلبی عروقی، گوارشی و تنفسی را وارد کنید (در صورت وجود).
                            همچنین می‌توانید در صورت نیاز، توضیحات اضافه وارد نمایید.
                        </Typography>
                        {symptomCategories.slice(2).map((category) => (
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
                                <MenuItem value="">هیچ کدام</MenuItem>
                                {category.options.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        ))}
                        <TextField
                            label="توضیحات اضافی"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={4}
                            margin="normal"
                            helperText="در صورت تمایل، توضیحات دلخواه خود را وارد کنید."
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
                    ثبت ویزیت جدید
                </Typography>
                <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                    <Step>
                        <StepLabel>اطلاعات بیمار</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>علائم (1/2)</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>علائم (2/2)</StepLabel>
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
                            بازگشت
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
                                'ثبت'
                            ) : (
                                'بعدی'
                            )}
                        </Button>
                    </Box>
                </Box>
            </Paper>
            <ToastContainer />
        </Box>
    );
}

export default Visit;