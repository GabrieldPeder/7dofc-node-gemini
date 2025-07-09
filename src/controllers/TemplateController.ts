import { Router, Request, Response } from "express";
import * as templateService from '../services/TemplateService';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Template:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         id:
 *           type: string
 *           description: O ID gerado para o template.
 *         title:
 *           type: string
 *           description: O título do template.
 *         content:
 *           type: string
 *           description: O conteúdo do prompt do template.
 *         categoryIds:
 *           type: array
 *           items:
 *             type: string
 *           description: Uma lista de IDs de categorias associadas.
 *       example:
 *         id: "template-1"
 *         title: "Gerador de E-mail"
 *         content: "Escreva um e-mail profissional para..."
 *         categoryIds: ["1", "3"]
 */

/**
 * @swagger
 * tags:
 *   - name: Templates
 *     description: API para gerenciamento de Templates de Prompts
 */

/**
 * @swagger
 * /api/v1/templates:
 *   post:
 *     summary: Cria um novo template
 *     tags: [Templates]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *             example:
 *               title: "Resumo de Artigo"
 *               content: "Resuma o seguinte artigo em 3 pontos principais: [TEXTO]"
 *     responses:
 *       201:
 *         description: Template criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Template'
 *       400:
 *         description: Erro na requisição.
 */
router.post('/templates', async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Os campos 'title' e 'content' são obrigatórios." });
    }
    const newTemplate = await templateService.createTemplate({ title, content });
    res.status(201).json(newTemplate);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

/**
 * @swagger
 * /api/v1/templates:
 *   get:
 *     summary: Lista todos os templates
 *     tags: [Templates]
 *     responses:
 *       200:
 *         description: Sucesso. Retorna a lista de templates.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Template'
 */
router.get('/templates', async (req: Request, res: Response) => {
  const allTemplates = await templateService.listAllTemplates();
  res.status(200).json(allTemplates);
});

/**
 * @swagger
 * /api/v1/templates/{templateId}/categories/{categoryId}:
 *   post:
 *     summary: Associa uma categoria a um template
 *     tags: [Templates]
 *     parameters:
 *       - in: path
 *         name: templateId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Associação bem-sucedida.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Template'
 *       404:
 *         description: Template ou Categoria não encontrada.
 */
router.post('/templates/:templateId/categories/:categoryId', async (req: Request, res: Response) => {
  const { templateId, categoryId } = req.params;
  const result = await templateService.linkCategoryToTemplate(templateId, categoryId);
  if (!result) {
    return res.status(404).json({ message: "Template ou Categoria não encontrada." });
  }
  res.status(200).json(result);
});

/**
 * @swagger
 * /api/v1/templates/{templateId}/categories/{categoryId}:
 *   delete:
 *     summary: Desassocia uma categoria de um template
 *     tags: [Templates]
 *     parameters:
 *       - in: path
 *         name: templateId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Desassociação bem-sucedida.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Template'
 *       404:
 *         description: Template não encontrado.
 */
router.delete('/templates/:templateId/categories/:categoryId', async (req: Request, res: Response) => {
  const { templateId, categoryId } = req.params;
  const result = await templateService.unlinkCategoryFromTemplate(templateId, categoryId);
  if (!result) {
    return res.status(404).json({ message: "Template não encontrado." });
  }
  res.status(200).json(result);
});

export default router;
