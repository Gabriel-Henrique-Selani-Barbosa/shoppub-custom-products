import type { IItem } from '@/models';

/**
 * Define como uma imagem específica para view deve vir declarada.
 *
 * O valor de `type` corresponde ao `type` em `IProductView`.
 */
export type IItemImageView = {
  /**
   * ID da imagem.
   */
  id: number | string;

  /**
   * Nome da imagem.
   */
  name: string;

  /**
   * Tipo da view.
   */
  type: string;

  /**
   * URL da imagem.
   */
  url: string;
};

/**
 * Configurações específicas do item.
 */
export type IItemImageConfig = Record<string, any> & {
  /**
   * URL da imagem principal.
   *
   * Caso views não sejam declaradas, ela deverá ser o fallback.
   */
  url: string;
  
  /**
   * URL da imagem secundária.
   *
   * Caso views não sejam declaradas, ela deverá ser o fallback.
   */
  back_url: string;

  /**
   * Miniatura da imagem.
   */
  thumbnail: string;

  /**
   * Se está selecionada ou não.
   */
  selected?: boolean;


  /**
   * Cor primária da imagem.
   */
  primaryColor?: string;

  /**
   * Array com imagens específicas para views.
   */
  views?: Array<IItemImageView>;
};

/**
 * Assinatura para o tipo "image".
 */
export default interface IItemImage extends IItem<'image', IItemImageConfig> {}
