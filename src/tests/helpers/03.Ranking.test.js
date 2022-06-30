import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
import App from '../../App';
import Ranking from '../../pages/Ranking';
import { tokenResponse } from '../../../cypress/mocks/token';

describe('Verifica se os testes cobrem 90% da tela de ranking', () => {
  test('Testa se ao clicar no botão Play Again volta para página inicial', () => {
    const { history } = renderWithRouterAndRedux(<App />, { player: { score: 100, assertions: 5 }}, '/ranking');
    const btnPlay = screen.getByRole('button', { name: /play again/i });
    expect(btnPlay).toBeInTheDocument();
    userEvent.click(btnPlay);
    expect(history.location.pathname).toBe('/');
  })
})