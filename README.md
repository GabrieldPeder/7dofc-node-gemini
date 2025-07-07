# Smart Prompter API - #7DaysOfCode

Projeto desenvolvido como parte do desafio **#7DaysOfCode de Node.js** da Alura, focado na construção de uma API RESTful para gerenciar templates de prompts e interagir com a Inteligência Artificial do Google, Gemini.

## 📜 Sobre o Projeto

A **Smart Prompter API** é um servidor web construído com Node.js, Express e TypeScript. Seu objetivo é permitir que o usuário salve e organize uma coleção de "templates" de prompts, que podem ser categorizados e reutilizados. A aplicação também possui uma rota para testar a efetividade de um prompt diretamente com a API do Google Gemini.

## ✨ Funcionalidades

* **Integração com Gemini:** Uma rota (`/api/v1/chat`) que recebe um prompt e retorna a resposta gerada pelo modelo de IA `gemini-1.5-flash`. 
* **CRUD de Templates:** Funcionalidades completas para Criar, Ler, Atualizar e Deletar templates de prompts (armazenados em memória). 
* **CRUD de Categorias:** Funcionalidades completas para Criar, Ler, Atualizar e Deletar categorias, permitindo a organização dos templates. 
* **Ambiente de Testes:** O projeto é configurado com Jest e Supertest para garantir a qualidade e o funcionamento correto do código através de testes unitários e de integração. 

## 🛠️ Tecnologias Utilizadas

* **Backend:** Node.js
* **Framework:** Express.js
* **Linguagem:** TypeScript
* **Testes:** Jest & Supertest 
* **IA Generativa:** Google Gemini API 

## 🚀 Como Executar o Projeto

Siga os passos abaixo para configurar e rodar o projeto em seu ambiente local.

### Pré-requisitos

* [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
* [npm](https://www.npmjs.com/) (geralmente instalado com o Node.js)
* Uma chave de API do **Google Gemini**, que pode ser obtida no [Google AI Studio](https://aistudio.google.com/app/apikey).

### Instalação

1.  Clone este repositório:
    ```bash
    git clone [https://github.com/seu-usuario/7dofc-node-gemini.git](https://github.com/seu-usuario/7dofc-node-gemini.git)
    cd 7dofc-node-gemini
    ```

2.  Instale todas as dependências do projeto:
    ```bash
    npm install
    ```

### Configuração

1.  Na raiz do projeto, crie um arquivo chamado `.env`.
2.  Dentro do `.env`, adicione sua chave da API do Gemini no seguinte formato:
    ```env
    GEMINI_API_KEY="SUA_CHAVE_API_AQUI"
    ```

### Executando a Aplicação

Para iniciar o servidor em modo de desenvolvimento (com recarregamento automático a cada alteração), execute:

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`. 

### Executando os Testes

Para rodar todos os testes unitários e de integração, execute:

```bash
npm test
```

Para gerar um relatório de cobertura de testes, use:
```bash
npm run test:coverage
```

## Endpoints da API

Aqui estão os principais endpoints disponíveis na API:

### Chat com Gemini
* `POST /api/v1/chat`
    * **Corpo da requisição (JSON):** `{ "prompt": "Qual é a capital do Brasil?" }`
    * **Resposta:** Retorna a resposta gerada pela IA.

### Categorias
* `GET /api/v1/categories` - Lista todas as categorias.
* `POST /api/v1/categories` - Cria uma nova categoria.
* `GET /api/v1/categories/:id` - Busca uma categoria por ID.
* `PUT /api/v1/categories/:id` - Atualiza uma categoria por ID.
* `DELETE /api/v1/categories/:id` - Deleta uma categoria por ID.

### Templates
* `GET /api/v1/templates` - Lista todos os templates.
* `POST /api/v1/templates` - Cria um novo template.

---
_Projeto construído com base no desafio #7DaysOfCode._
```
</markdo
