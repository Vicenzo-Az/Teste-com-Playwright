// Gera dados de usuário
const generateUserData = () => ({
    nome: `Usuario_${Date.now()}`,
    email: `email_${Date.now()}@teste.com`,
    password: '123456',
    administrador: 'true',
  });
  
  // Gera dados de usuário administrador
  const generateAdminUser = () => ({
    nome: `Admin_${Date.now()}`,
    email: `admin_${Date.now()}@teste.com`,
    password: '123456',
    administrador: 'true',
  });
  
  // Gera dados de produto
  const generateProductData = () => ({
    nome: `Produto_${Date.now()}`,
    preco: 100,
    descricao: 'Descricao do produto',
    quantidade: 10,
  });
  
  // Gera dados de carrinho
  const generateCartData = (produtoId) => ({
    produtos: [
      {
        idProduto: produtoId,
        quantidade: 1,
      },
    ],
  });
  
  // Exporta as funções utilitárias
  module.exports = {
    generateUserData,
    generateAdminUser,
    generateProductData,
    generateCartData,
  };
  