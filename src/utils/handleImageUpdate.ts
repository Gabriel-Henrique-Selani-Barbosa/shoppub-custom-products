import { ETagType, IItemImage, IItemImageGroup, IItemImageView } from "@/models";

function getBackgoundImage(
    images: IItemImage[] = [], tagType: ETagType | ETagType[]
): { principal_image: string; secondary_image: string } | undefined {
    const types = Array.isArray(tagType) ? tagType : [tagType]
    const imageView = images.find((item) =>
        item.config.views?.some((row: IItemImageView) => types.map((item) => row.type.includes(item)).some(item => item))
    );
    if (imageView)
        return {
            principal_image: imageView?.config.url,
            secondary_image: imageView?.config.back_url,
        };
    return;
}

type Response = {
    base64Image: string,
    base64ColorPalette: string[],
    base64ImageNoBack: string,
}

export const handleImageUpdate = async (data: IItemImageGroup | IItemImage | null, tagType: ETagType | ETagType[]): Promise<{ principal_image: Response, secondary_image: Response }> => {
    const isBackground = !["no-backgound"].includes(
        String(data?.category)
    );
    const url = getBackgoundImage(data?.children as IItemImage[], tagType);
    const response: { principal_image: Response, secondary_image: Response } = {
        principal_image: {
            base64Image: "",
            base64ColorPalette: [],
            base64ImageNoBack: "",
        },
        secondary_image: {
            base64Image: "",
            base64ColorPalette: [],
            base64ImageNoBack: "",
        }
    }
    if (url?.principal_image) {
        const converted = await convertImageToBase64(url?.principal_image)
        response.principal_image = {
            base64Image: (isBackground && converted?.base64Image) || "",
            base64ColorPalette: converted?.base64ColorPalette || [],
            base64ImageNoBack: (!isBackground && converted?.base64Image) || "",
        }
    }
    if (url?.secondary_image) {
        const converted = await convertImageToBase64(url?.secondary_image)
        response.secondary_image = {
            base64Image: (isBackground && converted?.base64Image) || "",
            base64ColorPalette: converted?.base64ColorPalette || [],
            base64ImageNoBack: (!isBackground && converted?.base64Image) || "",
        }
    }
    return response
};