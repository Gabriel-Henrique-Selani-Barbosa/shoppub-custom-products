import { IStep } from "@/models";

export const getShadowTextColor = (field: IStep<any, any, any>[]) => {
    return field
        .find((item) => item.type == "font")
        ?.children?.find(item => item.slug === 'border-color')?.config?.options?.find((item: any) => item.selected)?.value;
}