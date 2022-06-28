import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import Login from '../../pages/Login';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux'
import App from '../../App';

describe("Testando a tela de login", () => {
  test('testa se é possível escrever o email da pessoa jogadora', () => {
    render(<Login />);
    const inputName = screen.getByLabelText(/nome/i);
    userEvent.type(inputName, 'nome da pessoa');
    expect(inputName).toBeInTheDocument();
    expect(inputName.value).toBe('nome da pessoa');
  });
  
  test('A pessoa que joga deve conseguir escrever seu email no input de email', () => {
    render(<Login />);
    const inputEmail = screen.getByLabelText(/E-mail/i);
    userEvent.type(inputEmail, 'alguem@algumacoisa.com');
    expect(inputEmail).toBeInTheDocument();
    expect(inputEmail.value).toBe('alguem@algumacoisa.com');
  });

  test('Será validado se o botão "Play" está desabilitado quando a pessoa jogadora não preencher nenhum campo', () => {
    render(<Login />);
    const buttonPlay = screen.getByRole('button', { name: /play/i })
    expect(buttonPlay.disabled).toBe(true);
  });

  test('Testa se o botão está desativado quando o usuário escreve apenas o nome', () => {
    render(<Login />);
    const inputName = screen.getByLabelText(/nome/i);
    expect(inputName).toBeInTheDocument();
    userEvent.type(inputName, 'junior');
    expect(inputName.value).toBe('junior');
    const buttonPlay = screen.getByRole('button', { name: /play/i })
    expect(buttonPlay.disabled).toBe(true);
  });

  test('Testa se o botão está desativado quando o usuário escreve apenas o email', () => {
    render(<Login />);
    const inputEmail = screen.getByLabelText(/e-mail/i);
    expect(inputEmail).toBeInTheDocument();
    userEvent.type(inputEmail, 'junior@junior.com');
    expect(inputEmail.value).toBe('junior@junior.com');
    const buttonPlay = screen.getByRole('button', { name: /play/i })
    expect(buttonPlay.disabled).toBe(true);
  });

  test('Testa se o botão está ativado quando o usuário escreve o email e o name', () => {
    render(<Login />);
    const inputName = screen.getByLabelText(/nome/i);
    const inputEmail = screen.getByLabelText(/e-mail/i);
    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    userEvent.type(inputName, 'junior');
    userEvent.type(inputEmail, 'junior@junior.com');
    expect(inputName.value).toBe('junior');
    const buttonPlay = screen.getByRole('button', { name: /play/i })
    expect(buttonPlay.disabled).toBe(false);
  });

  test('Testa se ao clicar no botão Play é redirecionado para a url /game', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputName = screen.getByLabelText(/nome/i);
    const inputEmail = screen.getByLabelText(/e-mail/i);
    const buttonPlay = screen.getByRole('button', { name: /play/i });
    userEvent.type(inputName, 'junior');
    userEvent.type(inputEmail, 'junior@junior.com');
    expect(buttonPlay.disabled).toBe(false);
    userEvent.click(buttonPlay);
    expect(history.push()).toHaveBeenCalled();
  });

  test('testa se a tela de configurações possui um título', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const configBtn = screen.getByRole('button', { name: /configurações/i });
    expect(configBtn).toBeInTheDocument();
    userEvent.click(configBtn);
    expect(history.location.pathname).toBe('/config');
    const title = screen.getByRole('heading', {
      name: /configuração/i,
      level: 1
    });
    expect(title).toBeInTheDocument();
  });
});
