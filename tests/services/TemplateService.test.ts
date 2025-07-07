import { createTemplate } from '../../src/services/TemplateService';
import * as templateRepository from '../../src/repositories/TemplateRepository';
import { v4 as uuidv4 } from 'uuid';

// Simula o módulo 'uuid'
jest.mock('uuid'); 

// Simula nosso módulo de repositório
jest.mock('../../src/repositories/TemplateRepository');

describe('Template Service Unit Tests', () => {
    test('deve criar um novo template com um ID mockado', () => { 
        const templateData = {
            title: "Template de Teste",
            content: "Conteúdo do teste"
        };

        const mockTemplateId = "mock-uuid-12345";
        const mockSavedTemplate = { id: mockTemplateId, ...templateData };

        // Configura o valor de retorno do mock para a função uuidv4
        (uuidv4 as jest.Mock).mockReturnValue(mockTemplateId); 

        // Configura o valor de retorno do mock para a função saveTemplate
        (templateRepository.saveTemplate as jest.Mock).mockReturnValue(mockSavedTemplate);

        const result = createTemplate(templateData);

        // Verifica se o resultado é o esperado
        expect(result).toEqual(mockSavedTemplate); 
        // Verifica se a função uuidv4 foi chamada
        expect(uuidv4).toHaveBeenCalledTimes(1);
        // Verifica se a função do repositório foi chamada com os dados corretos
        expect(templateRepository.saveTemplate).toHaveBeenCalledWith(mockSavedTemplate);
    });
});