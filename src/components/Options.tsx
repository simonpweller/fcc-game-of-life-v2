import React from 'react';

type IOptions = {
    clear: () => void,
    step: () => void,
}

const Options: React.FC<IOptions> = ({clear, step}) => {
    return (
        <div data-testid='Options' className='options'>
            <button onClick={step}>Step</button>
            <button onClick={clear}>Clear</button>
        </div>
    );
};

export default Options;