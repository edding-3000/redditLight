import React, { useState, useEffect } from 'react';

const Countdown = ({ duration }) => {
    const [remainingTime, setRemainingTime] = useState(duration);

    // Funktion zum Umwandeln von Millisekunden in mm:ss
    const msToMinutesSeconds = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime((prevTime) => {
                if (prevTime <= 1000) {
                    clearInterval(interval);
                    return 0;
                }
                return prevTime - 1000;
            });
        }, 1000);

        // Cleanup-Function, um den Interval zu löschen, wenn die Komponente unmountet wird
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {remainingTime > 0 ? msToMinutesSeconds(remainingTime) : '0'}
        </>
    );
};

export default Countdown;
