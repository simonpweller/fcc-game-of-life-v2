import React from 'react';

type IGenerationCounter = {
    generation: number,
}

const GenerationCounter: React.FC<IGenerationCounter> = ({generation}) => {
    return (
        <div data-testid='GenerationCounter' className='generations'>
            Generation {generation}
        </div>
    );
};

export default GenerationCounter;