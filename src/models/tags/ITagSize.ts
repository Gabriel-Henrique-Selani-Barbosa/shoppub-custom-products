/**
 * Option de tag - size.
 */
export default interface ITagSize<T> extends Record<string, any> {
    /**
     * largura
     */
    width: number;

    /**
     * altura
     */
    heigth: number;
    
    /**
     * raio da borda
     */
    borderRadius?: number;
  }
  