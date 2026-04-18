import { z, ZodError } from "zod";

export const ZodErrorTree = (error: ZodError) => {
  return z.treeifyError(error);
};

/**
 * Valida os dados usando o ZodSchema e executa a função com os novos dados
 * Caso falhe, retorna os dados originais com o erro do Zod
 * @param schema instância do ZodSchema a ser usado
 * @param data Dados a serem verificados
 * @param execute Função executada após a verificação dos dados
 * @returns objeto com os dados, success?: boolean, error?: ZodErrorTree
 */
export const validateAndExecute = async <T, D>(
  schema: z.ZodSchema<T>,
  data: D,
  execute: (data: T) => Promise<any>,
) => {
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    return {
      ...data,
      error: ZodErrorTree(parsed.error),
    };
  }

  const res = await execute(parsed.data);
  return {
    ...res,
    success: true,
  };
};
