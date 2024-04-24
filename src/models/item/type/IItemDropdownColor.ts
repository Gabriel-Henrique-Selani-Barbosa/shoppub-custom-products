import type { IInputConfig, IItem } from "@/models";

/**
 * Configurações específicas do item.
 */
export type IItemDropdownColorConfig = IInputConfig<string, string> & {};

/**
 * Assinatura para o tipo "dropdown-color".
 */
export default interface IItemDropdownColor
  extends IItem<"dropdown-color", IItemDropdownColorConfig> {}
