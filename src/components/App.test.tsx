import {render} from '@testing-library/react'
import App from "./App";
import React from "react";

describe(`App`, () => {
    test(`it should show 'Game of Life' as a heading`, () => {
        const {getByText} = render(<App/>);
        expect(getByText('Game of Life')).toBeInTheDocument()
    });

    test(`it should render the Gameboard, options and generation counter`, () => {
        const {getByTestId} = render(<App/>);
        expect(getByTestId('Gameboard')).toBeInTheDocument();
        expect(getByTestId('Options')).toBeInTheDocument();
        expect(getByTestId('GenerationCounter')).toBeInTheDocument();
    });
});