import { IInputConfigOption } from '@/models';

/**
 * Configurações de um input.
 */
export default interface InputConfig<T, O = any> extends Record<string, any> {
  /**
   * Quais extensões o input aceita, se file.
   */
  accept?: string;

  /**
   * Valor do alt.
   */
  alt?: string;

  /**
   * Se desabilitado ou não.
   */
  disabled?: boolean;

  /**
   * Se destacado, ou não.
   */
  featured?: boolean;

  /**
   * Valor máximo, em especil para inputs de data e numéricos.
   */
  max?: number | Date;

  /**
   * Comprimento máximo do valor do campo.
   */
  maxLength?: number;

  /**
   * Máximo de opções a serem selecionadas.
   */
  maxOptions?: number;

  /**
   * Valor mínimo, em especil para inputs de data e numéricos.
   */
  min?: number | Date;

  /**
   * Comprimento mínimo do valor do campo.
   */
  minLength?: number;

  /**
   * Mínimo de opções a serem selecionadas.
   */
  minOptions?: number;

  /**
   * Se o input é do tipo multiple (select).
   */
  multiple?: boolean;

  /**
   * Contém, as options para preenchimento/seleção.
   *
   * Todo input, inclusive de texto, deve ter ao menos uma option.
   */
  options?: Array<IInputConfigOption<O>>;

  /**
   * Placeholder para exibição em campo vazio (text, textarea).
   */
  placeholder?: string;

  /**
   * Caso fornecido, o preenchimento do input afetará o preço final do produto.
   */
  price?: number;

  /**
   * Se o input é apenas leitura.
   */
  readonly?: boolean;

  /**
   * Se input obrigatório.
   */
  required?: boolean;

  /**
   * Para inputs de range, em especial, define o step de caminhada.
   */
  step?: number;

  /**
   * Valor atual do input.
   */
  value?: T | null;
}
