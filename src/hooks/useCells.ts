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
    const createInitialState = () => Array.from({length: 20 * 20}, (v, i) => ({alive: false, index: i}));

    const [cells, setCells] = useState(createInitialState());
    const [generation, setGeneration] = useState(0);

    const toggleCell = (i: number) => {
        const nextCells = cells.slice();
        nextCells[i] = {...nextCells[i], alive: !nextCells[i].alive};
        setCells(nextCells);
    };

    const step = () => setGeneration(generation + 1);

    const clear = () => {
        setCells(createInitialState());
        setGeneration(0);
    };

    return {cells, toggleCell, generation, clear, step}
};