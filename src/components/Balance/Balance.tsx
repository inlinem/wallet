import React from "react";
import styles from "./Balance.module.scss";

export default function Balance() {
  return (
    <div className={styles.balance}>
      <div className={styles.balanceTitle}>Balance USDT (ERC-20)</div>
      <div className={`${styles.balanceValue} ${styles.green}`}>
        <span className={styles.balanceAmount}>141 241.5121</span>
        <div className={styles.usdtContainer}>
          <span className={styles.usdt}>USDT</span>
          <span className={styles.erc20}>(ERC-20)</span>
        </div>
      </div>
    </div>
  );
}
