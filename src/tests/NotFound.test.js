import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('testing the component App', () => {
  test('if the page cointains h2 with the text page requested not found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/page/hulk');
    const notFind = screen.getByRole('heading', {
      level: 2, name: /Page requested not found/i,
    });
    expect(notFind).toBeInTheDocument();
  });

  test('if the page contains a image of a pokedex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/page/arana');
    const pokedexImage = screen.getByAltText(/pikachu/i);
    expect(pokedexImage).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
