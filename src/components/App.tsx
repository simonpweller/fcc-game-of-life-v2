import React from 'react';
import GameBoard from "./GameBoard";
import Options from "./Options";
import GenerationCounter from "./GenerationCounter";
import {useCells} from "../hooks/useCells";

const App: React.FC = () => {
    const {cells, toggleCell} = useCells();

    return (
        <>
            <h1>Game of Life</h1>
            <GameBoard cells={cells} onClickCell={toggleCell}/>
            <Options/>
            <GenerationCounter/>
        </>
    );
};

export default App;
