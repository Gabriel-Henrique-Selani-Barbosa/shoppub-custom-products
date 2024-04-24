export function getContrastYIQBetween2Colors(color1: string, color2: string): string {
    const hex1 = color1.toUpperCase().replace(/[^0-9A-F]/gi, '');
    const hex2 = color2.toUpperCase().replace(/[^0-9A-F]/gi, '');
    const r1 = parseInt(hex1.substring(0, 2), 16);
    const g1 = parseInt(hex1.substring(2, 4), 16);
    const b1 = parseInt(hex1.substring(4, 6), 16);
    const r2 = parseInt(hex2.substring(0, 2), 16);
    const g2 = parseInt(hex2.substring(2, 4), 16);
    const b2 = parseInt(hex2.substring(4, 6), 16);
    const yiq1 = ((r1 * 299) + (g1 * 587) + (b1 * 114)) / 1000;
    const yiq2 = ((r2 * 299) + (g2 * 587) + (b2 * 114)) / 1000;

    const contrast = Math.abs(yiq1 - yiq2);

    return contrast >= 80 ? 'high' : 'low';
}

export function getContrastColor(hexColor: string, luminosity = 90): string {
    const color = hexColor.replace('#', '');
    const red = parseInt(color.slice(0, 2), 16);
    const green = parseInt(color.slice(2, 4), 16);
    const blue = parseInt(color.slice(4, 6), 16);
    const r = red / 255;
    const g = green / 255;
    const b = blue / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h = 0;
    let s = 0;
    let l = (max + min) / 2;
    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    const targetLuminosity = luminosity / 100;
    l = targetLuminosity;
    let rNew, gNew, bNew;
    if (s === 0) {
        rNew = l;
        gNew = l;
        bNew = l;
    } else {
        const hue2rgb = (p: number, q: number, t: number): number => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        rNew = hue2rgb(p, q, h + 1 / 3);
        gNew = hue2rgb(p, q, h);
        bNew = hue2rgb(p, q, h - 1 / 3);
    }

    const newRed = Math.round(rNew * 255);
    const newGreen = Math.round(gNew * 255);
    const newBlue = Math.round(bNew * 255);
    const newHexColor = `#${(newRed.toString(16)).padStart(2, '0')}${(newGreen.toString(16)).padStart(2, '0')}${(newBlue.toString(16)).padStart(2, '0')}`;
    return newHexColor;
}