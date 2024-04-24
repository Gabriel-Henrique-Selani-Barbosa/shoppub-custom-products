import { IItem } from "@/models";
import { IItemType } from "@/models/item/IItem";

/**
 * Define os tipos de step válidos.
 */
export type IStepType =
  | "color"
  | "font"
  | "image"
  | "product"
  | "quantity"
  | "text";

/**
 * Step básico.
 */
export default interface IStep<
  T extends IStepType,
  C = void,
  S = IItem<IItemType, any, any>
> {
  /**
   * ID do item no banco de dados.
   */
  id: number | string;

  /**
   * Nome.
   */
  name: string;

  /**
   * Nome abreviado, normalmente para uso em botões ou abas.
   */
  label: string;

  /**
   * Descrição opcional do step.
   */
  description?: string;

  /**
   * Ordem em que o step será exibido.
   */
  order: number;

  /**
   * Define o tipo do step.
   */
  type: T;

  /**
   * Configurações do step.
   */
  config?: C;

  /**
   * Filhos deste step.
   */
  children?: Array<S>;
}
