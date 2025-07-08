export function capitalizeWords(text) {
  return text
    .toLowerCase()
    .split(' ')
    .filter((w) => w.length > 0)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ')
}
