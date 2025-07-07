import { Router } from "express";
import * as templateService from '../services/TemplateService';

const router = Router();

// Rota: POST /api/v1/templates [cite: 160]
router.post('/templates', (req, res) => {
    try {
        const newTemplate = templateService.createTemplate(req.body);
        res.status(201).json(newTemplate);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
});

// Rota: GET /api/v1/templates [cite: 160]
router.get('/templates', (req, res) => {
    const allTemplates = templateService.listAllTemplates();
    res.status(200).json(allTemplates);
});

export default router;