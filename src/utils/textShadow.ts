import { getContrastYIQBetween2Colors } from "./getContrastYIQ";

export const textShadow = (builder: any, textColor: string, backgroundColor: string, base64ColorPalette: string[], hasImage: boolean, selectedShadowColor: string | undefined = undefined): string => {
    let color = ''
    if (builder.product?.only_single_colors) return ''
    const background = hasImage ? base64ColorPalette[0] : backgroundColor;
    const needShadow = Boolean((textColor && background && getContrastYIQBetween2Colors(textColor, background) === 'low'))
    if (needShadow) { color = builder.textShadow }
    if (selectedShadowColor) { color = selectedShadowColor }
    if (!color) return ''
    return `-1px -1px 0 ${color},
            1px -1px 0 ${color},
            -1px 1px 0 ${color},
            1px 1px 0 ${color}`
}