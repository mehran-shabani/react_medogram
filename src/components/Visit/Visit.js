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
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Visit = () => {
    const { token } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [urgency, setUrgency] = useState('prescription');
    const [generalSymptoms, setGeneralSymptoms] = useState('');
    const [neurologicalSymptoms, setNeurologicalSymptoms] = useState('');
    const [cardiovascularSymptoms, setCardiovascularSymptoms] = useState('');
    const [gastrointestinalSymptoms, setGastrointestinalSymptoms] = useState('');
    const [respiratorySymptoms, setRespiratorySymptoms] = useState('');
    const [musculoskeletalSymptoms, setMusculoskeletalSymptoms] = useState('');
    const [dermatologicalSymptoms, setDermatologicalSymptoms] = useState('');
    const [description, setDescription] = useState('');
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true); // فعال کردن انیمیشن محو شدن
    }, []);

    const handleCreateVisit = () => {
        if (!name.trim()) {
            toast.error('نام و نام خانوادگی بیمار را وارد کنید.');
            return;
        }

        if (
            !generalSymptoms &&
            !neurologicalSymptoms &&
            !cardiovascularSymptoms &&
            !gastrointestinalSymptoms &&
            !respiratorySymptoms &&
            !musculoskeletalSymptoms &&
            !dermatologicalSymptoms
        ) {
            toast.error('لطفا حداقل یک علائم را انتخاب کنید.');
            return;
        }

        const visitData = {
            name,
            urgency,
            general_symptoms: generalSymptoms,
            neurological_symptoms: neurologicalSymptoms,
            cardiovascular_symptoms: cardiovascularSymptoms,
            gastrointestinal_symptoms: gastrointestinalSymptoms,
            respiratory_symptoms: respiratorySymptoms,
            musculoskeletal_symptoms: musculoskeletalSymptoms,
            dermatological_symptoms: dermatologicalSymptoms,
            description,
        };

        axios.post('http://127.0.0.1:8000/api/visit/', visitData, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
            // Reset form fields after successful submission
            setName('');
            setUrgency('prescription');
            setGeneralSymptoms('');
            setNeurologicalSymptoms('');
            setCardiovascularSymptoms('');
            setGastrointestinalSymptoms('');
            setRespiratorySymptoms('');
            setMusculoskeletalSymptoms('');
            setDermatologicalSymptoms('');
            setDescription('');

            // نمایش اطلاعات ویزیت ثبت شده
            toast.success(`ویزیت برای ${response.data.name} با موفقیت ثبت شد.`);
        }).catch(error => {
            console.error('Error creating visit:', error);

            if (error.response && error.response.status === 401) {
                // Handling authentication error
                toast.error('عدم احراز هویت! لطفاً مجدداً وارد شوید.');
            } else {
                toast.error('خطا در ثبت ویزیت.');
            }
        });
    };

    return (
        <>
            <Paper
                elevation={3}
                sx={{
                    padding: 2, // کاهش padding برای جمع‌وجورتر شدن فرم
                    width: '90%', // کاهش عرض فرم
                    maxWidth: 350, // حداکثر عرض فرم
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
                    backgroundColor: '#ffffff',
                    borderRadius: 4, // گوشه‌های گردتر
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // سایه کمی قوی‌تر
                }}
            >
                <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', mb: 2 }}>
                    ثبت ویزیت جدید
                </Typography>
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <TextField
                        label="نام و نام خانوادگی"
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <TextField
                        select
                        label="نوع ویزیت"
                        variant="outlined"
                        fullWidth
                        value={urgency}
                        onChange={(e) => setUrgency(e.target.value)}
                    >
                        <MenuItem value="prescription">نسخه نویسی داروهای پر مصرف</MenuItem>
                        <MenuItem value="diet">رژیم درمانی</MenuItem>
                        <MenuItem value="addiction">ترک اعتیاد</MenuItem>
                        <MenuItem value="online_consultation">ویزیت و مشاوره آنلاین</MenuItem>
                    </TextField>

                    <TextField
                        select
                        label="علائم عمومی"
                        variant="outlined"
                        fullWidth
                        value={generalSymptoms}
                        onChange={(e) => setGeneralSymptoms(e.target.value)}
                    >
                        <MenuItem value="fever">تب</MenuItem>
                        <MenuItem value="fatigue">خستگی</MenuItem>
                        <MenuItem value="weight_loss">کاهش وزن</MenuItem>
                        <MenuItem value="appetite_loss">کاهش اشتها</MenuItem>
                        <MenuItem value="night_sweats">تعریق شبانه</MenuItem>
                        <MenuItem value="general_pain">درد عمومی</MenuItem>
                        <MenuItem value="swollen_lymph_nodes">تورم غدد لنفاوی</MenuItem>
                        <MenuItem value="chills">لرز</MenuItem>
                        <MenuItem value="malaise">احساس ناخوشی عمومی</MenuItem>
                    </TextField>

                    <TextField
                        select
                        label="علائم نورولوژیکی"
                        variant="outlined"
                        fullWidth
                        value={neurologicalSymptoms}
                        onChange={(e) => setNeurologicalSymptoms(e.target.value)}
                    >
                        <MenuItem value="headache">سردرد</MenuItem>
                        <MenuItem value="dizziness">سرگیجه</MenuItem>
                        <MenuItem value="seizures">تشنج</MenuItem>
                        <MenuItem value="numbness">بی‌حسی</MenuItem>
                        <MenuItem value="weakness">ضعف عضلانی</MenuItem>
                        <MenuItem value="memory_loss">از دست دادن حافظه</MenuItem>
                        <MenuItem value="speech_difficulty">مشکل در تکلم</MenuItem>
                        <MenuItem value="vision_problems">مشکلات بینایی</MenuItem>
                        <MenuItem value="migraine">میگرن</MenuItem>
                        <MenuItem value="tremor">لرزش</MenuItem>
                    </TextField>

                    <TextField
                        select
                        label="علائم قلبی عروقی"
                        variant="outlined"
                        fullWidth
                        value={cardiovascularSymptoms}
                        onChange={(e) => setCardiovascularSymptoms(e.target.value)}
                    >
                        <MenuItem value="chest_pain">درد قفسه سینه</MenuItem>
                        <MenuItem value="palpitations">تپش قلب</MenuItem>
                        <MenuItem value="shortness_of_breath">تنگی نفس</MenuItem>
                        <MenuItem value="swelling">تورم</MenuItem>
                        <MenuItem value="high_blood_pressure">فشار خون بالا</MenuItem>
                        <MenuItem value="fatigue">خستگی</MenuItem>
                        <MenuItem value="fainting">غش کردن</MenuItem>
                        <MenuItem value="irregular_heartbeat">ضربان قلب نامنظم</MenuItem>
                        <MenuItem value="low_blood_pressure">فشار خون پایین</MenuItem>
                    </TextField>

                    <TextField
                        select
                        label="علائم گوارشی"
                        variant="outlined"
                        fullWidth
                        value={gastrointestinalSymptoms}
                        onChange={(e) => setGastrointestinalSymptoms(e.target.value)}
                    >
                        <MenuItem value="nausea">حالت تهوع</MenuItem>
                        <MenuItem value="vomiting">استفراغ</MenuItem>
                        <MenuItem value="diarrhea">اسهال</MenuItem>
                        <MenuItem value="constipation">یبوست</MenuItem>
                        <MenuItem value="abdominal_pain">درد شکم</MenuItem>
                        <MenuItem value="bloating">نفخ</MenuItem>
                        <MenuItem value="heartburn">سوزش سر دل</MenuItem>
                        <MenuItem value="loss_of_appetite">بی‌اشتهایی</MenuItem>
                        <MenuItem value="indigestion">سوء هاضمه</MenuItem>
                    </TextField>

                    <TextField
                        select
                        label="علائم تنفسی"
                        variant="outlined"
                        fullWidth
                        value={respiratorySymptoms}
                        onChange={(e) => setRespiratorySymptoms(e.target.value)}
                    >
                        <MenuItem value="cough">سرفه</MenuItem>
                        <MenuItem value="shortness_of_breath">تنگی نفس</MenuItem>
                        <MenuItem value="wheezing">خس خس سینه</MenuItem>
                        <MenuItem value="chest_tightness">سفتی قفسه سینه</MenuItem>
                        <MenuItem value="sore_throat">گلودرد</MenuItem>
                        <MenuItem value="runny_nose">آبریزش بینی</MenuItem>
                        <MenuItem value="fever">تب</MenuItem>
                        <MenuItem value="sneezing">عطسه</MenuItem>
                        <MenuItem value="difficulty_breathing">مشکل در تنفس</MenuItem>
                    </TextField>

                    <TextField
                        select
                        label="علائم عضلانی-اسکلتی"
                        variant="outlined"
                        fullWidth
                        value={musculoskeletalSymptoms}
                        onChange={(e) => setMusculoskeletalSymptoms(e.target.value)}
                    >
                        <MenuItem value="joint_pain">درد مفاصل</MenuItem>
                        <MenuItem value="muscle_pain">درد عضلانی</MenuItem>
                        <MenuItem value="back_pain">درد کمر</MenuItem>
                        <MenuItem value="stiffness">خشکی مفاصل</MenuItem>
                        <MenuItem value="swelling">تورم</MenuItem>
                        <MenuItem value="muscle_weakness">ضعف عضلانی</MenuItem>
                        <MenuItem value="cramps">گرفتگی عضلانی</MenuItem>
                        <MenuItem value="bone_pain">درد استخوان</MenuItem>
                        <MenuItem value="joint_swelling">تورم مفاصل</MenuItem>
                    </TextField>

                    <TextField
                        select
                        label="علائم پوستی"
                        variant="outlined"
                        fullWidth
                        value={dermatologicalSymptoms}
                        onChange={(e) => setDermatologicalSymptoms(e.target.value)}
                    >
                        <MenuItem value="rash">جوش</MenuItem>
                        <MenuItem value="itching">خارش</MenuItem>
                        <MenuItem value="dry_skin">خشکی پوست</MenuItem>
                        <MenuItem value="redness">قرمزی</MenuItem>
                        <MenuItem value="swelling">تورم</MenuItem>
                        <MenuItem value="blisters">تاول</MenuItem>
                        <MenuItem value="skin_peeling">پوسته پوسته شدن پوست</MenuItem>
                        <MenuItem value="acne">آکنه</MenuItem>
                        <MenuItem value="bruising">کبودی</MenuItem>
                    </TextField>

                    <TextField
                        label="توضیحات"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={3} // کاهش تعداد سطرها برای جمع‌وجورتر شدن فرم
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleCreateVisit}
                        sx={{ mt: 2 }}
                    >
                        ثبت ویزیت
                    </Button>
                </Box>
            </Paper>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
        </>
    );
};

export default Visit;
