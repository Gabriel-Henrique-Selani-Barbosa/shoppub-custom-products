import type { IInputConfig, IInputConfigOption, IItem } from '@/models';

/**
 * Tipos de valores válidos para o item.
 */
type CheckboxValue = string | number;

/**
 * Configurações específicas do item.
 */
export type IItemCheckboxConfig = IInputConfig<
  Array<CheckboxValue>,
  CheckboxValue
> & {};

/**
 * Assinatura para o tipo "checkbox".
 */
export default interface IItemCheckbox
  extends IItem<'checkbox', IItemCheckboxConfig> {}
