# **Projeto de Testes Automatizados com Playwright - API ServeRest**

Este projeto consiste na criação e execução de testes automatizados utilizando o framework Playwright para a API da ServeRest. O foco está na validação completa das principais rotas da API, abrangendo métodos HTTP (`GET`, `POST`, `PUT`, `DELETE`) e testes de fluxos integrados, garantindo a funcionalidade e a consistência da aplicação.

---

## **Índice**

- [Pré-requisitos](#pré-requisitos)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Execução dos Testes](#execução-dos-testes)
- [Descrição dos Testes](#descrição-dos-testes)
- [Gerando Relatórios](#gerando-relatórios)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

---

## **Pré-requisitos**

Antes de iniciar, é necessário ter os seguintes itens instalados no ambiente local:

1. **Node.js** (versão 16 ou superior)  
   - [Download Node.js](https://nodejs.org/en/download/)  
2. **Playwright**  
   - Instalado via NPM, conforme descrito na seção de instalação.  
3. **API ServeRest**  
   - Deve estar rodando localmente. Instale executando o comando abaixo:  
     ```bash
     npx serverest@latest
     ```  
   A API estará disponível em: [http://localhost:3000](http://localhost:3000).

---

## **Estrutura do Projeto**

A estrutura do projeto segue as boas práticas de organização:

```plaintext
├── tests/
│   ├── usuarios.spec.js      # Testes para a rota /usuarios
│   ├── login.spec.js         # Testes para a rota /login
│   ├── produtos.spec.js      # Testes para a rota /produtos
│   ├── carrinhos.spec.js     # Testes para a rota /carrinhos
├── utils/
│   └── dataUtils.js          # Funções para gerar dados dinâmicos
├── playwright.config.js      # Configuração do Playwright
├── package.json              # Dependências e scripts do projeto
├── README.md                 # Documentação do projeto
```

---

## **Instalação**

1. Clone o repositório:
   ```bash
   git clone https://github.com/Vicenzo-Az/Teste-com-Playwright.git
   cd serverest-tests
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Instale os navegadores do Playwright:
   ```bash
   npx playwright install
   ```

---

## **Configuração**

### Configuração do Navegador
Por padrão, o Playwright utiliza o navegador **Firefox** para a execução dos testes. Se desejar alterar para outro navegador, edite o arquivo `playwright.config.js`:

```javascript
use: {
  browserName: 'firefox', // Altere para 'chromium' ou 'webkit' se necessário
},
```

---

## **Execução dos Testes**

1. Execute todos os testes:
   ```bash
   npx playwright test
   ```

2. Execute os testes de uma rota específica:
   ```bash
   npx playwright test tests/usuarios.spec.js
   ```

3. Modo interativo para depuração:
   ```bash
   npx playwright test --headed
   ```

---

## **Descrição dos Testes**

### **Rota `/usuarios`**
Testes cobrindo os métodos:
- **POST:** Criação de usuários (admin e padrão).
- **GET:** Listagem de todos os usuários.
- **GET/{id}:** Consulta de usuário por ID.
- **PUT:** Atualização de informações do usuário.
- **DELETE:** Exclusão de usuário por ID.

### **Rota `/login`**
- **POST:** Validação de login com usuários válidos e inválidos.

### **Rota `/produtos`**
- **POST:** Criação de produtos.
- **GET:** Listagem de produtos.
- **GET/{id}:** Detalhamento de produto pelo ID.
- **PUT:** Atualização de informações de produto.
- **DELETE:** Exclusão de produto por ID.

### **Rota `/carrinhos`**
- **POST:** Criação de carrinhos com produtos.
- **GET:** Listagem de carrinhos.
- **GET/{id}:** Detalhamento de carrinho por ID.
- **PUT:** Atualização de carrinho.
- **DELETE:** Remoção de carrinho.

### **Fluxo Integrado**
Inclui:
1. Criação de um usuário.
2. Login do usuário.
3. Criação de um produto.
4. Adição do produto ao carrinho.
5. Validação do carrinho criado.

---

## **Gerando Relatórios**

Os relatórios são gerados automaticamente após a execução dos testes.

1. Para acessar o relatório:
   ```bash
   npx playwright show-report
   ```

2. O relatório estará disponível em formato visual no navegador padrão.


----------------------------------------------------------

