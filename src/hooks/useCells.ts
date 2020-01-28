import {useState} from "react";
import {Cell} from "../types";

type signature = () => {
    cells: Cell[],
    toggleCell: (i: number) => void,
    generation: number,
    clear: () => void,
    step: () => void,
}

export const useCells: signature = () => {
    const WIDTH = 20;
    const HEIGHT = 20;

    const createInitialState = () => Array.from({length: WIDTH * HEIGHT}, (v, i) => ({
        index: i,
        alive: false,
        aliveNext: false,
    }));

    const [cells, setCells] = useState(createInitialState());
    const [generation, setGeneration] = useState(0);

    const toggleCell = (i: number) => {
        const nextCells = cells.slice();
        nextCells[i] = {...nextCells[i], alive: !nextCells[i].alive};
        setCells(nextCells);
    };

    const aliveNeighbours: (cells: Cell[], index: number) => number = (cells, index) => {
        const col = index % WIDTH;
        const row = Math.floor(index / WIDTH);

        const cols = col === 0 ? [0, 1] : col + 1 < WIDTH ? [col - 1, col, col + 1] : [col - 1, col];
        const rows = row === 0 ? [0, 1] : row + 1 < HEIGHT ? [row - 1, row, row + 1] : [row - 1, row];

        const neighbours: number[] = [];
        rows.forEach(r => {
            cols.forEach( c => {
                const neighborIndex = c + r * WIDTH;
                if(neighborIndex !== index) {
                    neighbours.push(neighborIndex);
                }
            });
        });

        return neighbours.filter(index => cells[index].alive).length
    };

    const step = () => {
        const nextCells = cells
            .map((cell, index) => ({...cell, aliveNext: aliveNeighbours(cells, index) >= 2 && aliveNeighbours(cells, index) <= 3}))
            .map(cell => ({...cell, alive: cell.aliveNext}));

        setCells(nextCells);
        setGeneration(generation + 1);
    };

    const clear = () => {
        setCells(createInitialState());
        setGeneration(0);
    };

    return {cells, toggleCell, generation, clear, step}
};