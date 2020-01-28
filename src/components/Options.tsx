import React from 'react';

type IOptions = {
    clear: () => void,
    step: () => void,
    randomize: () => void,
}

const Options: React.FC<IOptions> = ({clear, step, randomize}) => {
    return (
        <div data-testid='Options' className='options'>
            <button onClick={step}>Step</button>
            <button onClick={randomize}>Randomize</button>
            <button onClick={clear}>Clear</button>
        </div>
    );
};

export default Options;