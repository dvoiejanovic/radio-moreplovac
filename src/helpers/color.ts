export type TPixelColor = {
  r: number
  g: number
  b: number
}

export function isValidNumber(num: unknown) {
  return typeof num === 'number' && !Number.isNaN(num);
}

export function findWidestColorRange(rgbValues: TPixelColor[]) {
  let rMin = Number.MAX_VALUE;
  let gMin = Number.MAX_VALUE;
  let bMin = Number.MAX_VALUE;

  let rMax = Number.MIN_VALUE;
  let gMax = Number.MIN_VALUE;
  let bMax = Number.MIN_VALUE;

  rgbValues.forEach((pixel) => {
    rMin = Math.min(rMin, pixel.r);
    gMin = Math.min(gMin, pixel.g);
    bMin = Math.min(bMin, pixel.b);

    rMax = Math.max(rMax, pixel.r);
    gMax = Math.max(gMax, pixel.g);
    bMax = Math.max(bMax, pixel.b);
  });

  const rRange = rMax - rMin;
  const gRange = gMax - gMin;
  const bRange = bMax - bMin;

  const widestRange = Math.max(rRange, gRange, bRange);

  if (widestRange === rRange) {
    return 'r';
  } else if (widestRange === gRange) {
    return 'g';
  }

  return 'b';
}

export function groupRgbValues(imageData: Uint8ClampedArray): TPixelColor[] {
  const rgbValues = [];

  for (let i = 0; i <= imageData.length - 4; i+= 4) {
    const rgb = {
      r: imageData[i],
      g: imageData[i + 1],
      b: imageData[i + 2]
    };

    const isColorTooBright = (0.2627 * rgb.r + 0.678 * rgb.g + 0.0593 * rgb.b) > 155;

    if (isValidNumber(imageData[i]) && isValidNumber(imageData[i + 1]) && isValidNumber(imageData[i + 2]) && !isColorTooBright) {
      rgbValues.push(rgb);
    }
  }

  return rgbValues;
}

export function quantizeColors(rgbValues: TPixelColor[], depth: number, maxDepth = 4): TPixelColor[] {
  if (rgbValues.length === 0) {
    return [];
  }

  if (depth === maxDepth) {
    const color = rgbValues.reduce((acc, curr) => {
      acc.r += curr.r;
      acc.g += curr.g;
      acc.b += curr.b;

      return acc;
    }, {
      r: 0,
      g: 0,
      b: 0,
    });


    color.r = Math.round(color.r / rgbValues.length);
    color.g = Math.round(color.g / rgbValues.length);
    color.b = Math.round(color.b / rgbValues.length);

    return [color];
  }

  const colorRange = findWidestColorRange(rgbValues);
  const sortedRgbValues = [...rgbValues].sort((a, b) => a[colorRange] - b[colorRange]);

  const mid = rgbValues.length / 2;

  return [
    ...quantizeColors(sortedRgbValues.slice(0, mid), depth + 1, maxDepth),
    ...quantizeColors(sortedRgbValues.slice(mid + 1), depth + 1, maxDepth),
  ];
}
