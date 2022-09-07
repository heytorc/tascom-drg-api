import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface ICreateReportRequest {
  initialDate: string,
  finalDate: string,
  dateType: string,
  total: number,
  created_by: number
  data: any[]
}

const create = async (request: Request<any, any, ICreateReportRequest>, response: Response) => {
  try {
    const { body } = request;

    const report = await prisma.reports.create({
      data: {
        start_at: new Date(body.initialDate),
        end_at: new Date(body.finalDate),
        total: body.total,
        data: body.data,
        created_by: body.created_by
      },
    });

    return response.status(200).json(report);
  } catch (error: any) {
    return response.status(500).json({ message: error.message, error });
  }
};

export default { create }