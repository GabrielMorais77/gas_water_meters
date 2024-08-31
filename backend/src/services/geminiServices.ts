import axios from 'axios';
import { config } from '../config';

export const getReadingFromImage = async (imageBuffer: Buffer): Promise<number> => {
    try {
    const response = await axios.post('https://gemini-api-url.com/analyze', {
        image: imageBuffer,
        apiKey: config.geminiApikey,
    }, {
        headers: {
        'Content-Type': 'image/jpeg',
    },
    });
    return response.data.reading;
} catch (error) {
    console.error('Erro ao comunicar com a API Gemini:', error);
    throw new Error('Erro ao processar a imagem.');
}
};