import { Request, Response } from 'express'
import xlsx from 'xlsx'

const generateExcelFile = (request: Request, response: Response) => {
  const fileName = 'exportacao-drg.xlsx';
  const { body } = request;

  const workBook = xlsx.utils.book_new();
  const workSheetData = body;

  const workSheet = xlsx.utils.json_to_sheet(workSheetData);
  xlsx.utils.book_append_sheet(workBook, workSheet, 'drg');
  xlsx.writeFile(workBook, fileName);

  response.download(fileName)
};

export default { generateExcelFile }