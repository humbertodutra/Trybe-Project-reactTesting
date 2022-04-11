import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../components';
import renderWithRouter from './renderWithRouter';

describe('testing the about component', () => {
  it('if the page contains an h2 header with the text about the pokedex', () => {
    renderWithRouter(<About />);

    const h2Header = screen.getByRole('heading', { name: 'About Pokédex' });

    expect(h2Header).toBeInTheDocument();
  });
  it('Check if the page has two paragraphs with the text about thepokedex', () => {
    renderWithRouter(<About />);
    const firstParagraph = 'This application simulates a Pokédex, '
    + 'a digital encyclopedia containing all Pokémons';
    const secondParagraph = 'One can filter Pokémons by type, '
      + 'and see more details for each one of them';

    expect(screen.getByText(firstParagraph)).toBeInTheDocument();
    expect(screen.getByText(secondParagraph)).toBeInTheDocument();
  });

  it('Se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const imageUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/'
      + 'Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('src', imageUrl);
  });
});
