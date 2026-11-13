import { expect, test } from 'bun:test';

import { wrapIndex } from './ui';

test('wrapIndex wraps forward and backward', () => {
  expect(wrapIndex(0, 1, 3)).toBe(1);
  expect(wrapIndex(2, 1, 3)).toBe(0);
  expect(wrapIndex(0, -1, 3)).toBe(2);
});

test('wrapIndex tolerates an empty list', () => {
  expect(wrapIndex(4, 1, 0)).toBe(0);
});
