export interface Context {
  req: any;
  res: any;
}

export const context = ({ req, res }: Context) => ({
  req,
  res,
});
