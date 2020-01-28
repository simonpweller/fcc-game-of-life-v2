import React from 'react';
import {Cell} from '../types';

export type IGameBoard = {
    onClickCell: (i: number) => void,
    cells: Cell[]
}

const GameBoard: React.FC<IGameBoard> = ({cells, onClickCell}) => {
    return (
        <div data-testid='Gameboard' className='board'>
            {cells.map(cell =>
                <div
                    key={cell.index}
                    className={`cell ${cell.alive ? 'cell_alive' : 'cell_dead'}`}
                    data-testid='cell'
                    onClick={() => onClickCell(cell.index)}
                />
            )}
        </div>
    );
};

export default GameBoard;