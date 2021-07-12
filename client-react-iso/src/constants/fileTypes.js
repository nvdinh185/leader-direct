import { FilePdfFilled, FileExcelFilled, FileWordFilled } from "@ant-design/icons";

export const xlsxMime = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
export const xlsMime = "application/vnd.ms-excel";
export const docxMime = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
export const docMime = "application/msword";
export const pdfMime = "application/pdf";
export const excelTypes = [xlsxMime, xlsMime, pdfMime, docxMime, docMime];

export const mapFileColor = [
  { fileType: xlsxMime, color: "green", fileTypeIcon: FileExcelFilled },
  { fileType: xlsMime, color: "green", fileTypeIcon: FileExcelFilled },
  { fileType: docMime, color: "blue", fileTypeIcon: FileWordFilled },
  { fileType: docxMime, color: "blue", fileTypeIcon: FileWordFilled },
  { fileType: pdfMime, color: "red", fileTypeIcon: FilePdfFilled },
];
