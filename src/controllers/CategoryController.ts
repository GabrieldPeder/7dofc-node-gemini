import { Router, Request, Response } from 'express';
import * as categoryRepository from '../repositories/CategoryRepository';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: O ID gerado para a categoria.
 *         name:
 *           type: string
 *           description: O nome da categoria.
 *         description:
 *           type: string
 *           description: A descrição opcional da categoria.
 *       example:
 *         id: "1"
 *         name: "Trabalho"
 *         description: "Prompts para tarefas de trabalho"
 */

/**
 * @swagger
 * tags:
 *   - name: Categories
 *     description: API para gerenciamento de Categorias
 */

/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     summary: Lista todas as categorias
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Sucesso. Retorna a lista de categorias.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get('/categories', async (req: Request, res: Response) => {
  const categories = await categoryRepository.findAll();
  res.status(200).json(categories);
});

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   get:
 *     summary: Busca uma categoria pelo seu ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID da categoria
 *     responses:
 *       200:
 *         description: A categoria encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Categoria não encontrada.
 */
router.get('/categories/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await categoryRepository.findById(id);
  if (!category) {
    return res.status(404).json({ message: 'Categoria não encontrada.' });
  }
  res.status(200).json(category);
});

/**
 * @swagger
 * /api/v1/categories:
 *   post:
 *     summary: Cria uma nova categoria
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               name: "Estudos"
 *               description: "Prompts para ajudar nos estudos"
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Erro na requisição (ex: nome faltando).
 */
router.post('/categories', async (req: Request, res: Response) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório.' });
  }
  const newCategory = await categoryRepository.create(name, description);
  res.status(201).json(newCategory);
});

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   put:
 *     summary: Atualiza uma categoria existente
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID da categoria a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               name: "Estudos Avançados"
 *               description: "Prompts para mestrado"
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Categoria não encontrada.
 */
router.put('/categories/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório.' });
  }
  const updatedCategory = await categoryRepository.update(id, name, description);
  if (!updatedCategory) {
    return res.status(404).json({ message: 'Categoria não encontrada.' });
  }
  res.status(200).json(updatedCategory);
});

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   delete:
 *     summary: Deleta uma categoria
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID da categoria a ser deletada
 *     responses:
 *       204:
 *         description: Categoria deletada com sucesso (sem conteúdo).
 *       404:
 *         description: Categoria não encontrada.
 */
router.delete('/categories/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedCategory = await categoryRepository.remove(id);
  if (!deletedCategory) {
    return res.status(404).json({ message: 'Categoria não encontrada.' });
  }
  res.status(204).send();
});

export default router;
