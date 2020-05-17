import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  req: any;
}

export const context = ({ req }: any): Context => {
  return { req, prisma };
};
