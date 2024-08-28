import { Router } from "express";
import { createReading, getReadings, updateReading } from "../controllers/readingcontroller";

const router = Router();

router.post('/readings', createReading);
router.get('/readings', getReadings);
router.patch('/readings/:id', updateReading);

export default router;