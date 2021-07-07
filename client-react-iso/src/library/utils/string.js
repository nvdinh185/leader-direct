export const removeParenthesis = (str) => {
  str = str.replace("[", "").replace("]", "");
  return str;
};

export const returnAttchArr = (str) => {
  let newArr = removeParenthesis(str).split(",");
  return newArr;
};
