import {useState} from "react";
import {Cell} from "../types";

export const useCells: () => {cells: Cell[], toggleCell: (i: number) => void, clear: () => void} = () => {
    const createInitialState = () => Array.from({length: 20 * 20}, (v, i) => ({alive: false, index: i}));

    const [cells, setCells] = useState(createInitialState());

    const toggleCell = (i: number) => {
        const nextCells = cells.slice();
        nextCells[i] = {...nextCells[i], alive: !nextCells[i].alive};
        setCells(nextCells);
    };

    const clear = () => setCells(createInitialState());

    return {cells, toggleCell, clear}
};