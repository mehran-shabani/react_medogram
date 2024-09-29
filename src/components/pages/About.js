import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AboutContainer = styled.div`
    padding: 4rem 2rem;
    text-align: center;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Title = styled(motion.h1)`
    font-size: 3rem;
    color: #2c3e50;
    margin-bottom: 2rem;
    font-weight: 700;
    letter-spacing: 2px;
`;

const Description = styled(motion.p)`
    font-size: 1.2rem;
    color: #34495e;
    max-width: 800px;
    margin: 0 auto 3rem;
    line-height: 1.8;
`;

const FeatureContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2rem;
    margin-top: 2rem;
`;

const FeatureCard = styled(motion.div)`
    background-color: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 250px;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
`;

const FeatureTitle = styled.h3`
    font-size: 1.4rem;
    color: #2c3e50;
    margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
    font-size: 1rem;
    color: #7f8c8d;
`;

const About = () => {
    return (
        <AboutContainer>
            <Title
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                درباره مدوگرام
            </Title>
            <Description
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                در مدوگرام، ما با استفاده از تکنولوژی‌های پیشرفته و الگوریتم‌های هوشمند، ارائه خدمات بهداشتی را متحول کرده‌ایم. ماموریت ما ارائه خدمات پزشکی با کیفیت به صورت آنلاین و تلفنی است تا مراقبت‌های بهداشتی با کیفیت برای همه افراد جامعه در دسترس باشد.
            </Description>
            <FeatureContainer>
                {[
                    { title: 'تکنولوژی پیشرفته', description: 'استفاده از هوش مصنوعی و الگوریتم‌های یادگیری ماشین برای تشخیص‌های دقیق.' },
                    { title: 'مراقبت مقرون‌به‌صرفه', description: 'کاهش هزینه‌ها برای دسترسی همگان به خدمات بهداشتی.' },
                    { title: 'دسترسی 24/7', description: 'دسترسی شبانه‌روزی به متخصصین پزشکی برای راحتی شما.' }
                ].map((feature, index) => (
                    <FeatureCard
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <FeatureTitle>{feature.title}</FeatureTitle>
                        <FeatureDescription>{feature.description}</FeatureDescription>
                    </FeatureCard>
                ))}
            </FeatureContainer>
        </AboutContainer>
    );
};

export default About;
