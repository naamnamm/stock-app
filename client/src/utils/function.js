export function formatNumber(num) {
  return num.toLocaleString(undefined, { minimumFractionDigits: 2 });
}
