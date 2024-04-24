import type { IInputConfig, IItem } from "@/models";
import type { UnitType } from "@/types";

/**
 * Descrição do `value` da option de fonte.
 */
type FontValue = {
  /**
   * ID da fonte.
   */
  id?: number | string;

  /**
   * Nome da fonte.
   */
  name: string;

  /**
   * Opcional, apenas se REALMENTE necessário usar postScript name (MacOS).
   */
  psName?: string;

  /**
   * Tamanho de base da fonte.
   */
  size?: number;

  /**
   * Unidade de medida da fonte.
   */
  unit?: UnitType;

  /**
   * URL da fonte.
   */
  file?: URL;
};

/**
 * Configurações específicas do item.
 */
export type IItemFontSelectorConfig = IInputConfig<FontValue, FontValue> & {};

/**
 * Assinatura para o tipo "font-selector".
 */
export default interface IItemFontSelector
  extends IItem<"font-selector", IItemFontSelectorConfig> {}
