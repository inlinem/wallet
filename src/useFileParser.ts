import * as XLSX from "xlsx";
import { FileRowType, WalletRowType } from "./types";
import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

export const useFileParser = (
  setRows: (rows: WalletRowType[]) => void
) => {
  return useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file && file.name.match(/\.(xlsx|xls)$/)) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const arrayBuffer = e.target?.result;
          const data = new Uint8Array(arrayBuffer as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
          }) as FileRowType[];

          const dataRows = json.slice(1);

          const rows = dataRows

            .map((row: FileRowType) => {
              const wallet = row[0];
              let amount = row[1];

              if (
                !wallet ||
                wallet === "Wallet" ||
                typeof amount === "undefined"
              ) {
                return null;
              }
              let currency = " USD";
              if (row.length > 2 && row[2]) {
                currency = ` ${row[2]}`;
              }

              amount = `${
                typeof amount === "number" ? amount.toFixed(2) : "0.00"
              }${currency}`;

              return { id: uuidv4(), wallet, amount };
            })
            .filter((row): row is WalletRowType => row !== null);

            setRows(rows);
        };
        reader.readAsArrayBuffer(file);
      } else {
        console.log("Only Excel files will be accepted.");
      }
    },
    [setRows]
  );
};
