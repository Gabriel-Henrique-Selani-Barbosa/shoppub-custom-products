import { IStep } from "@/models"

export function getBackgroundColor(field: IStep<any, any, any>[]) {
    return (
      field
        .find((item) => item.type == "color")
        ?.children?.find((item) => item.type == "color-grid")
        ?.config.options.find((item: any) => item.selected)?.value ?? "white"
    );
  }