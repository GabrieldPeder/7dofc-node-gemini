import { Category } from "../entities/Category";

// Nosso "banco de dados" em memória para categorias
const categories: Category[] = [];
let nextId = 1; // Uma forma simples de gerar IDs únicos em memória

// Encontra todas as categorias
export const findAll = (): Category[] => {
  return categories;
};

// Encontra uma categoria pelo seu ID
export const findById = (id: string): Category | undefined => {
  return categories.find((category) => category.id === id);
};

// Salva uma nova categoria
export const create = (name: string, description?: string): Category => {
  const newCategory: Category = {
    id: String(nextId++), // Converte o número para string
    name,
    description,
  };
  categories.push(newCategory);
  return newCategory;
};

// Atualiza uma categoria existente
export const update = (
  id: string,
  name: string,
  description?: string
): Category | undefined => {
  const categoryIndex = categories.findIndex((category) => category.id === id);
  if (categoryIndex === -1) {
    return undefined; // Retorna undefined se não encontrar
  }
  const updatedCategory = { ...categories[categoryIndex], name, description };
  categories[categoryIndex] = updatedCategory;
  return updatedCategory;
};

// Deleta uma categoria
export const remove = (id: string): Category | undefined => {
  const categoryIndex = categories.findIndex((category) => category.id === id);
  if (categoryIndex === -1) {
    return undefined; // Retorna undefined se não encontrar
  }
  // 'splice' remove o item e retorna um array com os itens removidos
  const [removedCategory] = categories.splice(categoryIndex, 1);
  return removedCategory;
};
