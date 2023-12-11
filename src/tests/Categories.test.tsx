import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import { MemoryRouter } from 'react-router-dom';
import { CategoryPage } from '../routes/CategoryPage';

describe('Categories', () => {
  beforeEach(() => {
    render(<CategoryPage />, { wrapper: MemoryRouter });
  });
  const user = userEvent.setup();

  it('should display dropdown', () => {
    // expect dropdown
    expect(screen.getByText('All')).toBeInTheDocument();

    // expect correct icon to be displayed
    expect(screen.getByTestId('dropdownIconDown')).toBeInTheDocument();
    expect(screen.queryByTestId('dropdownIconUp')).not.toBeInTheDocument();
  });

  it('should open and display correct amout of categories when dropdown is clicked', async () => {
    // expect and click dropdown
    const dropdown = screen.getByText('All');
    expect(dropdown).toBeInTheDocument();
    await user.click(dropdown);

    // expect correct icon to be displayed
    expect(screen.getByTestId('dropdownIconUp')).toBeInTheDocument();
    expect(screen.queryByTestId('dropdownIconDown')).not.toBeInTheDocument();

    // except right amout of categories
    expect(screen.getAllByRole('dropdownChoice')).toHaveLength(16);
  });

  it('should display right amout of movies with selected genre', async () => {
    // expect and click dropdown
    const dropdown = screen.getByText('All');
    expect(dropdown).toBeInTheDocument();
    await user.click(dropdown);

    // expect correct icon to be displayed
    expect(screen.getByTestId('dropdownIconUp')).toBeInTheDocument();
    expect(screen.queryByTestId('dropdownIconDown')).not.toBeInTheDocument();

    // expect Drama category and select it
    const adventure = screen.getByText('Adventure');
    expect(adventure).toBeInTheDocument();
    await user.click(adventure);

    // expect correct number of adventure movies
    const adventureMovies = await screen.findAllByRole('movie');
    expect(adventureMovies).toHaveLength(8);
  });
});
