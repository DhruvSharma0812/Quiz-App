import React, { useState, useEffect } from 'react';
import Question from './Question';
import Timer from './Timer';
import FullScreenPrompt from './FullScreenPrompt';
import questions from '../data/questions';
import '../styles.css';

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
    const [isFullScreen, setIsFullScreen] = useState(document.fullscreenElement != null);

    useEffect(() => {
        const savedQuestion = localStorage.getItem('currentQuestion');
        const savedTime = localStorage.getItem('timeLeft');

        if (savedQuestion) setCurrentQuestion(parseInt(savedQuestion, 10));
        if (savedTime) setTimeLeft(parseInt(savedTime, 10));
    }, []);

    useEffect(() => {
        localStorage.setItem('currentQuestion', currentQuestion);
        localStorage.setItem('timeLeft', timeLeft);
    }, [currentQuestion, timeLeft]);

    const handleAnswer = (choice) => {
        if (choice === questions[currentQuestion].answer) {
            setScore(score + 1);
        }
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            alert(`Quiz finished! Your score is ${score + 1}/${questions.length}`);
        }
    };

    const handleTimeUp = () => {
        alert(`Time's up! Your score is ${score}/${questions.length}`);
    };

    const handleFullScreen = () => {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().catch((err) => {
                alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        }
    };

    const fullscreenChange = () => {
        setIsFullScreen(document.fullscreenElement != null);
    };

    useEffect(() => {
        document.addEventListener('fullscreenchange', fullscreenChange);
        return () => document.removeEventListener('fullscreenchange', fullscreenChange);
    }, []);

    if (!isFullScreen) {
        return <FullScreenPrompt handleFullScreen={handleFullScreen} />;
    }

    return (
        <div id="root">
            <div className="container">
                <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} handleTimeUp={handleTimeUp} />
                <Question 
                    questionData={questions[currentQuestion]} 
                    handleAnswer={handleAnswer} 
                />
            </div>
        </div>
    );
};

export default Quiz;
