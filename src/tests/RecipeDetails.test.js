import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import App from "../App";
import renderWithRouter from "./helpers/renderWithRouter";
import mockFetch, {
  MEALBYID_REQUEST_URL,
  DRINKBYID_REQUEST_URL,
  COCKTAILDB_REQUEST_URL,
  MEALDB_REQUEST_URL,
} from "./mocks/fetch";
import mealById from './mocks/mealById';

describe("Testa a tela de Details", () => {
  beforeEach(() => {
    global.fetch = jest.fn(mockFetch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('testa se os fetchs são chamados corretamente', async () => {
    const { history } = renderWithRouter(<App />);
    history.push("/foods/52977");

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(MEALBYID_REQUEST_URL);
      expect(fetch).toHaveBeenCalledWith(COCKTAILDB_REQUEST_URL);
    });
      
  })

  it('testa se os fetchs são chamados corretamente', async () => {
    const { history } = renderWithRouter(<App />);
    history.push("/drinks/15997");

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(DRINKBYID_REQUEST_URL);
      expect(fetch).toHaveBeenCalledWith(MEALDB_REQUEST_URL);
    });
  });

  it('testa se ao clicar no start recipe, se redireciona', async () => {
    const { history } = renderWithRouter(<App />);
    history.push("/foods/52977");

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(MEALBYID_REQUEST_URL);
      expect(fetch).toHaveBeenCalledWith(COCKTAILDB_REQUEST_URL);

      const btnStart = screen.getByText(/start recipe/i);
      fireEvent.click(btnStart);

      expect(history.location.pathname).toBe('/foods/52977/in-progress');

    });
  })

  it('testa se o btn não aparece quando a receita foi feita - food', async () => {
    const { history } = renderWithRouter(<App />);
    history.push("/foods/52977");
    
    const btnStart = screen.getByTestId("start-recipe-btn");
    fireEvent.click(btnStart);

    
    await waitFor(() => {
      expect(history.location.pathname).toBe('/foods/52977/in-progress');
    }); 

    const ingredients = screen.getAllByTestId(/-ingredient-step$/i);
    ingredients.forEach((ingredient) => 
    userEvent.click(ingredient));

    const btnFinish = screen.getByTestId("finish-recipe-btn");
    userEvent.click(btnFinish);

    history.push('/foods/52977');
     
    expect( await screen.findByText(/Corba/i)).toBeInTheDocument();
    expect(screen.queryByTestId("start-recipe-btn")).not.toBeInTheDocument();
  })

  it('testa se o btn não aparece quando a receita foi feita - drink', async () => {
    const { history } = renderWithRouter(<App />);
    history.push("/drinks/15997");
    
    const btnStart = screen.getByTestId("start-recipe-btn");
    fireEvent.click(btnStart);

    expect(history.location.pathname).toBe('/drinks/15997/in-progress');

    await waitFor(() => {
      const ingredients = screen.getAllByTestId(/-ingredient-step$/i);
      ingredients.forEach((ingredient) => 
      userEvent.click(ingredient));

      const btnFinish = screen.getByTestId("finish-recipe-btn");
      userEvent.click(btnFinish);

      history.push('/drinks/15997');
      expect(btnStart).not.toBeInTheDocument();

    });
  })

})