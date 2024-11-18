// Importa ferramentas e funções utilitárias
const { test, expect, request } = require('@playwright/test');
const { generateProductData, generateAdminUser } = require('../utils/dataUtils'); // Funções para dados dinâmicos

// Define o escopo dos testes para a rota /produtos
test.describe('Testes na Rota /produtos', () => {
  let apiContext, token, produtoId;

  // Antes de todos os testes, cria um contexto, usuário admin e autenticação
  test.beforeAll(async () => {
    apiContext = await request.newContext({
    baseURL: 'https://serverest.dev',
    });
    const adminUser = generateAdminUser();
    await apiContext.post('/usuarios', { data: adminUser });

    // Faz login para obter o token de autorização
    const loginResponse = await apiContext.post('/login', {
      data: { email: adminUser.email, password: adminUser.password },
    });
    const loginBody = await loginResponse.json();
    token = loginBody.authorization;
  });

  // Após os testes, encerra o contexto da API
  test.afterAll(async () => {
    await apiContext.dispose();
  });

  // Teste para criar um produto
  test('POST - Criar produto', async () => {
    const produto = generateProductData();
    const response = await apiContext.post('/produtos', {
      headers: { Authorization: token },
      data: produto,
    });
    const body = await response.json();

    // Valida o status e o ID do produto criado
    expect(response.status()).toBe(201);
    expect(body).toHaveProperty('_id');
    produtoId = body._id;
  });

  // Teste para listar produtos
  test('GET - Listar produtos', async () => {
    const response = await apiContext.get('/produtos');
    const body = await response.json();

    // Valida o status e a lista de produtos
    expect(response.status()).toBe(200);
    expect(body).toHaveProperty('produtos');
  });

  // Teste para obter produto pelo ID
  test('GET/{id} - Obter produto pelo ID', async () => {
    const response = await apiContext.get(`/produtos/${produtoId}`);
    const body = await response.json();

    // Valida se o produto retornado corresponde ao ID
    expect(response.status()).toBe(200);
    expect(body._id).toBe(produtoId);
  });

  // Teste para atualizar produto
  test('PUT - Atualizar produto', async () => {
    const produtoAtualizado = {
      nome: 'Produto Atualizado',
      preco: 150,
      descricao: 'Produto novo',
      quantidade: 30,
    };
    const response = await apiContext.put(`/produtos/${produtoId}`, {
      headers: { Authorization: token },
      data: produtoAtualizado,
    });
    const body = await response.json();

    // Valida status e mensagem de sucesso
    expect(response.status()).toBe(200);
    expect(body.message).toBe('Registro alterado com sucesso');
  });

  // Teste para excluir produto
  test('DELETE - Remover produto', async () => {
    const response = await apiContext.delete(`/produtos/${produtoId}`, {
      headers: { Authorization: token },
    });
    const body = await response.json();

    // Valida status e mensagem de sucesso
    expect(response.status()).toBe(200);
    expect(body.message).toBe('Registro excluído com sucesso');
  });
});
