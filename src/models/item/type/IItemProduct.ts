import type { IItem } from '@/models';

/**
 * Configurações específicas do item.
 */
export type IItemProductConfig = Record<string, any> & {};

/**
 * Assinatura para o tipo "group".
 */
export default interface IItemProduct
  extends IItem<'product', IItemProductConfig> {}
