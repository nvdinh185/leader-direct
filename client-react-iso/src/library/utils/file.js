import { successAlert, errorAlert } from "@components/AlertModal/ModalInfo";

/**
 *
 * @param {object} event chứa thông tin event có chứa files
 * @param {number} maxSize thông tin max file size để validate
 * @returns true | false
 */
export const checkFileSize = (event, maxSize) => {
  let files = event.target.files;
  let size = maxSize;
  let err = "";
  for (var x = 0; x < files.length; x++) {
    if (files[x].size > size) {
      err += `File <b style='color: green'>${files[x].name}</b> vượt quá giới hạn cho phép upload (< ${maxSize}kb)\n`;
    }
  }
  if (err !== "") {
    event.target.value = null;
    errorAlert("Lỗi", err);
    return false;
  }
  return true;
};

export const checkMimeType = (event, checkTypes) => {
  //getting file object
  let files = event.target.files;
  let err = "";
  // list allow mime type
  const types = checkTypes;
  // loop access array
  for (var x = 0; x < files.length; x++) {
    // compare file type find doesn't matach
    if (types.every((type) => files[x].type !== type)) {
      // create error message and assign to container
      err += `Định Dạng ${files[x].type} Không Được Hỗ Trợ.`;
    }
  }
  if (err !== "") {
    // if message not same old that mean has error
    event.target.value = null; // discard selected file
    errorAlert("Lỗi", err);
    return false;
  }
  return true;
};

// ------------------------------------------------------------------------------
export const base64toBlob = (dataURI, mimeType) => {
  if (!dataURI.includes("data:application")) {
    dataURI = `data:${mimeType};base64,` + dataURI;
  }
  var byteString = atob(dataURI.split(",")[1]);
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);

  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeType });
};
