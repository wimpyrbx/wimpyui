import { PrismaClient } from '@prisma/client';
import type { User } from '../types/auth';

const prisma = new PrismaClient();

export const authDb = {
  async validateUser(username: string, password: string) {
    return prisma.user.findFirst({
      where: {
        email: username,
        password: password
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    });
  }
}; 