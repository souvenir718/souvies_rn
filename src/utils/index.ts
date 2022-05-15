export function omitTitle(str: String) {
  if (str.length > 18) {
    return `${str.substring(0, 18)}...`;
  }
  return str;
}
