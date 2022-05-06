export function cutStr(str: String) {
  if (str.length > 18) {
    return `${str.substring(0, 18)}...`;
  }
  return str;
}
