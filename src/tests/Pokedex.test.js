import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('testing the App Component', () => {
  test('test if the top of the page has a navLinks', () => {
    renderWithRouter(<App />);
    const textToBeThere = screen.getByRole('heading',
      { level: 2, name: /Encountered pokémons/i });
    expect(textToBeThere).toBeInTheDocument();
  });
  test('test if the another pokemon appar after click on next Pokemon button', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(nextButton);
    expect(screen.getByText(/Charmander/i));
    userEvent.click(nextButton);
    expect(screen.getByText(/Caterpie/i));
    userEvent.click(nextButton);
    expect(screen.getByText(/Ekans/i));
    userEvent.click(nextButton);
    expect(screen.getByText(/Alakazam/i));
    userEvent.click(nextButton);
    expect(screen.getByText(/Mew/i));
    userEvent.click(nextButton);
    expect(screen.getByText(/Rapidash/i));
    userEvent.click(nextButton);
    expect(screen.getByText(/Snorlax/i));
    userEvent.click(nextButton);
    expect(screen.getByText(/Dragonair/i));
    userEvent.click(nextButton);
    expect(screen.getByText(/Pikachu/i));
  });
  test('test if shows one pokemons perrtime', () => {
    renderWithRouter(<App />);
    const img = screen.getAllByRole('img');
    expect(img.length).toBe(1);
  });
  test('if pokedex contains a filter button', async () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Electric' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Fire' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Bug' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Poison' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Psychic' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Normal' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Dragon' })).toBeInTheDocument();
    const dragons = screen.getByRole('button', { name: 'Dragon' });
    userEvent.click(dragons);
    const btn = screen.getByRole('button', { name: 'Próximo pokémon' });
    const dragon = screen.getByTestId('pokemon-type');
    expect(btn).toHaveAttribute('disabled');
    expect(dragon).toHaveTextContent('Dragon');
    const btns = await screen.findAllByTestId('pokemon-type-button');
    expect(btns[0]).toHaveTextContent(/electric/i);
    expect(btns[1]).toHaveTextContent(/fire/i);
    expect(btns[2]).toHaveTextContent(/bug/i);
    expect(btns[3]).toHaveTextContent(/poison/i);
    expect(btns[4]).toHaveTextContent(/psychic/i);
    expect(btns[5]).toHaveTextContent(/normal/i);
    expect(btns[6]).toHaveTextContent(/dragon/i);

    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
  });
  test('se a Pokédex contém um botão para resetar o filtro',
    () => {
      renderWithRouter(<App />);
      const reloadFn = () => {
        window.location.reload(true);
      };
      const dragons = screen.getByRole('button', { name: 'Dragon' });
      userEvent.click(dragons);
      const all = screen.getByRole('button', { name: 'All' });
      userEvent.click(all);
      expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'All' })).not.toHaveAttribute('disabled');
      reloadFn();
      const btn = screen.getByRole('button', { name: 'Próximo pokémon' });
      userEvent.click(btn);
      expect(screen.getByText(/Charmander/i));
      userEvent.click(btn);
      expect(screen.getByText(/Caterpie/i));
      userEvent.click(btn);
      expect(screen.getByText(/Ekans/i));
      userEvent.click(btn);
      expect(screen.getByText(/Alakazam/i));
      userEvent.click(btn);
      expect(screen.getByText(/Mew/i));
      userEvent.click(btn);
      expect(screen.getByText(/Rapidash/i));
      userEvent.click(btn);
      expect(screen.getByText(/Snorlax/i));
      userEvent.click(btn);
      expect(screen.getByText(/Dragonair/i));
      userEvent.click(btn);
      expect(screen.getByText(/Pikachu/i));
    });
});
