import React from 'react';
import {render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe("Test a Força", () => {  
  test("testa inputs", () => {
    render(<App />)
    expect(screen.getByTestId('name-filter')).toBeInTheDocument()
    expect(screen.getByTestId('column-filter')).toBeInTheDocument()
    expect(screen.getByTestId('comparison-filter')).toBeInTheDocument()
    expect(screen.getByTestId('value-filter')).toBeInTheDocument()
    expect(screen.getByTestId('button-filter')).toBeInTheDocument()
    expect(screen.getByTestId('button-remove-filters')).toBeInTheDocument()
    expect(screen.getByTestId('column-sort')).toBeInTheDocument()
    expect(screen.getByTestId('column-sort-input-asc')).toBeInTheDocument()
    expect(screen.getByTestId('column-sort-input-desc')).toBeInTheDocument()
    expect(screen.getByTestId('column-sort-button')).toBeInTheDocument()
    
    const btn = screen.getByTestId('button-filter')
    expect(screen.getAllByRole('option', {name: 'population'})[0].selected).toBe(true);
    const valorDigitado = screen.getByTestId('value-filter')
    

    let columnFilter = screen.getByTestId('column-filter');
    expect(columnFilter).toHaveLength(5);

    const comparisonFilter = screen.getByTestId('comparison-filter');

    userEvent.selectOptions(columnFilter, 'diameter');
    userEvent.selectOptions(comparisonFilter, 'maior que');
    userEvent.type(valorDigitado, '10000');
    userEvent.click(btn);

    let filters = screen.getAllByTestId('filter');
    expect(filters).toHaveLength(1);
  })

})
