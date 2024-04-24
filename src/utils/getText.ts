import { IStep } from "@/models";
import { EItemType } from "@/models/item/IItem";

export const getText = (field: IStep<any, any, any>[], index: number, types: EItemType[]) => {
    return field
        .find((item) => item.type == "text")
        ?.children?.filter(item => types.includes(item.type))?.[index]?.config?.options?.[0]?.value;
}