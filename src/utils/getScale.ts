interface Params {
    unit: 'cm' | 'pixel';
    width: number;
    height: number;
}

export function getScale(
    devicePixelRatio: number,
    refValues: Params,
    maxValues: Params,) {

    const pixelsPerInch = 96; // PPI padrão

    let maxHeight = maxValues.height
    let maxWidth = maxValues.width
    if (maxValues.unit === 'cm') {
        maxHeight = maxValues.height * (pixelsPerInch / 2.54)
        maxWidth = maxValues.width * (pixelsPerInch / 2.54)
    }
    
    let refHeight = refValues.height
    let refWidth = refValues.width
    if (refValues.unit === 'cm') {
        refHeight = refValues.height * (pixelsPerInch / 2.54)
        refWidth = refValues.width * (pixelsPerInch / 2.54)
    }

    const widthScale = Math.min(maxWidth / (refWidth || 1));
    const heightScale = Math.min(maxHeight / (refHeight || 1));

    return {
        valuesPx: {
            maxHeight,
            maxWidth,
            refHeight,
            refWidth
        },
        widthScale,
        heightScale,
        scale: Math.min(widthScale, heightScale)
    }
}