import React, { useEffect } from 'react';
import '../styles.css';

const Timer = ({ timeLeft, setTimeLeft, handleTimeUp }) => {
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            handleTimeUp();
        }
    }, [timeLeft, setTimeLeft, handleTimeUp]);

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    return <div className="timer">Time left: {formatTime(timeLeft)}</div>;
};

export default Timer;
