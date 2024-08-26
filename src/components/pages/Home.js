import React from 'react';
import { moveUp,  HomeContainer, Title, Description } from '../../styles/Home.Styles';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const VisitButton = styled(Link)`
    padding: 1rem 2rem;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 50px;
    font-size: 1.5rem;
    box-shadow: 0 0 20px rgba(0, 123, 255, 0.7);
    transition: all 0.3s ease;
    animation: ${moveUp} 2s ease-in-out;

    &:hover {
        transform: scale(1.1);
        box-shadow: 0 0 30px rgba(0, 123, 255, 1);
    }
`;

const Home = () => {
    return (
        <HomeContainer>
            <Title>به مدوگرام خوش آمدید</Title>
            <Description>
                در مدوگرام، ما به دنبال ارائه بهترین خدمات پزشکی و مراقبت‌های بالینی به صورت آنلاین و تلفنی هستیم که به راحتی در هر مکان قابل دسترسی باشد. با تکیه بر دانش پیشرفته و بهره‌گیری از هوش مصنوعی، ما تغییرات بنیادی در پروسه‌های تشخیصی، درمانی و کمک پزشکی ایجاد کرده‌ایم تا جمعیت‌های بیشتری بتوانند با هزینه‌های کمتر، از جدیدترین و مدرن‌ترین روش‌های درمانی و تشخیصی بهره‌مند شوند.
            </Description>
            <Description>
                خدمات ما شامل ارزیابی دقیق و شخصی‌سازی شده برای هر بیمار، استفاده از تکنولوژی‌های روز در تشخیص و درمان، و نظارت مستمر بر فرآیندهای درمانی است. با استفاده از هوش مصنوعی، ما می‌توانیم پروسه‌های درمانی را بهینه‌سازی کنیم و خدماتی با کیفیت بالا و در کمترین زمان ممکن ارائه دهیم.
            </Description>
            <Description>
                ما به دنبال این هستیم که با کاهش هزینه‌ها و استفاده از تکنولوژی‌های نوین، دسترسی به خدمات پزشکی پیشرفته را برای همه افراد جامعه فراهم کنیم. با مدوگرام، شما می‌توانید اطمینان داشته باشید که بهترین مراقبت‌های پزشکی را به صورت آنلاین دریافت خواهید کرد.
            </Description>
            <VisitButton to="/visits">ثبت ویزیت</VisitButton>
        </HomeContainer>
    );
};

export default Home;
