import express from 'express';
import weatherController from '../controllers/weatherController.js';

const router = express.Router();

router.get('/current/:city', weatherController.getCurrentWeather);
router.get('/forecast/:city', weatherController.getForecast);

export default router;