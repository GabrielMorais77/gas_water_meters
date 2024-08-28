import { Request, Response } from 'express';
import { Reading } from '../models/reading';
import { getReadingFromImage } from '../services/geminiServices';

const readings: Reading[] = [];

export const createReading = async (req: Request, res: Response) => {
    const { imageUrl } = req.body;

    try {
    const value = await getReadingFromImage(imageUrl);
    const reading: Reading = {
        id: `${readings.length + 1}`,
        timestamp: new Date(),
        value,
        confirmed: false,
    };

    readings.push(reading);
    res.status(201).json(reading);
} catch (error) {
    if (error instanceof Error) {
        res.status(500).json({ error: error.message });
    } else {
        res.status(500).json({ error: 'Ocorreu um erro desconhecido.' });
    }
}
};

export const getReadings = (req: Request, res: Response) => {
    res.json(readings);
};

export const updateReading = (req: Request, res: Response) => {
    const { id } = req.params;
    const { confirmed } = req.body;
    const reading = readings.find(r => r.id === id);
    if (reading) {
    reading.confirmed = confirmed;
    res.json(reading);
} else {
    res.status(404).json({ error: 'Leitura não encontrada' });
}
};
