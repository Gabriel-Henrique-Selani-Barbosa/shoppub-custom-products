import type { IProductView } from "@/models";

/**
 * Define valores válidos para o tipo de produto.
 */
export type IProductType = "single" | "variant" | "variant-item" | "kit";

/**
 * Interface básica de produto.
 */
export default interface IProduct<T extends IProductType, C = void> {
  /**
   * ID do produto.
   */
  id: number | string;

  /**
   * Nome completo do produto.
   */
  name: string;

  /**
   * Slug única do produto.
   */
  slug: string;

  /**
   * SKU do produto.
   */
  sku: string;

  /**
   * Valor do produto.
   */
  price: number;

  /**
   * Tipo do produto.
   */
  type: T;

  /**
   * Array com children.
   */
  children?: Array<C>;

  /**
   * Miniatura de exemplo da view.
   */
  thumb?: string;

  /**
   * Array com views de exibição.
   */
  views?: Array<IProductView>;
  
  /**
   * Array com views de exibição.
   */
  views_custom_image?: Array<IProductView>;

  only_single_colors?: boolean
}
