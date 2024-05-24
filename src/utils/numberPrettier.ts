/** @format */

export function formatNumber(num: any) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
