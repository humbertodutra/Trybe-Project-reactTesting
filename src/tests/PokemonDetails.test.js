import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('test the component <Pokemon Details>', () => {
  test('Test if the details of the selected pokemon are displayed on the screen', () => {
    renderWithRouter(<App />);
    const toPokemonDetails = screen.getByText(/more details/i);
    userEvent.click(toPokemonDetails);
    const headingH2 = screen.getAllByRole('heading', { level: 2 });

    expect(headingH2[0].textContent).toContain('Pikachu');
    expect(toPokemonDetails).not.toBeInTheDocument();
    expect(headingH2[1].textContent).toContain('Summary');
    const paragraph = screen.getByText(/this intelligent pokémon/i);
    expect(paragraph).toBeInTheDocument();
  });

  test('test if there is a map displaying the pokemons locations', () => {
    renderWithRouter(<App />);
    const pokemonDetailsLink = screen.getByText(/more details/i);
    userEvent.click(pokemonDetailsLink);

    const headingH2 = screen.getAllByRole('heading', { level: 2 });
    expect(headingH2[2].textContent).toContain('Locations');

    const maps = screen.getAllByAltText('Pikachu location');
    expect(maps.length).toBe(2);

    const mapsName = screen.getAllByText(/kanto/i);
    expect(mapsName.length).toBe(2);

    const URL1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const URL2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    expect(maps[0].src).toBe(URL1);
    expect(maps[1].src).toBe(URL2);
  });

  test('the user can take a favorite pokemon from the details page', async () => {
    renderWithRouter(<App />);
    const pokemonDetailsLink = screen.getAllByText(/more details/i);
    userEvent.click(pokemonDetailsLink[0]);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();

    const favoritePokemonLabel = screen.getByText(/favoritado/i);
    expect(favoritePokemonLabel.textContent).toBe('Pokémon favoritado?');

    userEvent.click(checkbox);
    const favorites = screen.getByText(/favorite/i);
    userEvent.click(favorites);

    const favoritePokemonName = screen.getByTestId('pokemon-name');
    expect(favoritePokemonName).toBeInTheDocument();
    userEvent.click(pokemonDetailsLink[0]);

    await (() => {
      const checkedBox = screen.getByRole('checkbox');
      userEvent.click(checkedBox);
      userEvent.click(favorites);

      const message = screen.getByText(/no favorite/i);
      expect(message).toBeInTheDocument();
    });
  });
});
