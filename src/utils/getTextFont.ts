import { IStep } from "@/models";

export function getTextFont(field: IStep<any, any, any>[]) {
    let option = field.find((item) => item.type == 'font')?.children?.find((item) => item.type == 'font-selector')?.config.options
    const filtered = option?.find((item: any) => item.selected) || option?.[0]
    return ({
        size: `${filtered?.size || 16}${filtered?.unit || 'px'}`,
        familyName: filtered?.name || 'inherit'
    })
}