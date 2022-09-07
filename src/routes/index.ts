import { Router } from "express";

import FormatterController from '@/controllers/formater.controller';
import UserController from "@/controllers/user.controller";
import AuthController from "@/controllers/auth.controller";
import ReportController from "@/controllers/report.controller";

const routes = Router();

routes.post('/formatter/export/excel', FormatterController.generateExcelFile);

routes.post('/auth/login', AuthController.login)

routes.post('/user/create', UserController.create);
routes.get('/user', UserController.find);

routes.post('/report/create', ReportController.create);

export default routes;