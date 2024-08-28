import dotenv from 'dotenv';

dotenv.config();

export const config = {
    geminiApikey: process.env.GEMINI_API_KEY!,
    port: process.env.PORT || 3000,
};
