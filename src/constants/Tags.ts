import { ETagType } from "@/models";

export interface ITagProps {
    width: number;
    height: number;
    x?: number;
    y?: number;
    tagType?: ETagType[]
  }

  
export const TagsProps: ITagProps[] = [
    {
        width: 8,
        height: 3,
        tagType: [ETagType.RectangularBirthday]
    },
    {
        width: 21,
        height: 2,
        tagType: [ETagType.RectangularBracelet]
    },
    {
        width: 4.6,
        height: 1.1,
        tagType: [ETagType.RectangularClothing]
    },
    {
        width: 4.7,
        height: 1.4,
        tagType: [ETagType.RectangularClothingPicture]
    },
    {
        width: 8,
        height: 1.8,
        tagType: [ETagType.RectangularGift]
    },
    {
        width: 7.8,
        height: 2,
        tagType: [ETagType.RectangularLarge]
    },
    {
        width: 8.2,
        height: 2.2,
        tagType: [ETagType.RectangularLargePicture]
    },
    {
        width: 5.6,
        height: 1.3,
        tagType: [ETagType.RectangularMedium]
    },
    {
        width: 5.8,
        height: 1.5,
        tagType: [ETagType.RectangularMediumPicture]
    },
    {
        width: 8,
        height: 3.8,
        tagType: [ETagType.RectangularSchool, ETagType.SchoolDark, ETagType.SchoolLight],
    },
    {
        width: 3.9,
        height: 0.6,
        tagType: [ETagType.RectangularSlimClothing]
    },
    {
        width: 3,
        height: 0.6,
        tagType: [ETagType.RectangularSmall]
    },
    {
        width: 9.5,
        height: 4,
        tagType: [ETagType.SchoolDraw, ETagType.SchoolPicture]
    },
    {
        width: 3.6,
        height: 3.6,
        tagType: [ETagType.ShoesTag, ETagType.ShoesTagPicture]
    },
    {
        width: 3.5,
        height: 3,
        tagType: [ETagType.SquareClothing, ETagType.SquareClothingPicture]
    },
    {
        width: 3,
        height: 3,
        tagType: [ETagType.SquareGift, ETagType.RoundPicture, ETagType.Round]
    },
    {
        width: 5,
        height: 5,
        tagType: [ETagType.SquareTag, ETagType.SquareTagPicture, ETagType.RoundTagPicture, ETagType.RoundTag]
    }
]
