import {useState} from "react";
import {Cell} from "../types";

export const useCells: () => {cells: Cell[], toggleCell: (i: number) => void} = () => {
    const [cells, setCells] = useState(Array.from({length: 20 * 20}, (v, i) => ({alive: false, index: i})));

    const toggleCell = (i: number) => {
        const nextCells = cells.slice();
        nextCells[i] = {...nextCells[i], alive: !nextCells[i].alive};
        setCells(nextCells);
    };

    return {cells, toggleCell}
};