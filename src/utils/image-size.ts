type Dimensions = {
  width: number;
  height: number;
};

export const loadingImage = (src: string): Promise<Dimensions> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };

    img.onerror = (error) => {
      reject(error);
    };
  });
