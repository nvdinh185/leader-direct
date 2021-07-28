export const uuidv4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );
};

export const removeParenthesis = (str) => {
  str = str.replace("[", "").replace("]", "");
  return str;
};

export const returnAttchArr = (str) => {
  if (str) {
    let newArr = removeParenthesis(str).split(",");
    return newArr;
  }
};

export const returnHexColor = (str) => {
  if (str) {
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
  }
};
