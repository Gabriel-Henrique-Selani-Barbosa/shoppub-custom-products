import type { UnitType } from "@/types";

/**
 * View de produto.
 *
 * Contém informações básicas de exibição para uma prévia de produto.
 */
export default interface IProductView<C = void> {
  /**
   * ID da view.
   */
  id: number | string;

  /**
   * Nome completo da view.
   */
  name: string;

  /**
   * Slug única da view.
   */
  slug: string;

  /**
   * Largura da view.
   */
  width: number;

  /**
   * Altura da view.
   */
  height: number;

  /**
   * Define a qual unidade de medidas `width` e `height` se referem.
   */
  unit: UnitType;

  /**
   * Tipo da view, deve ser uma string `kebab-case`, lowercase.
   *
   * Se a `slug` for um valor único, pode ser uma cópia do mesmo.
   */
  type: string;

  /**
   * Objeto de configuração opcional.
   */
  config?: C;
}
