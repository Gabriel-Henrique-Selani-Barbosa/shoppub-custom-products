export function convertDeviceUnit(unit: 'cm' | 'pixel', value: number, devicePixelRatio: number = 1) {
    const pixelsPerInch = 96 / 2.54; // PPI padrão (pixels por polegada)
    let convertedValue = 0;
    if (unit === 'cm') { convertedValue = value * pixelsPerInch }
    else if (unit === 'pixel') { convertedValue = value / pixelsPerInch }
    return convertedValue;
}
