// data/symptomData.js

// لیست انواع علائم در گروه‌های مختلف
export const symptomCategories = [
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
            { value: 'malaise', label: 'سایر' },
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
export const insuranceTypes = [
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
