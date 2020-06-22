export interface Context {
  req: any;
  res: any;
  connection: any;
}

export const context = ({ req, res, connection }: Context) => {
  return { req, res, connection };
};
