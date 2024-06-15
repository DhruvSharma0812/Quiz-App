import React from 'react';
import '../styles.css';

const Question = ({ questionData, handleAnswer }) => {
    return (
        <div className="container">
            <h2>{questionData.question}</h2>
            <ul>
                {questionData.choices.map((choice, index) => (
                    <li key={index} onClick={() => handleAnswer(choice)}>
                        {choice}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Question;
