import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>به مدوگرام خوش آمدید</h1>
            <p>یک سیستم جامع برای مدیریت ویزیت‌ها و اشتراک‌های پزشکی</p>
            <nav>
                <ul>
                    <li><Link to="/login">ورود</Link></li>
                    <li><Link to="/subscriptions">اشتراک‌ها</Link></li>
                    <li><Link to="/visits">ویزیت‌ها</Link></li>
                    <li><Link to="/user-visits">ویزیت‌های شما</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Home;
