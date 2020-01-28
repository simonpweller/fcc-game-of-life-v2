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

        it(`should start with a GenerationCounter of 0`, () => {
            const {getByTestId} = render(<App/>);
            expect(getByTestId('GenerationCounter').textContent).toBe('Generation 0')
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

    describe(`stepping forward a generation`, () => {
        it(`should increase the GenerationCounter`, () => {
            const {getByTestId, getByText} = render(<App/>);
            const generationCounter = getByTestId('GenerationCounter');
            expect(generationCounter.textContent).toBe('Generation 0');
            getByText('Step').click();
            expect(generationCounter.textContent).toBe('Generation 1');
        });

        describe(`state transitions`, () => {
            test(`Any live cell with fewer than two live neighbours dies, as if by underpopulation.`, () => {
                const {getAllByTestId, getByText} = render(<App/>);
                const cells = getAllByTestId('cell');
                cells[getIndex(1, 10)].click();
                expect(cells[getIndex(1, 10)]).toHaveClass('cell cell_alive');
                getByText('Step').click();
                expect(cells[getIndex(1, 10)]).toHaveClass('cell cell_dead');
            });

            test(`Any live cell with two or three live neighbours lives on to the next generation.`, () => {
                const {getAllByTestId, getByText} = render(<App/>);
                const cells = getAllByTestId('cell');
                cells[getIndex(1, 9)].click();
                cells[getIndex(1, 10)].click();
                cells[getIndex(1, 11)].click();
                getByText('Step').click();
                expect(cells[getIndex(1, 10)]).toHaveClass('cell cell_alive');
            });

            test(`Any live cell with more than three live neighbours dies, as if by overpopulation.`, () => {
                const {getAllByTestId, getByText} = render(<App/>);
                const cells = getAllByTestId('cell');
                cells[getIndex(1, 9)].click();
                cells[getIndex(1, 10)].click();
                cells[getIndex(1, 11)].click();
                cells[getIndex(0, 10)].click();
                cells[getIndex(2, 10)].click();
                getByText('Step').click();
                expect(cells[getIndex(1, 10)]).toHaveClass('cell cell_dead');
            });

            test(`Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.`, () => {
                const {getAllByTestId, getByText} = render(<App/>);
                const cells = getAllByTestId('cell');
                cells[getIndex(1, 9)].click();
                cells[getIndex(1, 11)].click();
                cells[getIndex(0, 10)].click();
                getByText('Step').click();
                expect(cells[getIndex(1, 10)]).toHaveClass('cell cell_alive');
            });

            test(`All other dead cells stay dead`, () => {
                const {getAllByTestId, getByText} = render(<App/>);
                const cells = getAllByTestId('cell');
                cells[getIndex(1, 9)].click();
                cells[getIndex(1, 11)].click();
                getByText('Step').click();
                expect(cells[getIndex(1, 10)]).toHaveClass('cell cell_dead');
            });
        });

        function getIndex(row: number, col: number) {
            return row * 20 + col;
        }
    });

    describe(`clearing the board`, () => {
        it(`should clear the board`, () => {
            const {getAllByTestId, getByText} = render(<App/>);
            const cell = getAllByTestId('cell')[20];
            cell.click();
            expect(cell).toHaveClass('cell cell_alive');
            getByText('Clear').click();
            expect(cell).toHaveClass('cell cell_dead');
        });

        it(`should reset the generation counter`, () => {
            const {getByTestId, getByText} = render(<App/>);
            const generationCounter = getByTestId('GenerationCounter');
            getByText('Step').click();
            expect(generationCounter.textContent).toBe('Generation 1');
            getByText('Clear').click();
            expect(generationCounter.textContent).toBe('Generation 0');
        });
    });

    describe(`randomizing the board`, () => {
        it(`should set some cells to alive and some to dead`, () => {
            const {getAllByTestId, getByText} = render(<App/>);
            const cells = getAllByTestId('cell');
            getByText('Randomize').click();
            expect(cells.some(cell => cell.className === 'cell cell_alive')).toBe(true);
            expect(cells.some(cell => cell.className === 'cell cell_dead')).toBe(true);
        });
    });
});