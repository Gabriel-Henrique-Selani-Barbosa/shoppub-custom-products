/**
 * Tipos de tag válidos.
 */
export enum ETagType {
  RectangularSmall = 'rectangular-small',
  RectangularMedium = 'rectangular-medium',
  RectangularLarge = 'rectangular-large',
  RectangularClothing = 'rectangular-clothing',
  SquareTag = 'square-tag',
  RoundTag = 'round-tag',
  Round = 'round',
  ShoesTag = 'shoes',
  RectangularSlimClothing = 'slim-clothing',
  SquareClothing = 'square-clothing',
  RectangularBracelet = 'rectangular-bracelet',
  RectangularGift = 'rectangular-gift',
  RectangularBirthday = 'rectangular-birthday',
  SquareGift = 'square-gift',
  RectangularSchool = 'rectangular-school',
  SchoolDraw = 'school-draw',
  SchoolLight = 'school-light',
  SchoolDark = 'school-dark',
  RoundPicture = 'round-picture',
  RoundTagPicture = 'round-tag-picture',
  ShoesTagPicture = 'shoes-picture',
  RectangularClothingPicture = 'rectangular-clothing-picture',
  RectangularLargePicture = 'rectangular-large-clothing-picture',
  RectangularMediumPicture = 'rectangular-medium-clothing-picture',
  SquareTagPicture = 'square-tag-picture',
  SquareClothingPicture = 'square-clothing-picture',
  SchoolPicture = 'school-picture',
}

/**
 * Tipos de tag válidos.
 */
export type ITagType =
  | ETagType;

/**
 * Define um tag padrão do builder, podendo assumir diferentes funções, de
 * acordo com o seu tipo, configurações e filhos.
 */
export default interface ITag<I extends ITagType> {
  /**
   * Tipo de tag
   */
  type: I;
}
