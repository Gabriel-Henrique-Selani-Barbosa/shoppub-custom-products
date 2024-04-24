import { ETagType } from "../ITag";
import ITagSize from "../ITagSize";
import type { ITag } from "@/models";

/**
 * Option de tag.
 */
export default interface ITagRectangularSquare extends ITag<ETagType> {
  /**
   * cor do fundo.
   */
  backgroundColor: string;

  /**
   * texto 1.
   */
  textOne: string;

  /**
   * texto 2.
   */
  textTwo: string;

  /**
   * texto 3.
   */
  textThree: string;
  
  /**
   * texto 1.
   */
  textOneColor: string;
  
  /**
   * texto 2.
   */
  textTwoColor: string;
  
  /**
   * texto 3.
   */
  textThreeColor: string;

  /**
   * dimesões.
   */
  size: ITagSize<0>;
}
