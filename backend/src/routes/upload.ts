
import axios from 'axios';
import { Request, Response, Router } from 'express';
import Joi from 'joi';
import { Op } from 'sequelize';
import { Reading } from '../models/reading';

const router = Router();


const schema = Joi.object({
  image: Joi.string().base64().required(),
  customer_code: Joi.string().required(),
  measure_datetime: Joi.date().iso().required(),
  measure_type: Joi.string().valid('WATER', 'GAS').required(),
});


async function checkExistingReading(customer_code: string, measure_type: string, measure_datetime: Date) {
  const startDate = new Date(measure_datetime.getFullYear(), measure_datetime.getMonth(), 1);
  const endDate = new Date(measure_datetime.getFullYear(), measure_datetime.getMonth() + 1, 0);

  const existingReading = await Reading.findOne({
    where: {
      customer_code,
      measure_type,
      measure_datetime: {
        [Op.between]: [startDate, endDate]
      }
    }
  });

  return existingReading;
}


router.post('/upload', async (req: Request, res: Response) => {

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: error.details.map(detail => detail.message).join(', ')
    });
  }

  const { image, customer_code, measure_datetime, measure_type } = req.body;

  try {

    const existingReading = await checkExistingReading(customer_code, measure_type, new Date(measure_datetime));
    if (existingReading) {
      return res.status(409).json({
        error_code: 'DOUBLE_REPORT',
        error_description: 'Leitura do mês já realizada'
      });
    }


    const response = await axios.post('https://api.example.com/llm-service', {
      image
    });

    const { image_url, measure_value, measure_uuid } = response.data;

    res.status(200).json({
      image_url,
      measure_value,
      measure_uuid
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error_code: 'INTERNAL_ERROR',
      error_description: 'Ocorreu um erro interno no servidor'
    });
  }
});

export default router;