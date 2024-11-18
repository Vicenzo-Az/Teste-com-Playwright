// Importa as ferramentas do Playwright e utilitários para gerar dados
const { test, expect, request } = require('@playwright/test');
const { generateUserData } = require('../utils/dataUtils'); // Gera dados de usuário dinamicamente

// Define o escopo dos testes para a rota /usuarios
test.describe('Testes na Rota /usuarios', () => {
  let apiContext; // Contexto da API para manter conexões
  let usuarioId; // Variável para armazenar o ID do usuário criado

  // Configuração antes de todos os testes
  test.beforeAll(async () => {
    apiContext = await request.newContext({
    baseURL: 'https://serverest.dev', // Define a URL base local da API
    });
  });

  // Finalização após todos os testes
  test.afterAll(async () => {
    await apiContext.dispose(); // Libera recursos do contexto da API
  });

  // Teste para criar um usuário
  test('POST - Criar usuário', async () => {
    const usuario = generateUserData(); // Gera dados válidos para o usuário
    const response = await apiContext.post('/usuarios', { data: usuario }); // Faz a requisição POST
    const body = await response.json(); // Extrai o corpo da resposta

    // Valida o status e a estrutura da resposta
    expect(response.status()).toBe(201);
    expect(body).toHaveProperty('_id');
    usuarioId = body._id; // Armazena o ID do usuário para testes futuros
  });

  // Teste para listar todos os usuários
  test('GET - Listar usuários', async () => {
    const response = await apiContext.get('/usuarios'); // Faz a requisição GET
    const body = await response.json();

    // Valida o status e se a resposta contém a lista de usuários
    expect(response.status()).toBe(200);
    expect(body).toHaveProperty('usuarios');
  });

  // Teste para obter um usuário pelo ID
  test('GET/{id} - Obter usuário pelo ID', async () => {
    const response = await apiContext.get(`/usuarios/${usuarioId}`); // Faz a requisição GET pelo ID
    const body = await response.json();

    // Valida se o status é 200 e se o ID retornado corresponde ao esperado
    expect(response.status()).toBe(200);
    expect(body).toHaveProperty('_id', usuarioId);
  });

  // Teste para atualizar um usuário
  test('PUT - Atualizar usuário', async () => {
    const usuarioAtualizado = {
      nome: 'Usuario Atualizado',
      email: `novo_${Date.now()}@email.com`, // Garante um e-mail único
      password: '123456',
      administrador: 'true',
    };
    const response = await apiContext.put(`/usuarios/${usuarioId}`, { data: usuarioAtualizado });
    const body = await response.json();

    // Valida o status e a mensagem de sucesso
    expect(response.status()).toBe(200);
    expect(body.message).toBe('Registro alterado com sucesso');
  });

  // Teste para excluir um usuário
  test('DELETE - Remover usuário', async () => {
    const response = await apiContext.delete(`/usuarios/${usuarioId}`); // Faz a requisição DELETE
    const body = await response.json();

    // Valida o status e a mensagem de sucesso
    expect(response.status()).toBe(200);
    expect(body.message).toBe('Registro excluído com sucesso');
  });
});
