import axios from 'axios';

const backendUrl = process.env.BACKEND_URL || 'http://backend:3000/api/readings';

// Função genérica para enviar a imagem do medidor para o backend
const sendMeterImage = async (meterType: string, imageUrl: string) => {
    try {
        const response = await axios.post(`${backendUrl}/api/readings`, { imageUrl });
        console.log(`Resposta do backend para o medidor de ${meterType}:`, response.data);
    } catch (error: any) {
        console.error(`Erro ao comunicar com o backend para o medidor de ${meterType}:`, error.message);
    }
};

// URLs das imagens de medidores
const waterMeterImageUrl = 'https://martinsferry.org/wp-content/themes/martinsferry2021/img/meter.png';
const gasMeterImageUrl = 'https://www.originenergy.com.au/wp-content/uploads/domestic-diaphragm-gas-meter-768x664.png';

// Enviar imagens para o backend
sendMeterImage('água', waterMeterImageUrl);
sendMeterImage('gás', gasMeterImageUrl);
