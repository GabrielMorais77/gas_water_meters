import { Request, Response } from 'express';
import { Reading } from '../models/reading';
import { fetchImageBuffer } from '../utils'; // Ajuste o caminho conforme necessário

export const createReading = async (req: Request, res: Response) => {
    const { imageUrl } = req.body;

    if (!imageUrl || typeof imageUrl !== 'string') {
        return res.status(400).json({ error: 'URL da imagem inválida.' });
    }

    try {
        const valueBuffer = await fetchImageBuffer(imageUrl);
        const value = valueBuffer.readUIntBE(0, valueBuffer.length); // Ajuste conforme o formato do seu valor
        const reading = await Reading.create({
            reading_value: value,
            timestamp: new Date(),
            confirmed: false,
        });

        res.status(201).json(reading);
    } catch (error) {
        console.error('Error fetching reading from image:', error);
        res.status(500).json({ error: 'Erro ao processar a imagem.' });
    }
};

export const getReadings = async (req: Request, res: Response) => {
    try {
        const readings = await Reading.findAll();
        res.status(200).json(readings);
    } catch (error) {
        console.error('Error fetching readings:', error);
        res.status(500).json({ error: 'Erro ao buscar as leituras.' });
    }
};

export const updateReading = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { confirmed } = req.body;

    if (typeof confirmed !== 'boolean') {
        return res.status(400).json({ error: 'O campo confirmado deve ser um booleano.' });
    }

    try {
        const [updated] = await Reading.update({ confirmed }, {
            where: { id },
            returning: true
        });
        if (updated) {
            const updatedReading = await Reading.findByPk(id);
            res.status(200).json(updatedReading);
        } else {
            res.status(404).json({ error: 'Leitura não encontrada.' });
        }
    } catch (error) {
        console.error('Error updating reading:', error);
        res.status(500).json({ error: 'Erro ao atualizar a leitura.' });
    }
};
