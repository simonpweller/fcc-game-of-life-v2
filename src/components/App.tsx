import React, {useState} from 'react';
import GameBoard from "./GameBoard";
import Options from "./Options";
import GenerationCounter from "./GenerationCounter";

const App: React.FC = () => {
    const [cells, setCells] = useState(Array.from({length: 20 * 20}, (v, i) => ({alive: false, index: i})));

    const toggleCell = (i: number) => {
        const nextCells = cells.slice();
        nextCells[i] = {...nextCells[i], alive: !nextCells[i].alive};
        setCells(nextCells);
    };

    return (
        <>
            <h1>Game of Life</h1>
            <GameBoard cells={cells} onClick={toggleCell}/>
            <Options/>
            <GenerationCounter/>
        </>
    );
};

export default App;
