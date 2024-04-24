const CURRENCY_FORMATTER: Intl.NumberFormat = new Intl.NumberFormat('pt-BR', {
  currency: 'BRL',
  style: 'currency',
});

export function clamp(value: number, min: number, max: number): number {
  return value < min ? min : value > max ? max : value;
}

export function formatPrice(value: number): string {
  return CURRENCY_FORMATTER.format(value ?? 0);
}

export function hasOwn(target: any, name: string): boolean {
  return Object.prototype.hasOwnProperty.call(target, name);
}

export function ensure<T>(
  argument: T | undefined | null,
  message: string = 'Could not ensure value exists'
): T {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }

  return argument;
}

export function normalizeString(
  value: string,
  compatibilityMode: boolean = false
): string {
  return value
    .normalize(compatibilityMode ? 'NFKD' : 'NFD')
    .replace(/[\u0300-\u036f]/gi, '')
    .replace('ß', 'ss')
    .replace(/[^a-z0-9\s]/gi, '');
}
