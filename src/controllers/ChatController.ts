import { Router, Request, Response, RequestHandler } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = Router();

// --- Configuração da API do Gemini ---
const geminiApiKey = process.env.GEMINI_API_KEY;
if (!geminiApiKey) {
  throw new Error("Chave da API do Gemini não encontrada. Verifique o arquivo .env");
}
const genAI = new GoogleGenerativeAI(geminiApiKey);

/**
 * @swagger
 * tags:
 *   - name: Gemini Chat
 *     description: Interação direta com a IA do Google Gemini
 */

/**
 * @swagger
 * /api/v1/chat:
 *   post:
 *     summary: Envia um prompt para a IA Gemini
 *     tags: [Gemini Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prompt:
 *                 type: string
 *             example:
 *               prompt: "Qual é a distância da Terra até a Lua?"
 *     responses:
 *       200:
 *         description: Resposta da IA.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *       400:
 *         description: Prompt não fornecido na requisição.
 *       500:
 *         description: Erro interno ao se comunicar com a API do Gemini.
 */
const handleChatRequest: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'O campo "prompt" é obrigatório no corpo da requisição.' });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);

    const responseText = result?.response?.text();

    if (!responseText) {
      return res.status(500).json({ error: 'A IA não retornou uma resposta válida.' });
    }

    return res.json({ response: responseText });
  } catch (error) {
    console.error("Erro na rota /chat:", error);
    return res.status(500).json({ error: 'Erro ao se comunicar com a API do Gemini.' });
  }
};

router.post('/chat', handleChatRequest);

export default router;
