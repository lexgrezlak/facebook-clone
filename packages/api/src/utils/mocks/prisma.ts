const prisma = {
  user: {
    create: jest.fn((args) => Promise.resolve({ ...args })),
    findOne: jest.fn((args) => Promise.resolve({ ...args })),
    findMany: jest.fn((args) => Promise.resolve({ ...args })),
  },
  post: {
    findMany: jest.fn((args) => Promise.resolve({ ...args })),
    create: jest.fn((args) => Promise.resolve({ ...args })),
  },
};

export default prisma;
