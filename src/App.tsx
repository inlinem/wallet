// import styles from "./App.module.scss";
import React, { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { WalletRowType } from "./types";
import { useFileParser } from "./useFileParser";
import { useDropzone } from "react-dropzone";
import WalletForm from "./components/WalletForm/WalletForm";
import Total from "./components/Total/Total";
import Balance from "./components/Balance/Balance";
import styles from './App.module.scss'

function App() {
  const [rows, setRows] = useState<WalletRowType[]>([
    {
      id: uuidv4(),
      wallet: "",
      amount: "0.00",
    },
  ]);


  const handleAddRows = () => {
    setRows([...rows, { id: uuidv4(), wallet: "", amount: "" }]);
  };

  const handleDelete = (id: string) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleChange = (
    id: string,
    type: "wallet" | "amount",
    value: string
  ) => {
    setRows(
      rows.map((row) => (row.id === id ? { ...row, [type]: value } : row))
    );
  };

  const onDrop = useFileParser(setRows);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noClick: true,
    accept: {
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
  });

  const total = rows
    .reduce((sum, row) => sum + parseFloat(row.amount || "0"), 0)
    .toFixed(2);
  return (
    <div className={styles.container} {...getRootProps}>
      <input {...getInputProps()} style={{ display: "none" }} />
      <h3>FORM</h3>
      <Balance />
      {rows.map((row) => (
        <WalletForm
          key={row.id}
          {...row}
          handleChange={handleChange}
          handleDelete={handleDelete}
        />
      ))}

      <div className={styles.actions}>
        <button className={styles.addWalletButton} onClick={handleAddRows}>Add new wallet</button>
      </div>
      <Total total={total} />
      <button className={styles.withDrawButton}>Withdraw</button>
    </div>
  );
}

export default App;
