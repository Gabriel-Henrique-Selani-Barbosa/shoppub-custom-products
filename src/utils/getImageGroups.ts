import { IItemImage, IItemImageGroup } from "@/models"

function isImageGroup(childrens: (IItemImageGroup | IItemImage)[]) {
    return childrens.every((row) => row.type === 'image');
}
export function getImageGroups(field: IItemImageGroup): IItemImageGroup[] {
    const response: (IItemImageGroup & { hash: string })[] = []
    if (field?.children?.length && isImageGroup(field.children as IItemImageGroup[])) {
        response.push({
            hash: generateSHA256Hash(JSON.stringify(field)),
            ...field
        })
    }
    else {
        field?.children?.
            forEach(item => (getImageGroups(item as IItemImageGroup)).
                forEach(row => response.push({ hash: generateSHA256Hash(JSON.stringify(row)), ...row })));
    }
    return response
}
