const functions = require('../../utils/functions');

test('format number 2 decimal point', () => {
  expect(functions.formatNum(1.234)).toEqual('1.23');
});
