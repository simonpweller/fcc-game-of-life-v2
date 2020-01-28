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
});