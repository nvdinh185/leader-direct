export const xlsxMime = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
export const xlsMime = "application/vnd.ms-excel";
export const docxMime = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
export const docMime = "application/msword";
export const pdfMime = "application/pdf";
export const excelTypes = [xlsxMime, xlsMime, pdfMime, docxMime, docMime];

export const mapFileColor = [
  { fileType: xlsxMime, color: "green" },
  { fileType: xlsMime, color: "green" },
  { fileType: docMime, color: "blue" },
  { fileType: docxMime, color: "blue" },
  { fileType: pdfMime, color: "red" },
];
