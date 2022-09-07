import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt';

const prisma = new PrismaClient()

interface ILoginUser {
  username: string,
  password: string
}

const login = async (request: Request<any, any, ILoginUser>, response: Response) => {
  try {
    const { username, password } = request.body;

    if (!username) return response.status(500).json({ message: 'USERNAME_PARAM_INVALID' });
    if (!password) return response.status(500).json({ message: 'PASSWORD_PARAM_INVALID' });

    const userData = await prisma.user.findFirst({ where: { username } });

    if (!userData) return response.status(500).json({ message: 'USERNAME_INVALID' })

    const { password: pass, ...user } = userData;

    const passwordIsValid = await bcrypt.compare(password, pass);

    if (!passwordIsValid) return response.status(500).json({ message: 'PASSWORD_INVALID' })

    return (user) ? response.status(200).json(user) :  response.status(404).json({ message: 'USER_NOT_FOUND' });
  } catch (error: any) {
    return response.status(500).json({ message: error.message, error });
  }
};

export default { login }