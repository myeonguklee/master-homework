// image.worker.ts
self.onmessage = async (e) => {
  const { imageBitmap, sizes } = e.data;
  if (imageBitmap instanceof ImageBitmap) {
    const results: { width: number; height: number; blob: Blob }[] = [];
    for (const { width, height } of sizes) {
      const canvas = new OffscreenCanvas(width, height);
      const ctx = canvas.getContext("2d");
      if (!ctx) continue;
      ctx.drawImage(imageBitmap, 0, 0, width, height);
      let blob;
      if (canvas.convertToBlob) {
        blob = await canvas.convertToBlob({ type: "image/webp" });
      } else {
        continue;
      }
      results.push({ width, height, blob });
    }
    self.postMessage({ results });
    imageBitmap.close();
  }
};
