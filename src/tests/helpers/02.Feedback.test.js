import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
import Feedback from '../../pages/Feedback';
import App from '../../App';

describe('Desenvolva testes para atingir 90% de cobertura da tela de Feedback', () => {
  test('Valida se o nome, avatar e o placar da pessoa está presente no header', () => {
    const url = 'https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e';
    renderWithRouterAndRedux(<Feedback />, { player: { name: 'dihrey', score: 100, url }}, '/feedback')
    const name = screen.getByText('dihrey');
    const score = screen.getByTestId('header-score');
    const image = screen.getByRole('img', { name: /avatar/i });
    expect(name).toBeInTheDocument();
    expect(score).toBeInTheDocument();
    expect(score).toHaveTextContent('100');
    expect(image).toBeInTheDocument();
  })
  test('testa se aparece a mensagem Well Done! quando o acerto é = 3 mensagens do feedback a serem exibidas', () => {
    renderWithRouterAndRedux(<Feedback />, { player: { assertions: 3 }}, '/feedback');
    const message = screen.getByText(/well done!/i);
    expect(message).toBeInTheDocument();
  })
  test('Será validado se ao acertar menos de 3 perguntas a mensagem de feedback é "Could be better..."', () => {
    renderWithRouterAndRedux(<Feedback />, { player: { assertions: 2 }}, '/feedback');
    const message = screen.getByText(/could be better/i);
    expect(message).toBeInTheDocument();
  })
  test('testa se aparece a mensagem Well Done! quando o acerto é > 3 mensagens do feedback a serem exibidas', () => {
    renderWithRouterAndRedux(<Feedback />, { player: { assertions: 5 }}, '/feedback');
    const message = screen.getByText(/well done!/i);
    expect(message).toBeInTheDocument();
  })
  test('Ao clicar no botão ranking, é redirecionado para URL /ranking', () => {
    const { history } = renderWithRouterAndRedux(<App />, { player: { score: 100, assertions: 5 }}, '/feedback');
    const btnRanking = screen.getByRole('button', { name: /ranking/i })
    expect(btnRanking).toBeInTheDocument();
    userEvent.click(btnRanking);
    expect(history.location.pathname).toBe('/ranking');
  })
});
