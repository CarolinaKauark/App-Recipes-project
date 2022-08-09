import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import App from "../App";
import renderWithRouter from "./helpers/renderWithRouter";
import mockFetch, {
  COCKTAILDB_REQUEST_URL,
  MEALDB_REQUEST_URL,
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
  
  it("Deve mostrar as informações básicas de cada receita retornada", async () => {
    const { history } = renderWithRouter(<App />);
    history.push("/foods");
    await waitFor(() => {
      expect(screen.getAllByTestId(/-recipe-card$/i)).toHaveLength(12);

      expect(screen.getAllByTestId(/-card-img$/i)).toHaveLength(12);

      expect(screen.getAllByTestId(/-card-name$/i)).toHaveLength(12);
    });
  });

  it("Deve fazer a requisição para o endpoint certo", async () => {
    const { history } = renderWithRouter(<App />);
    history.push("/foods");

    await waitFor(() => expect(fetch).toHaveBeenCalledWith(MEALDB_REQUEST_URL));
    history.push("/drinks");

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(COCKTAILDB_REQUEST_URL)
    );
  });

  it('Deve mostrar as 5 primeiras categorias da database correta', async () => {
    const { history } = renderWithRouter(<App />);
    history.push("/foods");

    await waitFor(() => {
      const categories = screen.getAllByTestId(/(?<!All)-category-filter/i);
      expect(categories).toHaveLength(5)
      categories.forEach(({ textContent }, i) => {
        expect(textContent).toBe(mealdbCategories.categories[i].strCategory)
      })
    });
    history.push("/drinks");

    await waitFor(() =>{
      const categories = screen.getAllByTestId(/(?<!All)-category-filter/i);
      expect(categories).toHaveLength(5)
      categories.forEach(({ textContent }, i) => {
        expect(textContent).toBe(cocktaildbCategories.drinks[i].strCategory)
      })
    });
  })

  it('Deve retornar as 12 primeiras receitas da categoria correta', async () => {
    const { history } = renderWithRouter(<App />);
    history.push("/foods");
    await waitFor(() => {
      expect(screen.getAllByTestId(/-recipe-card$/i)).toHaveLength(12);
    });

    act(() => {
      userEvent.click(screen.getByTestId(/beef-category-filter/i))
    })

    await waitFor(() => {
      screen.getAllByTestId(/-card-name$/i).forEach(({ textContent }, i) => {
        expect(textContent).toBe(beefMeals.meals[i].strMeal)
      })    
    });
  
    act(() => {
      userEvent.click(screen.getByTestId(/all-category-filter/i))
    })

    await waitFor(() => {
      screen.getAllByTestId(/-card-name$/i).forEach(({ textContent }, i) => {
        expect(textContent).toBe(mealdbResponse.meals[i].strMeal)
      })    
    });
  })

  it('Clicar no filtra outra vez deve desselecionar o filtro', async () => {
    const { history } = renderWithRouter(<App />);
    history.push("/foods");
    await waitFor(() => {
      expect(screen.getAllByTestId(/-recipe-card$/i)).toHaveLength(12);
    });

    act(() => {
      userEvent.click(screen.getByTestId(/beef-category-filter/i))
    })

    await waitFor(() => {
      screen.getAllByTestId(/-card-name$/i).forEach(({ textContent }, i) => {
        expect(textContent).toBe(beefMeals.meals[i].strMeal)
      })    
    });
  
    act(() => {
      userEvent.click(screen.getByTestId(/beef-category-filter/i))
    })

    await waitFor(() => {
      screen.getAllByTestId(/-card-name$/i).forEach(({ textContent }, i) => {
        expect(textContent).toBe(mealdbResponse.meals[i].strMeal)
      })    
    });
  })

  it('Clicar em um card redireciona o usuário para a página de detalhes', async () => {
    const { 
      history,
    } = renderWithRouter(<App />);
    history.push("/foods");
    await waitFor(() => {
      expect(screen.getAllByTestId(/-recipe-card$/i)).toHaveLength(12);
    });

    userEvent.click(screen.getByTestId(/^0-recipe-card/i))
    const { idMeal } = mealdbResponse.meals[0]
    expect(history.location.pathname).toBe(`/foods/${idMeal}`)
    
    history.push("/drinks");
    await waitFor(() => {
      expect(screen.getAllByTestId(/-recipe-card$/i)).toHaveLength(12);
    });

    userEvent.click(screen.getByTestId(/^0-recipe-card/i))
    const { idDrink } = cocktaildbResponse.drinks[0]
    expect(history.location.pathname).toBe(`/drinks/${idDrink}`)
  })
});
