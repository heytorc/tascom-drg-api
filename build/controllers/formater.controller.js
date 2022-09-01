"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var xlsx_1 = __importDefault(require("xlsx"));
var generateExcelFile = function (request, response) {
    var fileName = 'exportacao-drg.xlsx';
    var body = request.body;
    var workBook = xlsx_1.default.utils.book_new();
    var workSheetData = body;
    var workSheet = xlsx_1.default.utils.aoa_to_sheet(workSheetData);
    xlsx_1.default.utils.book_append_sheet(workBook, workSheet, 'drg');
    xlsx_1.default.writeFile(workBook, fileName);
    response.download(fileName);
};
exports.default = { generateExcelFile: generateExcelFile };
//# sourceMappingURL=formater.controller.js.map