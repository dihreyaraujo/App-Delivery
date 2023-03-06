export default function replaceToPrice(price) {
  if (typeof price === 'number') {
    const parseToString = price.toFixed(2);
    return parseToString.replace(/\./, ',');
  }

  return price.replace(/\./, ',');
}
