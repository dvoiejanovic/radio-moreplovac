import {formatNumber} from "helpers/format";

const formatTest = test('It tests format time of day method', () => {
  expect(formatNumber(1000)).toBe('1,000');
})

export default formatTest;
