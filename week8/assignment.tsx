import React, { useState } from "react";

const SIZES = [
  { width: 1024, height: 768 }, // Large
  { width: 400, height: 300 }, // Medium
  { width: 160, height: 120 }, // Small/Thumbnail
];
const worker = new Worker(new URL("./image.worker.ts", import.meta.url), {
  type: "module",
});

export function ImageBitmapTransferPage() {
  const [originalSize, setOriginalSize] = useState<number | null>(null);
  const [results, setResults] = useState<
    Array<{ width: number; height: number; blob: Blob; url: string }>
  >([]);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setOriginalSize(null);
    setResults([]);
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;
    setOriginalSize(file.size);
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.src = url;
    img.onload = async () => {
      try {
        // 비율 유지 리사이즈 계산 (가장 큰 사이즈 기준)
        let width = img.width;
        let height = img.height;
        let ratio = 1;
        if (width > SIZES[0].width || height > SIZES[0].height) {
          ratio = Math.min(SIZES[0].width / width, SIZES[0].height / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        // 각 사이즈별로 비율 유지
        const sizes = SIZES.map(({ width: w, height: h }) => ({
          width: Math.round(w * ratio),
          height: Math.round(h * ratio),
        }));
        const bitmap = await createImageBitmap(img);
        worker.postMessage({ imageBitmap: bitmap, sizes }, [bitmap]);
      } catch {
        setError("ImageBitmap 생성 실패");
        alert("ImageBitmap 생성 실패");
      }
    };
    img.onerror = () => setError("이미지 로드 실패");
  };

  React.useEffect(() => {
    worker.onmessage = (e) => {
      if (e.data.error) {
        setError(e.data.error);
        return;
      }
      const { results } = e.data;
      if (results) {
        setResults(
          results.map((r: { width: number; height: number; blob: Blob }) => ({
            ...r,
            url: URL.createObjectURL(r.blob),
          }))
        );
      }
    };
    return () => {
      worker.onmessage = null;
    };
  }, []);

  return (
    <div style={{ padding: 32 }}>
      <h2>여러 사이즈 리사이즈 + webp 변환 (웹 워커)</h2>
      <input type="file" accept="image/*" onChange={handleFile} />
      {originalSize !== null && (
        <p>원본 용량: {(originalSize / 1024).toFixed(1)} KB</p>
      )}
      {results.length > 0 && (
        <div style={{ marginTop: 16 }}>
          {results.map(({ width, height, blob, url }) => (
            <div key={width + "x" + height} style={{ marginBottom: 16 }}>
              <p>
                <b>
                  {width}x{height}
                </b>{" "}
                | 용량: {(blob.size / 1024).toFixed(1)} KB
              </p>
              <img
                src={url}
                alt={`preview ${width}x${height}`}
                style={{
                  maxWidth: width,
                  maxHeight: height,
                  border: "1px solid #ccc",
                }}
              />
              <div style={{ marginTop: 8 }}>
                <a href={url} download={`resized_${width}x${height}.webp`}>
                  webp 다운로드
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
