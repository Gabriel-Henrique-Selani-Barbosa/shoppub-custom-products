import { ETagType, IItem, IProductView, IStep } from "@/models";
import { TagsProps, ITagProps } from "@/constants/Tags";

export const orderViews = (tags: IProductView<void>[] = []) => {
    const order = {
        1: ETagType.RectangularSmall,
        2: ETagType.RectangularSlimClothing,
        3: ETagType.RectangularClothing,
        4: ETagType.RectangularMedium,
        5: ETagType.RectangularLarge,
        6: ETagType.ShoesTag,
        7: ETagType.SquareClothing,
        8: ETagType.RectangularGift,
        9: ETagType.RectangularBirthday,
        10: ETagType.SquareGift,
        11: ETagType.RectangularSchool,
        12: ETagType.SquareTag,
        13: ETagType.RoundTag,
        14: ETagType.Round,
        15: ETagType.SchoolDraw,
        16: ETagType.SchoolLight,
        17: ETagType.SchoolDark,
        18: ETagType.RectangularBracelet,
        19: ETagType.RectangularMediumPicture,
        20: ETagType.RectangularLargePicture,
        21: ETagType.RectangularClothingPicture,
        22: ETagType.ShoesTagPicture,
        23: ETagType.SquareClothingPicture,
        24: ETagType.RoundPicture,
        25: ETagType.SchoolPicture,
        26: ETagType.SquareTagPicture,
        27: ETagType.RoundTagPicture,
    }
    const restorno = Object.values(order).reduce((acc, item) => ([...acc, tags.find(tag => tag.type === item)]), [] as (IProductView<void> | undefined)[])
    return restorno.filter(item => item) as (IProductView<void>)[]
}