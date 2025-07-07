import { v4 as uuidv4 } from 'uuid';
import * as templateRepository from '../repositories/TemplateRepository';
import { Template } from '../entities/Template';

interface CreateTemplateDTO {
    title: string;
    content: string;
}

export const createTemplate = (data: CreateTemplateDTO): Template => {
    const newTemplate: Template = {
        id: uuidv4(),
        title: data.title,
        content: data.content,
    };
    return templateRepository.saveTemplate(newTemplate); 
};

export const listAllTemplates = (): Template[] => {
    return templateRepository.findAllTemplates();
};