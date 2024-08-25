import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { VisitContainer, VisitForm, VisitInput, VisitSelect, VisitButton, VisitList, VisitItem } from '../../styles/Visit.styles';

const Visit = () => {
    const { token } = useContext(AuthContext);
    const [visits, setVisits] = useState([]);
    const [name, setName] = useState('');
    const [urgency, setUrgency] = useState('prescription');

    // Fetch existing visits
    useEffect(() => {
        if (token) {
            axios.get('http://127.0.0.1:8000/api/visit/', {
                headers: { Authorization: `Bearer ${token}` }
            }).then(response => {
                setVisits(response.data);
            }).catch(error => {
                console.error('Error fetching visits:', error);
            });
        }
    }, [token]);

    // Handle form submission to create a new visit
    const handleCreateVisit = () => {
        const visitData = { name, urgency };
        axios.post('http://127.0.0.1:8000/api/visit/', visitData, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
            setVisits([...visits, response.data]);
            setName('');
            setUrgency('prescription');
        }).catch(error => {
            console.error('Error creating visit:', error);
        });
    };

    return (
        <VisitContainer>
            <h2>ثبت ویزیت جدید</h2>
            <VisitForm>
                <VisitInput
                    type="text"
                    placeholder="نام ویزیت"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <VisitSelect
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value)}
                >
                    <option value="prescription">نسخه</option>
                    <option value="diet">رژیم</option>
                    <option value="addiction">اعتیاد</option>
                    <option value="online_consultation">مشاوره آنلاین</option>
                </VisitSelect>
                <VisitButton onClick={handleCreateVisit}>ثبت ویزیت</VisitButton>
            </VisitForm>

            <h2>لیست ویزیت‌ها</h2>
            <VisitList>
                {visits.map((visit) => (
                    <VisitItem key={visit.id}>
                        {visit.name} - {visit.urgency}
                    </VisitItem>
                ))}
            </VisitList>
        </VisitContainer>
    );
};

export default Visit;
