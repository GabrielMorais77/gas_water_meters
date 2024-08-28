import axios from 'axios';
import { config } from '../config';

export const getReadingFromImage = async (imageUrl: string): Promise<number> => {
    try {
    const response = await axios.post('https://gemini-api-url.com/analyze', {
        imageUrl,
        apiKey: config.geminiApikey,
    });
    return response.data.reading;
} catch (error) {
    console.error('Erro ao comunicar com a API Gemini:', error);
    throw new Error('Erro ao processar a imagem.');
}
};
