import * as templateRepository from '../repositories/TemplateRepository';
import { Template } from '../entities/Template';

// DTO (Data Transfer Object) para criar um template
interface CreateTemplateDTO {
    title: string;
    content: string;
}

/**
 * Lida com a lógica de negócio para criar um novo template.
 */
export const createTemplate = (data: CreateTemplateDTO): Template => {
    // A função saveTemplate do repositório agora espera apenas title e content
    return templateRepository.saveTemplate(data);
};

/**
 * Lida com a lógica de negócio para listar todos os templates.
 */
export const listAllTemplates = (): Template[] => {
    return templateRepository.findAllTemplates();
};

/**
 * Lida com a lógica de negócio para associar uma categoria a um template.
 */
export const linkCategoryToTemplate = (templateId: string, categoryId: string): Template | null => {
    return templateRepository.addCategoryToTemplate(templateId, categoryId);
};

/**
 * Lida com a lógica de negócio para desassociar uma categoria de um template.
 */
export const unlinkCategoryFromTemplate = (templateId: string, categoryId: string): Template | null => {
    return templateRepository.removeCategoryFromTemplate(templateId, categoryId);
};
