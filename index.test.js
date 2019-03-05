const each = require('jest-each').default;
const { format } = require('.');

each([
  [0, '00:00.00'],
  [114, '00:00.11'],
  [115, '00:00.11'],
  [1e3, '00:01.00'],
  [60e3, '01:00.00'],
  [62e3, '01:02.00'],
  [3600e3, '01:00:00.00'],
  [3600e3 + 2e3, '01:00:02.00'],
  [3600e3 + 2*60e3 + 3e3, '01:02:03.00'],
  [3600e3 + 2*60e3 + 3e3 + 40, '01:02:03.04'],
]).test('format %s ms', (given, expected) => {
  expect(format(given)).toBe(expected);
});
