import supertest from 'supertest';
// CORREÇÃO: O caminho correto para a raiz do projeto é subir 3 níveis (../)
import { app } from '../../../src/app'; 

describe('Template API Integration Tests', () => {
    test('GET /api/v1/templates - deve retornar uma lista vazia inicialmente', async () => {
        const response = await supertest(app).get('/api/v1/templates');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    test('POST /api/v1/templates - deve criar um novo template e retorná-lo', async () => {
        const newTemplate = {
            title: "Primeiro Template",
            content: "Este é o conteúdo."
        };

        const response = await supertest(app)
            .post('/api/v1/templates')
            .send(newTemplate);

        expect(response.status).toBe(201);
        expect(response.body.id).toBeDefined();
        expect(response.body.title).toBe(newTemplate.title);
    });
});