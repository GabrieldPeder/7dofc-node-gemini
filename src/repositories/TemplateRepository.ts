import { Template } from "../entities/Template";

const templates: Template[] = []; // Nosso "banco de dados" em memória [cite: 148]

export const saveTemplate = (template: Template): Template => {
    templates.push(template);
    return template;
};

export const findAllTemplates = (): Template[] => {
    return templates;
};