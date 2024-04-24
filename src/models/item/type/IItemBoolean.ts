import type { IInputConfig, IItem } from "@/models";

/**
 * Configurações específicas do item.
 */
export type IItemBooleanConfig = IInputConfig<boolean, boolean> & {};

/**
 * Assinatura para o tipo "boolean".
 */
export default interface IItemBoolean
  extends IItem<"boolean", IItemBooleanConfig> {}
