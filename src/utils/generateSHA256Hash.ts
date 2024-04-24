import CryptoJS from 'crypto-js';

export function generateSHA256Hash(inputString: string): string {
    return CryptoJS.HmacSHA256(inputString, 'image').toString()
}