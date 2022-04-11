import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Verify the nav lins of App.js', () => {
  it('Should have the correct text name', () => {
    renderWithRouter(<App />);

    const linkOfHome = screen.getByRole('link', { name: /home/i });
    expect(linkOfHome).toBeInTheDocument();

    const linkOfAbout = screen.getByRole('link', { name: /about/i });
    expect(linkOfAbout).toBeInTheDocument();

    const linkOfFavs = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkOfFavs).toBeInTheDocument();
  });
  it('Expect to redirect the links after been clicked to the correct page', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/home');
    expect(history.location.pathname).toBe('/home');

    history.push('about');
    expect(history.location.pathname).toBe('/about');

    history.push('/favorites');
    expect(history.location.pathname).toBe('/favorites');
  });
});
