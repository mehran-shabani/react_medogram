// src/components/Chat/ChatSettings.js
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../Auth/AuthContext';
import { saveChatSettings } from './api';

// استایل‌ها
const SettingsContainer = styled.div`
    padding: 1rem;
    background: ${props => props.theme.botMessageBackground};
    border-radius: 10px;
    margin: 10px 20px;
`;
const InputField = styled.input`
    padding: 0.5rem;
    margin: 0.5rem 0;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
`;
const TextAreaField = styled.textarea`
    padding: 0.5rem;
    margin: 0.5rem 0;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: vertical;
`;
const SaveButton = styled.button`
    padding: 0.5rem 1rem;
    background: ${props => props.theme.sendButtonColor};
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background: ${props => props.theme.sendButtonHoverColor};
    }
`;

const ChatSettings = () => {
    const { token } = useContext(AuthContext);

    const [mode, setMode] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [treatmentOptions, setTreatmentOptions] = useState('');
    const [diagnosisOptions, setDiagnosisOptions] = useState('');
    const [wantsCause, setWantsCause] = useState(false);
    const [message, setMessage] = useState('');

    const handleSave = async () => {
        try {
            const payload = {
                mode,
                specialty,
                treatment_options: treatmentOptions.split(',').map(opt => opt.trim()),
                diagnosis_options: diagnosisOptions.split(',').map(opt => opt.trim()),
                wants_cause: wantsCause,
            };
            await saveChatSettings({ settings: payload, token });
            setMessage('تنظیمات با موفقیت ذخیره شد.');
        } catch (error) {
            console.error('خطا در ذخیره تنظیمات:', error);
            setMessage('خطا در ذخیره تنظیمات.');
        }
    };

    return (
        <SettingsContainer>
            <h3>تنظیمات چت تخصصی</h3>
            <InputField
                type="text"
                placeholder="حالت (مثلاً تخصصی)"
                value={mode}
                onChange={(e) => setMode(e.target.value)}
            />
            <InputField
                type="text"
                placeholder="تخصص"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
            />
            <TextAreaField
                placeholder="گزینه‌های درمان (با کاما جدا کنید)"
                value={treatmentOptions}
                onChange={(e) => setTreatmentOptions(e.target.value)}
                rows={3}
            />
            <TextAreaField
                placeholder="گزینه‌های تشخیص (با کاما جدا کنید)"
                value={diagnosisOptions}
                onChange={(e) => setDiagnosisOptions(e.target.value)}
                rows={3}
            />
            <label>
                <input
                    type="checkbox"
                    checked={wantsCause}
                    onChange={(e) => setWantsCause(e.target.checked)}
                />
                می‌خواهم دلیل بیماری را بدانم
            </label>
            <SaveButton onClick={handleSave}>ذخیره</SaveButton>
            {message && <p>{message}</p>}
        </SettingsContainer>
    );
};

export default ChatSettings;
