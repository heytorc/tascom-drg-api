"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var formater_controller_1 = __importDefault(require("../controllers/formater.controller"));
var routes = (0, express_1.Router)();
routes.post('/formatter/export/excel', formater_controller_1.default.generateExcelFile);
exports.default = routes;
//# sourceMappingURL=index.js.map