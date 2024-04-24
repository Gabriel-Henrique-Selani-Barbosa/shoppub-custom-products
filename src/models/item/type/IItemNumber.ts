import type { IInputConfig, IItem } from "@/models";

/**
 * Tipos de valores válidos para o item.
 */
type NumberValue = number | null;

/**
 * Configurações específicas do item.
 */
export type IItemNumberConfig = IInputConfig<NumberValue, NumberValue>;

/**
 * Assinatura para o tipo "number".
 */
export default interface IItemNumber
  extends IItem<"number", IItemNumberConfig> {}
