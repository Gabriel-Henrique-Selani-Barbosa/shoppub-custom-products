import type { IProduct, IProductTypeVariantItem } from "@/models";

/**
 * Interface específica para produtos do tipo "variant".
 */
export default interface IProductTypeVariant
  extends IProduct<"variant", IProductTypeVariantItem> {}
