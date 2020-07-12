import React from 'react';
import './progress.css';

const Progress = ({ progress }: { progress: any }) => {
    return (
        <div className="ProgressBar">
            <div className="Progress" style={{ width: progress + '%' }} />
        </div>
    );
};

export default Progress;
