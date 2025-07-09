import { PrismaClient } from '../generated/prisma';

declare global {
  var prisma: PrismaClient;
}

let prismaClient: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prismaClient = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prismaClient = global.prisma;
}

export const prisma = prismaClient;
