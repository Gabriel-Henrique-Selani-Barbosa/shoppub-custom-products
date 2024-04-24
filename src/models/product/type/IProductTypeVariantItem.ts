import type { IProduct } from "@/models";

/**
 * Interface específica para produtos do tipo "variant".
 */
export default interface IProductTypeVariantItem
  extends IProduct<"variant-item", any> {}
