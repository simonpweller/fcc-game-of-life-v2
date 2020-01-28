import React from 'react';
import styles from './Options.module.css';

type IOptions = {
    clear: () => void,
}

const Options: React.FC<IOptions> = ({clear}) => {
    return (
        <div data-testid='Options' className={styles.options}>
            <button onClick={clear}>Clear</button>
        </div>
    );
};

export default Options;