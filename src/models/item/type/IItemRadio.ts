import type { IInputConfig, IItem } from "@/models";

/**
 * Tipos de valores válidos para o item.
 */
type RadioValue = string | number;

/**
 * Configurações específicas do item.
 */
export type IItemRadioConfig = IInputConfig<RadioValue, RadioValue> & {};

/**
 * Assinatura para o tipo "radio".
 */
export default interface IItemRadio extends IItem<"radio", IItemRadioConfig> {}
