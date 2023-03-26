import {formatNumber} from "./format";

test('It tests format time of day method', () => {
  expect(formatNumber(1000)).toBe('1,000');
});
