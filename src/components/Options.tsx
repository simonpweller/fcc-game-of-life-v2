import React from 'react';

type IOptions = {
    clear: () => void,
}

const Options: React.FC<IOptions> = ({clear}) => {
    return (
        <div data-testid='Options' className='options'>
            <button onClick={clear}>Clear</button>
        </div>
    );
};

export default Options;