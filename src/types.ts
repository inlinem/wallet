export type WalletRowType = {
  id: string;
  wallet: string;
  amount: string;
};

export type FileRowType = (string | number)[];

export type WalletFormProps = {
  id: string;
  wallet: string;
  amount: string;
  handleChange: (id: string, field: string, value: string) => void;
  handleDelete: (id: string) => void;
};
