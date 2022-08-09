import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import React from 'react';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Testes da pagina de Login', () => {
  it('Testa se há na pagina, os inputs e o botão', () => {
    renderWithRouter(<App />)
    const inputEmail = screen.getByTestId('email-input');
    const inputPswd = screen.getByTestId('password-input');
    const btnSubmit = screen.getByTestId('login-submit-btn');

    expect(inputEmail).toBeInTheDocument();
    expect(inputPswd).toBeInTheDocument();
    expect(btnSubmit).toBeInTheDocument();
  });

  it('testa o funcionamento do botão', () => {
    renderWithRouter(<App />)
    const inputEmail = screen.getByTestId('email-input');
    const inputPswd = screen.getByTestId('password-input');
    const btnSubmit = screen.getByTestId('login-submit-btn');
    
    userEvent.type(inputEmail, 'email@trybe.com');
    expect(btnSubmit).toBeDisabled();
    userEvent.type(inputPswd, '123456');
    expect(btnSubmit).toBeDisabled();
    userEvent.clear(inputEmail);
    userEvent.clear(inputPswd);
    userEvent.type(inputEmail, 'email@trybe.com');
    userEvent.type(inputPswd, '1234567');
    expect(btnSubmit).toBeEnabled()
  });

  it('Testa se email e tokens foram salvos no localStorage', () => {
    renderWithRouter(<App />)

    localStorage.setItem('user', 'mail@trybe.com');
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);

    const email = localStorage.getItem('user');
    const mealsToken = localStorage.getItem('mealsToken');
    const cocktailsToken = localStorage.getItem('cocktailsToken');
    const inputEmail = screen.getByTestId('email-input');
    const inputPswd = screen.getByTestId('password-input');
    const btnSubmit = screen.getByTestId('login-submit-btn');

    userEvent.click(btnSubmit);
    userEvent.type(inputEmail, 'mail@trybe.com');
    userEvent.type(inputPswd, '1234567');
    userEvent.click(btnSubmit);
    expect(email).toBe('mail@trybe.com');
    expect(mealsToken).toEqual('1');
    expect(cocktailsToken).toEqual('1')
  });

})