import { Router, Request, Response } from 'express';
import * as categoryRepository from '../repositories/CategoryRepository';

const router = Router();

// Rota: GET /categories -> Listar todas as categorias
router.get('/categories', (req: Request, res: Response) => {
  const categories = categoryRepository.findAll();
  res.status(200).json(categories);
});

// Rota: GET /categories/:id -> Buscar categoria por ID
router.get('/categories/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const category = categoryRepository.findById(id);
    if (!category) {
        return res.status(404).json({ message: 'Categoria não encontrada.' });
    }
    res.status(200).json(category);
});

// Rota: POST /categories -> Criar uma nova categoria
router.post('/categories', (req: Request, res: Response) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório.' });
  }
  const newCategory = categoryRepository.create(name, description);
  res.status(201).json(newCategory);
});

// Rota: PUT /categories/:id -> Atualizar uma categoria
router.put('/categories/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'O campo "name" é obrigatório.' });
    }
    const updatedCategory = categoryRepository.update(id, name, description);
    if (!updatedCategory) {
        return res.status(404).json({ message: 'Categoria não encontrada.' });
    }
    res.status(200).json(updatedCategory);
});

// Rota: DELETE /categories/:id -> Deletar uma categoria
router.delete('/categories/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedCategory = categoryRepository.remove(id);
    if (!deletedCategory) {
        return res.status(404).json({ message: 'Categoria não encontrada.' });
    }
    // Retorna 204 No Content para indicar sucesso sem corpo na resposta
    res.status(204).send();
});


export default router;
