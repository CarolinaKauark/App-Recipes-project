import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import App from "../App";
import renderWithRouter from "./helpers/renderWithRouter";
import mockFetch, {
  DRINKBYID_REQUEST_URL,
  MEALBYID_REQUEST_URL,
} from "./mocks/fetch";
import { cocktaildbCategories, mealdbCategories } from "./mocks/categoriesResponse";
import beefMeals from "../../cypress/mocks/beefMeals";
import { act } from "react-dom/test-utils";
import mealdbResponse from "./mocks/mealdbResponse";
import cocktaildbResponse from "./mocks/cocktaildbResponse";

describe("Testa a tela de receitas", () => {
  beforeEach(() => {
    global.fetch = jest.fn(mockFetch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it("Deve fazer a requisição para o endpoint certo", async () => {
    const { history } = renderWithRouter(<App />);
    history.push("/foods/52977/in-progress");
    
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(MEALBYID_REQUEST_URL)
    })

    history.push("/drinks/15997/in-progress");
    
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(DRINKBYID_REQUEST_URL)
    })
  });

  it("Deve haver um botão de compartilhar receita", async () => {
    const { history } = renderWithRouter(<App />);
    history.push("/foods/52977/in-progress");
    
    window.document.execCommand = jest.fn(() => true)

    let button;
    await waitFor(() => {
      button = screen.getByTestId('share-btn')
    })
    act(() => {
      userEvent.click(button)
    })
    await waitFor(() => {
      expect(window.document.execCommand).toHaveBeenCalledWith('copy')
    })

    history.push("/drinks/15997/in-progress");
    
    await waitFor(() => {
      button = screen.getByTestId('share-btn')
    })
    act(() => {
      userEvent.click(button)
    })
    await waitFor(() => {
      expect(window.document.execCommand).toHaveBeenCalledWith('copy')
    })
  });

  it('Deve haver um botão de favoritar receita', async () => {
    const { history } = renderWithRouter(<App />);
    history.push("/foods/52977/in-progress");
    
    const FILLED = 'blackHeartIcon'
    const OUTLINE = 'whiteHeartIcon'

    let button;
    await waitFor(() => {
      button = screen.getByTestId('favorite-btn')
    })
    expect(button.firstChild.src).toMatch(new RegExp(OUTLINE, 'i'))
    act(() => {
      userEvent.click(button)
    })
    expect(button.firstChild.src).toMatch(new RegExp(FILLED, 'i'))

    history.push("/drinks/15997/in-progress");
    await waitFor(() => {
      button = screen.getByTestId('favorite-btn')
    })
    expect(button.firstChild.src).toMatch(new RegExp(OUTLINE, 'i'))
    act(() => {
      userEvent.click(button)
    })
    expect(button.firstChild.src).toMatch(new RegExp(FILLED, 'i'))

    history.push("/foods/52977/in-progress");
    await waitFor(() => {
      button = screen.getByTestId('favorite-btn')
    })
    expect(button.firstChild.src).toMatch(new RegExp(FILLED, 'i'))

  })

  it('Deve ser possível marcar ingredientes como concluídos e devem permanecer marcados entre reloads', async () => {
    const { history } = renderWithRouter(<App />);
    history.push("/foods/52977/in-progress");
    
    let ingredients;
    await waitFor(() => {
      ingredients = screen.getAllByTestId(/-ingredient-step/i)
    })

    expect(ingredients).toHaveLength(13)

    ingredients.forEach((el) => {
      act(() => {
        userEvent.click(el)
      })
      expect(el).toHaveStyle('text-decoration: line-through')
    })

    history.push("/");
    history.push("/foods/52977/in-progress");

    await waitFor(() => {
      ingredients = screen.getAllByTestId(/-ingredient-step/i)
    })

    expect(ingredients).toHaveLength(13)

    ingredients.forEach((el) => {
      expect(el.firstChild).toBeChecked()
    })
  })

  it('O botão de finalizar deve funcionar corretamente', async () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('inProgressRecipes', '')
    history.push("/foods/52977/in-progress");
    
    let ingredients;
    await waitFor(() => {
      ingredients = screen.getAllByTestId(/-ingredient-step/i)
    })

    const button = screen.getByTestId('finish-recipe-btn')

    expect(button).toBeDisabled()
    ingredients.forEach((el) => {
      act(() => {
        userEvent.click(el)
      })
    })
    
    expect(button).toBeEnabled()

    userEvent.click(button)

    await waitFor(() => {
      expect(history.location.pathname).toBe('/done-recipes')
    })
  })

  it('O botão de finalizar deve funcionar corretamente - drink', async () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('inProgressRecipes', '')
    history.push("/drinks/15997/in-progress");
    
    let ingredients;
    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/15997/in-progress');
      ingredients = screen.getAllByTestId(/-ingredient-step/i)
    })

    const button = screen.getByTestId('finish-recipe-btn')

    expect(button).toBeDisabled()
    ingredients.forEach((el) => {
      act(() => {
        userEvent.click(el)
      })
    })
    
    expect(button).toBeEnabled()

    userEvent.click(button)

    await waitFor(() => {
      expect(history.location.pathname).toBe('/done-recipes')
    })
  })

});
