import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt';

const prisma = new PrismaClient()

interface ICreateUserRequest {
  name: string,
  username: string,
  password: string,
  type: 'ADMIN' | 'USER',
}

interface IFindUser {
  id: number,
}

const create = async (request: Request<any, any, ICreateUserRequest>, response: Response) => {
  try {
    const { body } = request;

    body.password = await bcrypt.hash(body.password, 10)

    const { password, ...user } = await prisma.user.create({
      data: body,
    });

    return response.status(200).json(user);
  } catch (error: any) {
    return response.status(500).json({ message: error.message, error });
  }
};

const find = async (request: Request<any, any, any, IFindUser>, response: Response) => {
  try {
    const { id } = request.query;

    const user = await prisma.user.findFirst({ where: { id } })

    return (user) ? response.status(200).json(user) :  response.status(404).json({ message: 'USER_NOT_FOUND' });
  } catch (error: any) {
    return response.status(500).json({ message: error.message, error });
  }
};

export default { create, find }