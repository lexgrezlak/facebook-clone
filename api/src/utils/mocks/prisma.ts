const prisma = {
  user: {
    create: jest.fn((args) => Promise.resolve({ ...args })),
    findOne: jest.fn((args) => Promise.resolve({ ...args })),
  },
};

export default prisma;
