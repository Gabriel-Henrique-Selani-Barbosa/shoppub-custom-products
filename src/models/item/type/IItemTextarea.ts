import type { IInputConfig, IItem } from "@/models";

/**
 * Configurações específicas do item.
 */
export type IItemTextareaConfig = IInputConfig<string, string> & {};

/**
 * Assinatura para o tipo "textarea".
 */
export default interface IItemTextarea
  extends IItem<"textarea", IItemTextareaConfig> {}
