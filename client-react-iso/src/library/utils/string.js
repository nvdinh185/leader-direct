export const removeParenthesis = (str) => {
  str = str.replace("[", "").replace("]", "");
  return str;
};

export const returnAttchArr = (str) => {
  let newArr = removeParenthesis(str).split(",");
  return newArr;
};

export const returnHexColor = (str) => {
  const re = /^#[0-9a-f]{3,6}$/i;
  let stringSplit = str.split(" ");
  let bgColorStr = "";
  stringSplit.every((str) => {
    if (re.test(str)) {
      bgColorStr = str;
      return false;
    }
    return true;
  });
  return bgColorStr;
};
