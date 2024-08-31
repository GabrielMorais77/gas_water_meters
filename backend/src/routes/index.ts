import { Router } from 'express';
import multer from 'multer';
import { createReading, getReadings, updateReading } from '../controllers/readingcontroller';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() }); // Armazenamento em memória para uploads de arquivos

router.post('/readings', upload.single('image'), createReading); // Middleware para upload de imagem
router.get('/readings', getReadings);
router.patch('/readings/:id', updateReading);

export default router;
