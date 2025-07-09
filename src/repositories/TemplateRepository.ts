import { Template } from "../entities/Template";
// Precisamos verificar se a categoria existe antes de associá-la
import { findById as findCategoryById } from "./CategoryRepository";

// Nosso "banco de dados" em memória para templates
const templates: Template[] = [];
let nextId = 1;

export const saveTemplate = (data: {
  title: string;
  content: string;
}): Template => {
  const newTemplate: Template = {
    id: `template-${nextId++}`, // ID simples para o exemplo
    title: data.title,
    content: data.content,
    categoryIds: [], // Importante: inicializa o array de categorias como vazio
  };
  templates.push(newTemplate);
  return newTemplate;
};

export const findAllTemplates = (): Template[] => {
  return templates;
};

export const findTemplateById = (id: string): Template | undefined => {
  return templates.find((t) => t.id === id);
};

// --- NOVAS FUNÇÕES ---

/**
 * Associa uma categoria existente a um template existente.
 * @param templateId ID do template
 * @param categoryId ID da categoria
 * @returns O template atualizado ou null se o template/categoria não for encontrado.
 */
export const addCategoryToTemplate = (
  templateId: string,
  categoryId: string
): Template | null => {
  const template = findTemplateById(templateId);
  const category = findCategoryById(categoryId);

  // Retorna null se o template ou a categoria não existirem
  if (!template || !category) {
    return null;
  }

  // Evita adicionar IDs duplicados
  if (!template.categoryIds.includes(categoryId)) {
    template.categoryIds.push(categoryId);
  }

  return template;
};

/**
 * Desassocia uma categoria de um template.
 * @param templateId ID do template
 * @param categoryId ID da categoria
 * @returns O template atualizado ou null se o template não for encontrado.
 */
export const removeCategoryFromTemplate = (
  templateId: string,
  categoryId: string
): Template | null => {
  const template = findTemplateById(templateId);

  // Não precisamos verificar se a categoria existe para remover uma associação
  if (!template) {
    return null;
  }

  // Filtra o array, mantendo todos os IDs, exceto o que queremos remover
  template.categoryIds = template.categoryIds.filter((id) => id !== categoryId);

  return template;
};
