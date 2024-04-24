import type { IInputConfig, IItem } from "@/models";

/**
 * Tipos de valores válidos para o item.
 */
type SelectValue = string | number;

/**
 * Configurações específicas do item.
 */
export type IItemSelectConfig = IInputConfig<
  SelectValue | Array<SelectValue>,
  SelectValue
> & {};

/**
 * Assinatura para o tipo "select".
 */
export default interface IItemSelect
  extends IItem<"select", IItemSelectConfig> {}
