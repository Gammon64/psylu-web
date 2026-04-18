import { z, ZodError } from "zod";

export const ZodErrorTree = (error: ZodError) => {
  return z.treeifyError(error);
};
