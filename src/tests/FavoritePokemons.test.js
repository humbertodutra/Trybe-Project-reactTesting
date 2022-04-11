import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test the component <Favorite Pokemons>', () => {
  it('If a mensage No favorite pokeon found appear after clicked', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');

    const text = screen.getByText('No favorite pokemon found');

    expect(text).toBeInTheDocument();
  });
  it('if the favorite cards show the favorited Pokemons', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pokemons/151');
    const favCheckBox = screen.getByRole('checkbox');
    userEvent.click(favCheckBox);

    history.push('/pokemons/65');
    userEvent.click(favCheckBox);

    history.push('/favorites');

    const mew = screen.getByText('Mew');
    const alakazam = screen.getByText('Alakazam');

    expect(mew).toBeInTheDocument();
    expect(alakazam).toBeInTheDocument();
  });
});
