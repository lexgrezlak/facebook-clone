export interface Context {
  req: any;
  res: any;
}

export const context = ({ req, res }: any): Context => {
  return { req, res };
};
