import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  req: any;
  res: any;
}

export const context = ({ req, res }: any): Context => {
  return { req, res, prisma };
};
