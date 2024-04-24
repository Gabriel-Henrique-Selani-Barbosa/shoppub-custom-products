import type { IInputConfig, IItem } from "@/models";

/**
 * Configurações específicas do item.
 */
export type IItemTextConfig = IInputConfig<string, string> & {};

/**
 * Assinatura para o tipo "text".
 */
export default interface IItemText extends IItem<"text", IItemTextConfig> {}
