import { Router, Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = Router();

// --- Configuração da API do Gemini ---
const geminiApiKey = process.env.GEMINI_API_KEY;
if (!geminiApiKey) {
    throw new Error("Chave da API do Gemini não encontrada. Verifique o arquivo .env");
}
const genAI = new GoogleGenerativeAI(geminiApiKey);

// Rota: POST /chat
// Note que o caminho agora é relativo ao ponto onde o router será montado
router.post('/chat', async (req: Request, res: Response) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ error: 'O campo "prompt" é obrigatório no corpo da requisição.' });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        return res.json({ response: text });
    } catch (error) {
        console.error("Erro na rota /chat:", error);
        return res.status(500).json({ error: 'Erro ao se comunicar com a API do Gemini.' });
    }
});

export default router;
