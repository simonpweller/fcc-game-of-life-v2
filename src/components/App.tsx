import React from 'react';
import GameBoard from "./GameBoard";
import Options from "./Options";
import GenerationCounter from "./GenerationCounter";

const App: React.FC = () => {
    return (
        <>
            <h1>Game of Life</h1>
            <GameBoard/>
            <Options/>
            <GenerationCounter/>
        </>
    );
};

export default App;
