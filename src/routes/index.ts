import { Router } from "express";

import FormatterController from '@/controllers/formater.controller';

const routes = Router();

routes.post('/formatter/export/excel', FormatterController.generateExcelFile);

export default routes;