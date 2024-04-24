/**
 * Tipos de item válidos.
 */
export type IItemType =
  | 'boolean'
  | 'checkbox'
  | 'checkbox-group'
  | 'color-grid'
  | 'dropdown-color'
  | 'dropdown'
  | 'font-selector'
  | 'group'
  | 'image-group'
  | 'image'
  | 'number'
  | 'product'
  | 'radio'
  | 'select'
  | 'text-small'
  | 'text'
  | 'image-upload'
  | 'textarea';

export enum EItemType {
  boolean = 'boolean',
  checkbox = 'checkbox',
  checkboxGroup = 'checkbox-group',
  colorGrid = 'color-grid',
  dropdownColor = 'dropdown-color',
  dropdown = 'dropdown',
  fontSelector = 'font-selector',
  group = 'group',
  imageGroup = 'image-group',
  image = 'image',
  number = 'number',
  product = 'product',
  radio = 'radio',
  select = 'select',
  textSmall = 'text-small',
  text = 'text',
  imageUpload = 'image-upload',
  textarea = 'textarea'
}

/**
 * Define um item padrão do builder, podendo assumir diferentes funções, de
 * acordo com o seu tipo, configurações e filhos.
 */
export default interface IItem<I extends IItemType, C = void, T = void> {
  /**
   * ID do item no banco de dados.
   */
  id: number | string;

  noRender: boolean

  /**
   * Nome.
   */
  name: string;

  /**
   * Nome abreviado, normalmente para uso em botões ou abas.
   */
  label: string;

  /**
   * Nome URL-safe, lower-case, kebab-case, deve ser único no banco de dados.
   *
   * Ex.:
   * "Padrão Novo" => "padrao-novo"
   */
  slug: string;

  /**
   * Tipo de item, está vinculado, diretamente, às configurações e ao tipo de
   * children que este item pode receber.
   */
  type: I;

  /**
   * Descrição do item.
   */
  description?: string;

  /**
   * Configuração do item.
   */
  config: C;
  checked: Boolean;

  /**
   * Array com filhos do item.
   */
  children?: Array<T>;

  /**
   * Categoria do item.
   */
  category: string,

  /**
   * label de categoria do item.
   */
  category_label: string,

  /**
   * Cor primária da imagem.
   */
  primaryColor?: string;
}
