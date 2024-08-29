import React from 'react';
import Visit from '../Visit/Visit';

const VisitPage = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '130vh',
            backgroundColor: '#e0f7fa',
        }}>
            <Visit />
        </div>
    );
};

export default VisitPage;
