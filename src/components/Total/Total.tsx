import React from "react";
import styles from "./Total.module.scss";

type TotalProps = {
  total: string;
};
export default function Total({ total }: TotalProps): JSX.Element {
  return (
    <div className={styles.receiveAmount}>
      <div className={styles.receiveText}>Receive amount</div>
      <div className={`${styles.amount} green`}>{total} USDT (ERC-20)</div>
    </div>
  );
}
