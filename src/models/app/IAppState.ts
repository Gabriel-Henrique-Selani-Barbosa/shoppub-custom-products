import { IApp } from "@/models";

/**
 * Estado ativo da aplicação, apenas para uso no app, não na API.
 */
export default interface IAppState extends IApp {
  /**
   * Status de inicialização.
   */
  initialized?: boolean;
}
