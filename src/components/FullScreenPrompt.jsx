import React from 'react';
import '../styles.css';

const FullScreenPrompt = ({ handleFullScreen }) => {
    return (
        <div className="fullscreen-prompt">
            <h2>Please enable full screen mode to start the quiz.</h2>
            <button onClick={handleFullScreen}>Enable Full Screen</button>
        </div>
    );
};

export default FullScreenPrompt;
