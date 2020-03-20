export function FormatNumber(num) {
  let newStr;
  if (num !== undefined) {
    newStr = String(num);

    // thousands
    if (newStr.length < 7 && newStr.length > 3) {
      newStr =
        newStr.substring(0, newStr.length - 3) +
        "," +
        newStr.substring(newStr.length - 3, newStr.length);
    }
    // millions
    else if (newStr.length > 6) {
      newStr =
        newStr.substring(0, newStr.length - 6) +
        "," +
        newStr.substring(newStr.length - 6, newStr.length - 3) +
        "," +
        newStr.substring(newStr.length - 3, newStr.length);
    }
  }

  return newStr;
}
