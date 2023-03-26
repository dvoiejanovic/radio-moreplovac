import {findWidestColorRange, groupRgbValues, quantizeColors} from "./color";

const groupedRgbValues = groupRgbValues(new Uint8ClampedArray([
  255, 0, 0, 255,
  50, 50, 50, 255,
  0, 0, 250, 255,
]));

test('It tests grouping of Rgb values', () => {
  expect(groupedRgbValues).toEqual([
    {r: 255, g: 0, b: 0}, {r: 50, g: 50, b: 50}, {r: 0, g:0, b: 250}
  ]);
});

test('It finds widest color range', () => {
  expect(findWidestColorRange(groupedRgbValues)).toBe('r');
});

test.skip('it performs color quantization with various depths correctly', () => {
  const image = new Image();
  image.src = "../assets/yellow.png";
  image.crossOrigin = "Anonymus";

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext("2d");
  ctx?.drawImage(image, image.width, image.height);
  const imageData = ctx?.getImageData(0, 0, image.width, image.height).data;

  expect(quantizeColors(groupRgbValues(imageData as Uint8ClampedArray), 1, 2)).toEqual([{
    r: 128,
    g: 128,
    b: 128
  }, {
    r: 0,
    g: 0,
    b: 0
  }]);
});
