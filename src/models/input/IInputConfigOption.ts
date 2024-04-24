/**
 * Option de input, para inserção dentro das configurações.
 */
export default interface IInputConfigOption<T> extends Record<string, any> {
  /**
   * ID da option.
   */
  id?: number | string;

  /**
   * Label de exibição da option.
   */
  label: string;

  /**
   * Valor da option.
   */
  value: T;

  /**
   * Se a option está, ou não, selecionada.
   */
  selected?: boolean;
}
