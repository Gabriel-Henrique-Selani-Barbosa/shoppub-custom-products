import type {
  IProduct,
  IProductTypeSingle,
  IProductTypeVariant,
} from "@/models";

/**
 * Interface específica para produtos do tipo "kit".
 */
export default interface IProductTypeKit
  extends IProduct<"kit", IProductTypeSingle | IProductTypeVariant> {}
