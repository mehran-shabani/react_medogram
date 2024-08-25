import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { UserVisitsContainer, VisitItem } from '../../styles/UserVisits.styles';

const UserVisitsPage = () => {
    const { token } = useContext(AuthContext);
    const [visits, setVisits] = useState([]);

    useEffect(() => {
        if (token) {
            axios.get('http://127.0.0.1:8000/api/user-visits/', {
                headers: { Authorization: `Bearer ${token}` }
            }).then(response => {
                setVisits(response.data);
            });
        }
    }, [token]);

    return (
        <UserVisitsContainer>
            <h1>ویزیت‌های شما</h1>
            <ul>
                {visits.map(visit => (
                    <VisitItem key={visit.id}>{visit.name} - {visit.urgency}</VisitItem>
                ))}
            </ul>
        </UserVisitsContainer>
    );
};

export default UserVisitsPage;
