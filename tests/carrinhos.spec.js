// Importa ferramentas e funções utilitárias
const { test, expect, request } = require('@playwright/test');
const { generateAdminUser, generateProductData, generateCartData } = require('../utils/dataUtils');

// Define o escopo dos testes para a rota /carrinhos
test.describe('Testes na Rota /carrinhos', () => {
  let apiContext, token, produtoId, carrinhoId;

  // Antes de todos os testes, cria um contexto e faz login com um usuário admin
  test.beforeAll(async () => {
    apiContext = await request.newContext({
    baseURL: 'https://serverest.dev',
    });
    const adminUser = generateAdminUser(); // Cria dados de um usuário administrador
    await apiContext.post('/usuarios', { data: adminUser }); // Cria o usuário na API

    // Faz login para obter o token de autenticação
    const loginResponse = await apiContext.post('/login', {
      data: { email: adminUser.email, password: adminUser.password },
    });
    const loginBody = await loginResponse.json();
    token = loginBody.authorization;

    // Cria um produto para ser usado no carrinho
    const produto = generateProductData();
    const produtoResponse = await apiContext.post('/produtos', {
      headers: { Authorization: token },
      data: produto,
    });
    const produtoBody = await produtoResponse.json();
    produtoId = produtoBody._id; // Salva o ID do produto para ser usado no carrinho
  });

  // Após os testes, encerra o contexto
  test.afterAll(async () => {
    await apiContext.dispose();
  });

  // Teste para criar um carrinho
  test('POST - Criar carrinho', async () => {
    const carrinho = generateCartData(produtoId); // Gera dados para o carrinho usando o ID do produto criado
    const response = await apiContext.post('/carrinhos', {
      headers: { Authorization: token },
      data: carrinho,
    });
    const body = await response.json();

    // Valida o status e o ID do carrinho criado
    expect(response.status()).toBe(201);
    expect(body).toHaveProperty('_id');
    carrinhoId = body._id; // Salva o ID do carrinho para testes futuros
  });

  // Teste para listar carrinhos
  test('GET - Listar carrinhos', async () => {
    const response = await apiContext.get('/carrinhos');
    const body = await response.json();

    // Valida o status e se a lista de carrinhos está presente
    expect(response.status()).toBe(200);
    expect(body).toHaveProperty('carrinhos');
  });

  // Teste para obter um carrinho pelo ID
  test('GET/{id} - Obter carrinho pelo ID', async () => {
    const response = await apiContext.get(`/carrinhos/${carrinhoId}`);
    const body = await response.json();

    // Valida se o carrinho retornado corresponde ao ID esperado
    expect(response.status()).toBe(200);
    expect(body._id).toBe(carrinhoId);
  });

  // Teste para atualizar um carrinho
  test('PUT - Atualizar carrinho', async () => {
    const carrinhoAtualizado = {
      produtos: [
        {
          idProduto: produtoId,
          quantidade: 2, // Atualiza a quantidade do produto no carrinho
        },
      ],
    };
    const response = await apiContext.put(`/carrinhos/${carrinhoId}`, {
      headers: { Authorization: token },
      data: carrinhoAtualizado,
    });
    const body = await response.json();

    // Valida o status e a mensagem de sucesso
    expect(response.status()).toBe(200);
    expect(body.message).toBe('Registro alterado com sucesso');
  });

  // Teste para excluir um carrinho
  test('DELETE - Remover carrinho', async () => {
    const response = await apiContext.delete(`/carrinhos/${carrinhoId}`, {
      headers: { Authorization: token },
    });
    const body = await response.json();

    // Valida o status e a mensagem de sucesso
    expect(response.status()).toBe(200);
    expect(body.message).toBe('Registro excluído com sucesso');
  });
});
