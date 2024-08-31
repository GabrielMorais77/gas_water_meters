import axios from 'axios';

export const fetchImageBuffer = async (imageUrl: string): Promise<Buffer> => {
    try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        return Buffer.from(response.data);
    } catch (error) {
        throw new Error('Erro ao buscar o buffer da imagem.');
    }
};
