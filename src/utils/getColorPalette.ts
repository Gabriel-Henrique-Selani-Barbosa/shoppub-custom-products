export const paletteFromBase64 = (imagemBase64: string, colors: number = 5): Promise<string[]> => {
    const imagem = new Image();
    imagem.src = imagemBase64;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    return new Promise<string[]>((resolve, reject) => {
      imagem.onload = () => {
        canvas.width = imagem.width;
        canvas.height = imagem.height;
        if (!context) return
        context.drawImage(imagem, 0, 0);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
          for (let i = 0; i < pixels.length; i += 4) {
              const r = pixels[i];
              const g = pixels[i + 1];
              const b = pixels[i + 2];
              pixels[i] = Math.round(r / (255 / colors)) * (255 / colors);
              pixels[i + 1] = Math.round(g / (255 / colors)) * (255 / colors);
              pixels[i + 2] = Math.round(b / (255 / colors)) * (255 / colors);
          }
        const cores: any = {};
        for (let i = 0; i < pixels.length; i += 4) {
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];
          const cor = rgbToHex(r,g,b);
          if (!cores[cor]) cores[cor] = 0;
          cores[cor]++;
        }
        const coresArray = Object.keys(cores).map((cor) => ({ cor, contagem: cores[cor] }));
        coresArray.sort((a, b) => b.contagem - a.contagem);
        const coresMaisDiferentes = coresArray.map((obj) => obj.cor);
        resolve(coresMaisDiferentes);
      };
      imagem.onerror = () => {
        reject(new Error('Ocorreu um erro ao carregar a imagem.'));
      };
    });
  };

  function rgbToHex(red: number, green: number, blue: number): string {
    const rHex = red.toString(16).padStart(2, '0');
    const gHex = green.toString(16).padStart(2, '0');
    const bHex = blue.toString(16).padStart(2, '0');
  
    const hexColor = `#${rHex}${gHex}${bHex}`;
  
    return hexColor;
  }