// Define a estrutura de dados para uma Categoria.
// O '?' torna o campo 'description' opcional, como pedido no desafio.
export interface Category {
  id: string;
  name: string;
  description?: string;
}
