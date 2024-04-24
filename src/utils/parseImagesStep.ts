import { IItem, IStep } from "@/models";

export const parseImagesStep = (step: IStep<any, any, any>, hasCustomImageViews: boolean = false, only_single_colors: boolean = false) => {
    let categories: { category: string; category_label: string }[] = [];
    if (step.config.accept_image_upload && hasCustomImageViews) {
        categories.push({
            category: "image-upload",
            category_label: "Foto",
        });
    }
    categories = [
        ...categories,
        ...(step.children?.map((item: IItem<any, any, any>) => ({
            category: item.category,
            category_label: item.category_label,
        })) || []),
    ].filter(
        (obj, index, self) => index === self.findIndex((o) => o.category === obj.category) && obj.category_label
    ).reverse();

    step.config.categories = categories;
    step.children = categories.map((row, index) => ({
        ...row,
        config: { required: false, selected: index === 0 },
        id: index,
        type: "image-category",
        children: step.children?.filter(
            (child) => child.category === row.category
        ).map((item) => {
            if (item.category === 'no-backgound') {
                return ({
                    ...item,
                    children: item.children.map((child: any) => ({
                        ...child,
                        primaryColor: item.slug?.toLowerCase().includes('black') ? '#000000' : '#ffffff'
                    }))
                })
            }
            return item
        }),
    }));

    return step
}