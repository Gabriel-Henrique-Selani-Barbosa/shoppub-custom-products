import { IItemImageGroup, IProduct, IStep, IItemImage } from '@/models';
import { IProductType } from '@/models/product/IProduct';
import { IStepType } from '@/models/step/IStep';

/**
 * Define o estado básico da aplicação.
 */
export default interface IBuilder<C = void> {
  /**
   * Configurações, opcionais.
   */
  config?: C;

  /**
   * Produto vinculado ao estado atual.
   */
  product: IProduct<IProductType, any> | null;

  /**
   * Produto vinculado ao estado atual.
   */
  imagesList: IItemImageGroup[] | undefined;
  
  /**
   * Produto vinculado ao estado atual.
   */
  imageSelected:  IItemImageGroup | IItemImage | null;

  /**
   * Lista de passos para o estado atual.
   */
  steps: Array<IStep<IStepType, any, any>>;
}
