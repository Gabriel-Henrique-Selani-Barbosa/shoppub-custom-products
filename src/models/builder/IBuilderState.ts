import { IBuilder } from "@/models";

/**
 * Estado ativo da aplicação, apenas para uso no app, não na API.
 */
export default interface IBuilderState<C = void> extends IBuilder<C> {
  /**
   * Status de inicialização.
   */
  initialized?: boolean;

  loading: boolean;

  /**
   * Largura do preview no mobile
   */
  windowMobilePreviewWidth: number;

  /**
   * Altura do preview no mobile
   */
  windowMobilePreviewHeight: number;

  /**
   * Densidade de pixel
   */
  devicePixelRatio: number;


  finishMethod?: Function

  /**
   * Passo atual.
   */
  step: number;

  /**
   * Setar sombreado nos textos
   */
  textShadow: string

  buildImages: boolean
}
