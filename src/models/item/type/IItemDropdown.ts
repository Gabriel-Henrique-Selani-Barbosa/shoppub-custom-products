import type { IInputConfig, IItem } from '@/models';

/**
 * Tipos de valores válidos para o item.
 */
type DropdownValue = string | number;

/**
 * Configurações específicas do item.
 */
export type IItemDropdownConfig = IInputConfig<
  DropdownValue,
  DropdownValue
> & {};

/**
 * Assinatura para o tipo "dropdown".
 */
export default interface IItemDropdown
  extends IItem<'dropdown', IItemDropdownConfig> {}
