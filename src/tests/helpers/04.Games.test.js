import React from 'react';
import userEvent from '@testing-library/user-event';
import { findByRole, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
import App from '../../App';
import { tokenResponse } from '../../../cypress/mocks/token';
import { questionsResponse, invalidTokenQuestionsResponse } from '../../../cypress/mocks/questions';
import Game from '../../pages/Game';

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(questionsResponse),
    }));
};

describe('Verifica se os testes cobrem 90% da tela de Jogo', () => {
  beforeEach(mockFetch);
 
  afterEach(() => jest.clearAllMocks());
  
  beforeAll(() => {
    global.fetch = jest.fn(async () => ({
      json: async () => tokenResponse,
    }));
    localStorage.setItem('token', tokenResponse.token);
  });


  test('Valida se o nome, avatar e o placar da pessoa está presente no header', () => {
    const url = 'https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e';
    renderWithRouterAndRedux(<App />, { player: { name: 'dihrey', score: 100, url }}, '/game')
    const name = screen.getByText('dihrey');
    const score = screen.getByTestId('header-score');
    const image = screen.getByRole('img', { name: /avatar/i });
    expect(name).toBeInTheDocument();
    expect(score).toBeInTheDocument();
    expect(score).toHaveTextContent('100');
    expect(image).toBeInTheDocument();
  })

  test('Verifica se ao acessar o /game sem logar, ele é redirecionado de volta à página de login', async () => {
    localStorage.clear();
    const { history } = renderWithRouterAndRedux(<App />, {}, '/game');
    expect(history.location.pathname).toBe('/');
  })

  test('Será validado se a categoria da pergunta está presente', async () => {
    localStorage.setItem('token', tokenResponse.token);
    renderWithRouterAndRedux(<App />, {}, '/game')
    const category = await screen.findByText(/geography/i)
    expect(category).toBeInTheDocument();
  })
  test('valida se o texto da pergunta está presente', async () => {
  renderWithRouterAndRedux(<App />, {}, '/game')
      const texto = await screen.findByTestId('question-text');
      expect(texto).toBeInTheDocument();
  })
  test('Valida se ao receber um token inválido, ele redireciona para a página principal', async () => {
    const mockFetchInvalid = () => {
      jest.spyOn(global, 'fetch')
        .mockImplementation(() => Promise.resolve({
          json: () => Promise.resolve(invalidTokenQuestionsResponse),
        }));
    };
    await mockFetchInvalid();
    const { history } = renderWithRouterAndRedux(<App />, {}, '/game');
    const inputName = await screen.findByLabelText(/nome/i);
    expect(inputName).toBeInTheDocument();
    expect(history.location.pathname).toBe('/');
    jest.clearAllMocks()
  })
  test('Valida se há apenas uma alternativa correta', async () => {
    localStorage.setItem('token', tokenResponse.token);
    renderWithRouterAndRedux(<App />, {}, '/game');
    const correctAnswer = await screen.findByTestId('correct-answer');
    userEvent.click(correctAnswer);
    const nextBtn = screen.getByRole('button', { name: /next/i });
    userEvent.click(nextBtn)
    const correct = screen.getAllByTestId('correct-answer');
    const incorrects = screen.getAllByTestId(/wrong/i);
    expect(correct.length).toBe(1);
    expect(incorrects.length).toBe(3);
  })
  test('Valida se ao chegar na última alternativa ele redireciona para a página de feedback', async () => {
    localStorage.setItem('token', tokenResponse.token);
    const { history } = renderWithRouterAndRedux(<App />, {}, '/game');
    for(let index = 1; index < 6; index += 1) {
      const correctAnswer = await screen.findByTestId('correct-answer');
      userEvent.click(correctAnswer);
      const nextBtn = screen.getByRole('button', { name: /next/i });
      userEvent.click(nextBtn);
    }
    expect(history.location.pathname).toBe('/feedback');
  })
  test('Valida se o timer está sendo contado em ordem decrescente', async () => {
    localStorage.setItem('token', tokenResponse.token);
    renderWithRouterAndRedux(<App />, {}, '/game');
    await new Promise((r) => setTimeout(r, 32000));
    expect(screen.getByText('29')).toBeInTheDocument();
  })
  test('Valida se quando o timer chegar a 0, mostra o texto "Acabou o tempo"', async () => {
    localStorage.setItem('token', tokenResponse.token);
    renderWithRouterAndRedux(<App />, {}, '/game');
    await waitFor(() => {
      expect(screen.getByText('Acabou o tempo')).toBeInTheDocument()
    }, { timeout: 32000 })
  }, 32500) 
});
