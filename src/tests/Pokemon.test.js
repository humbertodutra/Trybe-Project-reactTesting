import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('test the <Pokemon> component ', () => {
  test('test if a card is rendered with a pokemon information', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    const named = screen.getByText(/pikachu/i);
    expect(pokemonName).toBe(named);

    const pokemonType = screen.getByTestId('pokemon-type');
    const eletric = screen.getAllByText(/electric/i);
    expect(pokemonType).toBe(eletric[0]);

    const pokemonWeigth = screen.getByTestId('pokemon-weight');
    expect(pokemonWeigth).toBe(pokemonWeigth);

    const sprinte = screen.getByAltText('Pikachu sprite');
    expect(sprinte).toBeInTheDocument();

    const img = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(sprinte).toHaveAttribute('src', img);
  });

  test('test if when you click in a pokemon,'
   + 'it redirects you to the pokemon details page',
  () => {
    const { history } = renderWithRouter(<App />);
    const pikachu = screen.getByText(/pikachu/i);
    const linkDetails = screen.getByRole('link', { name: 'More details' });
    expect(linkDetails).toBeInTheDocument();
    expect(pikachu).toBeInTheDocument();
    userEvent.click(linkDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('if has a start icon on favorited pokemons', () => {
    const { history } = renderWithRouter(<App />);
    const pikachu = screen.getByText(/pikachu/i);
    const details = screen.getByRole('link', { name: 'More details' });

    expect(pikachu).toBeInTheDocument();
    expect(details).toBeInTheDocument();

    userEvent.click(details);
    const favPokemon = screen.getByLabelText('Pokémon favoritado?');
    const { pathname } = history.location;

    expect(favPokemon).toBeInTheDocument();
    expect(pathname).toBe('/pokemons/25');
    userEvent.click(favPokemon);

    const markedPikachu = screen.getByAltText('Pikachu is marked as favorite');
    const star = '/star-icon.svg';

    expect(markedPikachu).toBeInTheDocument();
    expect(markedPikachu).toHaveAttribute('src', star);
  });
});
