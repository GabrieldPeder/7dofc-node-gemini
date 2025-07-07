import { app } from '../../../src/app'; 
import supertest from 'supertest';
// Descreve o conjunto de testes para as rotas de Categorias
describe('Category API Integration Tests', () => {
    let createdCategoryId: string;

    // Teste 1: Verifica se a lista começa vazia
    test('GET /api/v1/categories - Deve retornar uma lista vazia quando nenhuma categoria foi cadastrada', async () => {
        const response = await supertest(app).get('/api/v1/categories');
        
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]); // O corpo da resposta deve ser um array vazio
    });

    // Teste 2: Cria uma nova categoria
    test('POST /api/v1/categories - Deve cadastrar uma nova categoria com sucesso', async () => {
        const newCategory = {
            name: "Testes de Integração",
            description: "Categoria para testes com Supertest"
        };

        const response = await supertest(app)
            .post('/api/v1/categories')
            .send(newCategory);

        expect(response.status).toBe(201); // 201 Created
        expect(response.body.id).toBeDefined(); // Verifica se um ID foi retornado
        expect(response.body.name).toBe(newCategory.name);
        
        // Guarda o ID da categoria criada para usar nos próximos testes
        createdCategoryId = response.body.id;
    });

    // Teste 3: Busca a categoria que acabamos de criar
    test('GET /api/v1/categories/:id - Deve retornar a categoria recém-criada', async () => {
        const response = await supertest(app).get(`/api/v1/categories/${createdCategoryId}`);
        
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(createdCategoryId);
        expect(response.body.name).toBe("Testes de Integração");
    });
    
    // Teste 4: Atualiza a categoria
    test('PUT /api/v1/categories/:id - Deve atualizar a categoria criada', async () => {
        const updatedData = {
            name: "Testes de Integração (Atualizado)",
            description: "Descrição atualizada."
        };
        
        const response = await supertest(app)
            .put(`/api/v1/categories/${createdCategoryId}`)
            .send(updatedData);
            
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(updatedData.name);
        expect(response.body.description).toBe(updatedData.description);
    });
    
    // Teste 5: Deleta a categoria
    test('DELETE /api/v1/categories/:id - Deve deletar a categoria criada', async () => {
        const response = await supertest(app).delete(`/api/v1/categories/${createdCategoryId}`);
        
        expect(response.status).toBe(204); // 204 No Content
    });

    // Teste 6: Verifica se a categoria foi realmente deletada
    test('GET /api/v1/categories/:id - Deve retornar erro 404 ao buscar categoria deletada', async () => {
        const response = await supertest(app).get(`/api/v1/categories/${createdCategoryId}`);
        
        expect(response.status).toBe(404); // 404 Not Found
    });
});
