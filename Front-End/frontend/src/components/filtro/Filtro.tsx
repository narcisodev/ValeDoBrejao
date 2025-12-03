import styles from "./filtro.module.css";

type Option = { label: string; value: string | number };

type SelectFilterProps = {
  label: string;
  options: Option[];
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  error?: string; // nova prop para mensagem de erro
};

export default function SelectFilter({
  label,
  options,
  value,
  onChange,
  placeholder = "Selecione...",
  error,
}: SelectFilterProps) {
  return (
    <div className={styles.selectContainer}>
      <span className={styles.label}>{label}</span>
      <select
        className={`${styles.selectField} ${error ? styles.selectError : ""}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
