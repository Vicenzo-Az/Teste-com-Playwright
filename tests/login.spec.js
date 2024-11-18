// Importa as ferramentas necessárias
const { test, expect, request } = require('@playwright/test');
const { generateUserData } = require('../utils/dataUtils'); // Gera dados de usuário

// Define o escopo dos testes para a rota /login
test.describe('Testes na Rota /login', () => {
  let apiContext, usuario;

  // Antes de todos os testes, cria um contexto e um usuário para o login
  test.beforeAll(async () => {
    apiContext = await request.newContext({
    baseURL: 'https://serverest.dev',
    });
    usuario = generateUserData();
    await apiContext.post('/usuarios', { data: usuario }); // Cria um usuário para autenticação
  });

  // Após os testes, encerra o contexto da API
  test.afterAll(async () => {
    await apiContext.dispose();
  });

  // Teste para realizar login com sucesso
  test('POST - Realizar login com sucesso', async () => {
    const response = await apiContext.post('/login', {
      data: { email: usuario.email, password: usuario.password },
    });
    const body = await response.json();

    // Valida o status e a presença do token de autorização
    expect(response.status()).toBe(200);
    expect(body).toHaveProperty('authorization');
  });

  // Teste para falha no login com credenciais incorretas
  test('POST - Falha no login', async () => {
    const response = await apiContext.post('/login', {
      data: { email: usuario.email, password: 'senha_incorreta' },
    });
    const body = await response.json();

    // Valida o status e a mensagem de erro
    expect(response.status()).toBe(401);
    expect(body.message).toBe('Email e/ou senha inválidos');
  });
});
