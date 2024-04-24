import { IStep, IItemImageGroup, IItemImage } from '@/models';

type IParserStep = {
    id: string | number;
    name: string;
    label: string;
    type: any;
    description?: string;
    values?: any[];
    value?: object;
}

function isImageGroup(childrens: (IItemImageGroup | IItemImage)[]) {
    return childrens.every((row) => row.type === 'image');
}
function getImageGroups(field: IItemImageGroup): IItemImageGroup[] {
    const response: any[] = []
    if (field?.children?.length && isImageGroup(field.children as IItemImageGroup[])) { response.push(field) }
    else { field?.children?.forEach(item => getImageGroups(item as IItemImageGroup).forEach(row => response.push(row))) }
    return response
}
function getImageCategody(field: IItemImageGroup) {
    if (field.category === 'image-upload') {
        return field
    }
    return getImageGroups(field)?.find(row => row?.config?.selected)
}
const getSelectedItem = (children: any[]) => {
    return children.map(child => {
        switch (child.type) {
            case 'color-grid':
                return ensure(child.config.options)?.filter((item: any) => item.selected)
            case 'font-selector':
                return ensure(child.config.options)?.find((item: any) => item.selected)
            case 'image-category':
                return getImageCategody(child)
            case 'text':
            case 'text-small':
                return {
                    id: child.id,
                    name: child.name,
                    label: child.label,
                    description: child.description,
                    order: child.order,
                    ...ensure(child.config.options)?.[0]
                }
            case 'radio':
                return {
                    id: child.id,
                    name: child.name,
                    label: child.label,
                    description: child.description,
                    order: child.order,
                    value: '',
                    ...ensure(child.config.options)?.find((item: any) => item.selected)
                }
        }
    })
}
const getStepsChange = (steps: IStep<any, any, any>[]): IParserStep[] => {
    return steps.map((step) => {
        return {
            id: step.id,
            name: step.name,
            label: step.label,
            type: step.type,
            description: step.description,
            values: step.children && getSelectedItem(step.children)
        }
    })
}
const commonParser = (step: IParserStep): IParserStep => {
    const { values, ...stepReturn } = step
    return {
        ...stepReturn,
        value: step.values?.[0]
    }
}
const fontColorParser = (step: IParserStep): IParserStep => {
    const { values, ...stepReturn } = step
    return {
        ...stepReturn,
        value: {
            ...step.values?.find(item => item.size),
            color: step.values?.filter(item => item?.[0]?.value)?.map(item => item[0])
        }
    }
}
const imageParser = (step: IParserStep): IParserStep => {
    const selected = step.values?.find(item => (item?.config?.selected && (item?.config?.url || item?.config?.uploaded_image)))
    const { values, ...stepReturn } = step
    return {
        ...stepReturn,
        value: {
            id: selected?.id,
            level: selected?.level,
            type: selected?.type,
            category: selected?.category,
            category_label: selected?.category_label,
            name: selected?.name || selected?.config?.name,
            label: selected?.label || selected?.category_label,
            source: selected?.config?.url || selected?.config?.uploaded_image,
            cropped_source: selected?.config?.children?.[0]?.config?.base64_cropped
        }
    }
}
const colorParser = (step: IParserStep): IParserStep => {
    const { values, ...stepReturn } = step
    const flatValues = values?.flat()
    const viewColor = <any[]>[]
    if (flatValues?.[0]) {
        viewColor.push({
            ...flatValues[0],
            color_target: 'view'
        })
    }
    if (flatValues?.[1]) {
        viewColor.push({
            ...flatValues[1],
            color_target: 'pulseira'
        })
    }
    return {
        ...stepReturn,
        values: viewColor
    }
}
export const parserSteps = (steps: IStep<any, any, any>[]): IParserStep[] => {
    const stepsChange = getStepsChange(steps)
    return stepsChange.map((step) => {
        switch (step.type) {
            case 'quantity':
                return commonParser(step)
            case 'font':
                return fontColorParser(step)
            case 'image':
                return imageParser(step)
            case 'color':
                return colorParser(step)
            default:
                return step
        }
    })
}
