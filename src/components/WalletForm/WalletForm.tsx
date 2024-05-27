import React, { memo } from "react";
import { WalletFormProps } from "../../types";
import styles from "./WalletForm.module.scss";

const WalletForm: React.FC<WalletFormProps> = ({
  id,
  wallet,
  amount,
  handleChange,
  handleDelete,
}): JSX.Element => {
  return (
    <div>
      <div className={styles.inputContainer}>
        <input
          className={styles.walletInput}
          type="text"
          placeholder="wallet address"
          value={wallet}
          onChange={(e) => handleChange(id, "wallet", e.target.value)}
        />
        <input
          className={styles.amountInput}
          type="text"
          placeholder="amount"
          value={amount}
          onChange={(e) => handleChange(id, "amount", e.target.value)}
        />
        <button
          className={styles.deleteButton}
          onClick={() => handleDelete(id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default memo(WalletForm);
