import React from 'react';
import styles from './GameBoard.module.css';
import {Cell} from "../types";

export type IGameBoard = {
    onClick: (i: number) => void,
    cells: Cell[]
}

const GameBoard: React.FC<IGameBoard> = ({cells, onClick}) => {
    return (
        <div data-testid='Gameboard' className={styles.board}>
            {cells.map(cell =>
                <div
                    key={cell.index}
                    className={[styles.cell, cell.alive ? styles.cell_alive : styles.cell_dead].join(' ')}
                    data-testid="cell"
                    onClick={() => onClick(cell.index)}
                />
            )}
        </div>
    );
};

export default GameBoard;