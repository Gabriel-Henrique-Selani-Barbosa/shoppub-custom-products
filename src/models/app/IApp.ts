import { IBuilder, ITag } from "@/models";

/**
 * Configurações válidas para o app.
 */
type IAppConfig = {
  /**
   * Modo dark/light.
   */
  dark?: boolean;

  /**
   * Modo mobile/desktop.
   */
  mobile?: boolean;
};

/**
 * Define estado básico do app.
 */
export default interface IApp {
  /**
   * Configurações do app.
   */
  config: IAppConfig;

  /**
   * Estado inicial, recebido da API.
   */
  data: IBuilder<any> | null;

  /**
   * Tags para preview.
   */
  previewsTags: ITag<any>[];
}
