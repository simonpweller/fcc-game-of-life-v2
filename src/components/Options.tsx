import React from 'react';

type IOptions = {
    clear: () => void,
    step: () => void,
    startStop: () => void,
    started: boolean,
    randomize: () => void,
}

const Options: React.FC<IOptions> = ({clear, step, startStop, randomize, started}) => {
    return (
        <div data-testid='Options' className='options'>
            <button onClick={step}>Step</button>
            <button onClick={startStop}>{started ? 'Stop' : 'Start'}</button>
            <button onClick={randomize}>Randomize</button>
            <button onClick={clear}>Clear</button>
        </div>
    );
};

export default Options;