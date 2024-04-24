import type { IItem, IItemImage, IItemImageUpload } from '@/models';

/**
 * Configurações específicas do item.
 */
export type IItemImageGroupConfig = Record<string, any> & {
  /**
   * URL da imagem do grupo (ícone).
   */
  url?: string;

  /**
   * URL da miniatura do grupo (ícone).
   */
  thumbnail?: string;

  /**
   * Se é um grupo selecionado, ou não.
   */
  selected?: boolean;
};

/**
 * Assinatura para o tipo "image-group".
 */
export default interface IItemImageGroup
  extends IItem<
    'image-group',
    IItemImageGroupConfig,
    IItemImage | IItemImageGroup | IItemImageUpload
  > {}
