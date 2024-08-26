import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: #f5f5f5;
    padding: 2rem;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 1rem;
`;

const Description = styled.p`
    font-size: 1.2rem;
    color: #555;
    margin-bottom: 2rem;
    max-width: 800px;
`;

const VisitButton = styled(Link)`
    padding: 1rem 2rem;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 50px;
    font-size: 1.5rem;
    box-shadow: 0 0 20px #007bff;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.1);
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
