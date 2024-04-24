import type { IInputConfig, IItem } from "@/models";

/**
 * Configurações específicas do item.
 */
export type IItemColorGridConfig = IInputConfig<string, string> & {};

/**
 * Assinatura para o tipo "color-grid".
 */
export default interface IItemColorGrid
  extends IItem<"color-grid", IItemColorGridConfig> {}
