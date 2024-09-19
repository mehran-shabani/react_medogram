import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #e0f7fa 0%, #80deea 100%);
  padding: 2rem;
`;

const ContentWrapper = styled(motion.div)`
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #00838f;
  margin-bottom: 2rem;
  text-align: center;
`;

const VisitList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const VisitItem = styled(motion.li)`
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const VisitName = styled.span`
  font-size: 1.2rem;
  color: #333;
`;

const VisitUrgency = styled.span`
  font-size: 1rem;
  color: white;
  background-color: ${props => {
    switch (props.urgency) {
        case 'High':
            return '#ff4d4d';
        case 'Medium':
            return '#ffa64d';
        default:
            return '#4da6ff';
    }
}};
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
`;

const NoVisitsMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
`;

const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 20px auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const UserVisitsPage = () => {
    const { token } = useContext(AuthContext);
    const [visits, setVisits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            setLoading(true);
            axios.get('http://127.0.0.1:8000/api/user-visits/', {
                headers: { Authorization: `Bearer ${token}` }
            }).then(response => {
                setVisits(response.data);
                setLoading(false);
            }).catch(error => {
                console.error('Error fetching visits:', error);
                setLoading(false);
            });
        }
    }, [token]);

    return (
        <PageContainer>
            <ContentWrapper
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Title>Your Visits</Title>
                {loading ? (
                    <LoadingSpinner />
                ) : visits.length > 0 ? (
                    <VisitList>
                        <AnimatePresence>
                            {visits.map(visit => (
                                <VisitItem
                                    key={visit.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <VisitName>{visit.name}</VisitName>
                                    <VisitUrgency urgency={visit.urgency}>{visit.urgency}</VisitUrgency>
                                </VisitItem>
                            ))}
                        </AnimatePresence>
                    </VisitList>
                ) : (
                    <NoVisitsMessage>You have no scheduled visits.</NoVisitsMessage>
                )}
            </ContentWrapper>
        </PageContainer>
    );
};

export default UserVisitsPage;
