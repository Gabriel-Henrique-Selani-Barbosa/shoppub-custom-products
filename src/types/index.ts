/**
 * types
 * ----------------------------------------------------------------------
 * Tipos de dados globais utilizados no projeto.
 *
 * @since   0.0.1
 */

/**
 * Define unidades de medidas válidas e específicas.
 */
export type UnitType =
  | 'px'
  | 'mm'
  | 'pt'
  | 'em'
  | 'rem'
  | '%'
  | 'vw'
  | 'vh'
  | 'cm';

/**
 * Descreve um valor, com unidade de medida, aceito pelo projeto.
 *
 * Ex.:
 * - 16px
 * - 1cm
 * - 49mm
 */
export type UnitValue = `${number}${UnitType}`;
