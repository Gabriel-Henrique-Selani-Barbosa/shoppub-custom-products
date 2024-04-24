export function createNumberArray(n: number, m: number) {
    var arr = Array.from({ length: m - n + 1 }, (_, index) => index + n);
    return arr;
}