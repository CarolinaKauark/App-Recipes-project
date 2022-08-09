import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import renderWithRouter from './helpers/renderWithRouter';

// import App from '../App';
import Profile from '../pages/Profile/Profile';

describe('Verifica os Elementos da Página', () => {
  beforeEach(() => {
    renderWithRouter(<Profile />);
  });

  test('Email', () => {
    const profileEmail = screen.getByTestId('profile-email');
    expect(profileEmail).toBeInTheDocument();
  });

  test(`Botão 'Done Recipes'`, () => {
    const doneRecipesBtn = screen.getByTestId('profile-done-btn');
    expect(doneRecipesBtn).toBeInTheDocument();
    expect(doneRecipesBtn).toHaveTextContent(/done recipes/i)
  });

  test(`Botão 'Favorite Recipes'`, () => {
    const favoritesBtn = screen.getByTestId('profile-favorite-btn');
    expect(favoritesBtn).toBeInTheDocument();
    expect(favoritesBtn).toHaveTextContent(/favorite recipes/i)
  });

  test(`Botão 'Logout'`, () => {
    const logoutBtn = screen.getByTestId('profile-logout-btn');
    expect(logoutBtn).toBeInTheDocument();
    expect(logoutBtn).toHaveTextContent(/logout/i)
  });
});

describe('Verifica o redirecionamento dos Links', () => {
  test('Done Recipes', () => {
    const { history } = renderWithRouter(<Profile />);

    const doneRecipesBtn = screen.getByTestId('profile-done-btn');
    userEvent.click(doneRecipesBtn);

    expect(history.location.pathname).toBe('/done-recipes');
  });

  test('Favorite Recipes', () => {
    const { history } = renderWithRouter(<Profile />);

    const favoritesBtn = screen.getByTestId('profile-favorite-btn');
    userEvent.click(favoritesBtn);

    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  test('Logout', () => {
    const { history } = renderWithRouter(<Profile />);

    const logoutBtn = screen.getByTestId('profile-logout-btn');
    userEvent.click(logoutBtn);

    expect(history.location.pathname).toBe('/');
  });
});

// describe('', () => {
//   test('', () => {});
// });