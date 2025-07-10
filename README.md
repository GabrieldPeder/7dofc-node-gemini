# Smart Prompter API - #7DaysOfCode

![Status do CI](https://github.com/GabrieldPeder/Node-Gemini/actions/workflows/ci.yml/badge.svg)

Projeto desenvolvido como parte do desafio **#7DaysOfCode de Node.js** da Alura, focado na construção de uma API RESTful para gerir templates de prompts e interagir com a Inteligência Artificial do Google, Gemini.

## 📜 Sobre o Projeto

A **Smart Prompter API** é um servidor web construído com Node.js, Express e TypeScript. O seu objetivo é permitir que o utilizador guarde e organize uma coleção de "templates" de prompts, que podem ser categorizados e reutilizados. A aplicação também possui uma rota para testar a efetividade de um prompt diretamente com a API do Google Gemini.

## ✨ Funcionalidades

* **Integração com Gemini:** Uma rota (`/api/v1/chat`) que recebe um prompt e retorna a resposta gerada pelo modelo de IA `gemini-1.5-flash`.
* **CRUD de Templates e Categorias:** Funcionalidades completas para Criar, Ler, Atualizar e Apagar templates e categorias.
* **Relacionamento de Entidades:** Endpoints para associar e desassociar categorias a um template.
* **Documentação Interativa:** Uma página gerada com Swagger UI que documenta todos os endpoints da API.
* **Integração Contínua:** Os testes são executados automaticamente com GitHub Actions a cada pull request para garantir a qualidade do código.

## 🛠️ Tecnologias Utilizadas

* **Backend:** Node.js
* **Framework:** Express.js
* **Linguagem:** TypeScript
* **Testes:** Jest & Supertest
* **Documentação:** Swagger (OpenAPI)
* **CI/CD:** GitHub Actions
* **IA Generativa:** Google Gemini API

## 🚀 Como Executar o Projeto

Siga os passos abaixo para configurar e executar o projeto no seu ambiente local.

### Pré-requisitos

* [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
* [npm](https://www.npmjs.com/) (geralmente instalado com o Node.js)
* Uma chave de API do **Google Gemini**, que pode ser obtida no [Google AI Studio](https://aistudio.google.com/app/apikey).

### Instalação

1.  Clone este repositório. 
    ```bash
    git clone [https://github.com/GabrieldPeder/Node-Gemini.git](https://github.com/GabrieldPeder/Node-Gemini.git)
    cd Node-Gemini 
    ```

2.  Instale todas as dependências do projeto:
    ```bash
    npm install
    ```

### Configuração

1.  Na raiz do projeto, crie um ficheiro chamado `.env`.
2.  Dentro do `.env`, adicione a sua chave da API do Gemini no seguinte formato:
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

Para executar todos os testes de integração, use:

```bash
npm test
```

## 📖 Documentação da API

Este projeto inclui uma documentação interativa gerada com Swagger. Após iniciar o servidor, pode aceder à documentação no seu navegador:

**URL da Documentação:** [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Endpoints da API

* Consulte a [documentação interativa](#-documentação-da-api) para uma lista completa e detalhada de todos os endpoints.

---
_Projeto construído com base no desafio #7DaysOfCode._
```
</markdo
