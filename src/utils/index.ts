export function getIntDecimal(num: number) {
  let parts = num.toString().split('.')
  const int = parts[0]
  const decimal = parts.length > 1 ? parts[1] : null
  return {
    int,
    decimal,
  }
}
