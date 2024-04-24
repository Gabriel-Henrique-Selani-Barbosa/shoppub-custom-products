import type {
  IItem,
  IItemBoolean,
  IItemCheckbox,
  IItemColorGrid,
  IItemDropdown,
  IItemDropdownColor,
  IItemFontSelector,
  IItemImage,
  IItemImageGroup,
  IItemRadio,
  IItemSelect,
  IItemNumber,
  IItemText,
  IItemTextarea,
  IItemTextSmall,
} from '@/models';

/**
 * Configurações específicas do item.
 */
export type IItemGroupConfig = Record<string, any> & {};

/**
 * Tipos de children válidos para o grupo.
 */
export type ItemGroupChild =
  | IItemGroup
  | IItemBoolean
  | IItemCheckbox
  | IItemColorGrid
  | IItemDropdown
  | IItemDropdownColor
  | IItemFontSelector
  | IItemImage
  | IItemImageGroup
  | IItemRadio
  | IItemSelect
  | IItemNumber
  | IItemText
  | IItemTextarea
  | IItemTextSmall;

/**
 * Assinatura para o tipo "group".
 */
export default interface IItemGroup
  extends IItem<'group', IItemGroupConfig, ItemGroupChild> {
  children: Array<ItemGroupChild>;
}
