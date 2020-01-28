import {render} from '@testing-library/react'
import App from "./App";
import React from "react";

describe(`App`, () => {
    it(`it should show 'Game of Life' as a heading`, () => {
        const {getByText} = render(<App/>);
        expect(getByText('Game of Life')).toBeInTheDocument()
    });

    it(`it should render the Gameboard, options and generation counter`, () => {
        const {getByTestId} = render(<App/>);
        expect(getByTestId('Gameboard')).toBeInTheDocument();
        expect(getByTestId('Options')).toBeInTheDocument();
        expect(getByTestId('GenerationCounter')).toBeInTheDocument();
    });

    describe('initial state', () => {
        it('should render 20 x 20 dead cells', () => {
            const {getAllByTestId} = render(<App/>);
            const cells = getAllByTestId('cell');
            expect(cells.length).toEqual(20 * 20);
            cells.forEach(cell => expect(cell).toHaveClass('cell cell_dead'))
        });
    });

    describe(`clicking a cell`, () => {
        it(`should toggle a cell from dead to alive and back`, () => {
            const {getAllByTestId} = render(<App/>);
            const cell = getAllByTestId('cell')[0];
            expect(cell).toHaveClass('cell cell_dead');
            cell.click();
            expect(cell).toHaveClass('cell cell_alive');
            cell.click();
            expect(cell).toHaveClass('cell cell_dead');
        });
    });

    describe(`clearing the board`, () => {
        test(`clicking the 'Clear' button should clear the board`, () => {
            const {getAllByTestId, getByText} = render(<App/>);
            const cell = getAllByTestId('cell')[20];
            cell.click();
            expect(cell).toHaveClass('cell cell_alive');
            getByText('Clear').click();
            expect(cell).toHaveClass('cell cell_dead');
        });
    });
});