import { paletteFromBase64 } from "./getColorPalette";

interface Base64ConversionResult {
  base64Image: string;
  base64ColorPalette: string[];
}

export const convertImageToBase64 = async (imageUrl: string): Promise<Base64ConversionResult> => {
  try {
    const url = imageUrl;
    const response = await fetch(url);
    const blob = await response.blob();
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        const base64Data = reader.result;
        paletteFromBase64(base64Data?.toString() || '', 5).then(item => {
          const result: Base64ConversionResult = {
            base64Image: base64Data?.toString() || '',
            base64ColorPalette: item
          };
          resolve(result);
        });
      };

      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Erro ao converter imagem para Base64:', error);
    throw error;
  }
};
