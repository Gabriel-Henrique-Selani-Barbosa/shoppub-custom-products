import type { IInputConfig, IItem } from "@/models";

/**
 * Tipos de valores válidos para o item.
 */
type TextSmallValue = string | boolean;

/**
 * Configurações específicas do item.
 */
export type IItemTextSmallConfig = IInputConfig<string, TextSmallValue> & {};

/**
 * Assinatura para o tipo "text-small".
 */
export default interface IItemTextSmall
  extends IItem<"text-small", IItemTextSmallConfig> {}
