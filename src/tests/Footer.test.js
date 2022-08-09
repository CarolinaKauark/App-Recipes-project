import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import renderWithRouter from './helpers/renderWithRouter';

import App from '../App';
import Footer from '../components/Footer/Footer';

describe('Verifica os Elementos da Página', () => {
  test('Footer Component', () => {
    renderWithRouter(<Footer />);

    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });

  test('Drinks Icon', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    const drinksIcon = screen.getByTestId('drinks-bottom-btn');
    expect(drinksIcon).toBeInTheDocument();
  });

  test('Foods Icon', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const foodsIcon = screen.getByTestId('food-bottom-btn');
    expect(foodsIcon).toBeInTheDocument();
  });

  test('Se está no rodapé da página e é fixo', () => {
    // Fazer este teste!
  });
});

describe('Verifica se está ou não presente nas Rotas definidas', () => {
  test(`Se não está presente na rota '/'`, () => {
    renderWithRouter(<App />);
    
    const footer = screen.queryByTestId('footer');
    expect(footer).not.toBeInTheDocument();
  });

  test(`Se está presente na rota '/foods'`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const footer = screen.queryByTestId('footer');
    expect(footer).toBeInTheDocument();
  });

  test(`Se está presente na rota '/drinks'`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    const footer = screen.queryByTestId('footer');
    expect(footer).toBeInTheDocument();
  });

  test(`Se não está presente na rota '/foods/{id-da-receita}'`, () => {
    const idDaReceita = 52977;

    const { history } = renderWithRouter(<App />);
    history.push(`/foods/${idDaReceita}`);
    
    const footer = screen.queryByTestId('footer');
    expect(footer).not.toBeInTheDocument();
  });

  test(`Se não está presente na rota '/drinks/{id-da-receita}'`, () => {
    const idDaReceita = 15997;

    const { history } = renderWithRouter(<App />);
    history.push(`/drinks/${idDaReceita}`);
    
    const footer = screen.queryByTestId('footer');
    expect(footer).not.toBeInTheDocument();
  });

  test(`Se não está presente na rota '/foods/{id-da-receita}/in-progress'`, () => {
    const idDaReceita = 53060;

    const { history } = renderWithRouter(<App />);
    history.push(`/foods/${idDaReceita}/in-progress`);
    
    const footer = screen.queryByTestId('footer');
    expect(footer).not.toBeInTheDocument();
  });

  test(`Se não está presente na rota '/drinks/{id-da-receita}/in-progress'`, () => {
    const idDaReceita = 17222;

    const { history } = renderWithRouter(<App />);
    history.push(`/drinks/${idDaReceita}/in-progress`);
    
    const footer = screen.queryByTestId('footer');
    expect(footer).not.toBeInTheDocument();
  });

  test(`Se está presente na rota '/profile`, () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/profile`);
    
    const footer = screen.queryByTestId('footer');
    expect(footer).toBeInTheDocument();
  });

  test(`Se não está presente na rota '/done-recipes`, () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/done-recipes`);
    
    const footer = screen.queryByTestId('footer');
    expect(footer).not.toBeInTheDocument();
  });

  test(`Se não está presente na rota '/favorite-recipes`, () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/favorite-recipes`);
    
    const footer = screen.queryByTestId('footer');
    expect(footer).not.toBeInTheDocument();
  });
});

describe('Verifica o redirecionamento dos links', () => {
  test(`Se ao clicar no Ícone de Drink, redireciona para '/drinks'`, () => {
    const { history } = renderWithRouter(<Footer />);

    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinksBtn);

    expect(history.location.pathname).toBe('/drinks');
  });

  test(`Se ao clicar no Ícone de Comidas, redireciona para '/foods'`, () => {
    const { history } = renderWithRouter(<Footer />);

    const foodsBtn = screen.getByTestId('food-bottom-btn');
    userEvent.click(foodsBtn);

    expect(history.location.pathname).toBe('/foods');
  });
});