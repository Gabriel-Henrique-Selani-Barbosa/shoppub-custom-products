import { ETagType, IItemImage, IItemImageGroup, IItemImageView, IStep } from "@/models"
import { ComputedRef } from "vue";

function getBackgoundImage(images: IItemImage[] = [], tagType: ETagType): string | undefined {
    const imageView = images.find(item => item.config.views?.some((row: IItemImageView) => row.type === tagType))
    if (imageView) return imageView?.config.url
    return
}

function isImageGroup(childrens: (IItemImageGroup | IItemImage)[]) {
    return childrens.every((row) => row.type === 'image');
}
function getImageGroups(field: IItemImageGroup): IItemImageGroup[] {
    const response: any[] = []
    if (field?.children?.length && isImageGroup(field.children as IItemImageGroup[])) {
        response.push(field)
    }
    else {
        field?.children?.forEach(item => getImageGroups(item as IItemImageGroup).forEach(row => response.push(row)));
    }
    return response
}



class BackgroundImage {
    readonly imagesTagsObject: any
    constructor(field: ComputedRef<IStep<any, any, any>[]>) {
        this.imagesTagsObject = ensure(field.value).find((item) => item.type == 'image')?.children?.map(row => getImageGroups(row))
    }

}