/**
 * Generate dynamic sequencial array.
 * @param {number} start Starting point of array.
 * @param {number} stop Ending point of array.
 * @param {number} step Difference between each point in array.
 */
export const range = (start, stop, step) =>
  Array.from({length: (stop - start) / step + 1}, (_, i) => start + i * step);
