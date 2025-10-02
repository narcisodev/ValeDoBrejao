import styles from "./filtro.module.css";

type Option = { label: string; value: string | number };

type SelectFilterProps = {
  label: string;
  options: Option[];
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
};

export default function SelectFilter({
  label,
  options,
  value,
  onChange,
  placeholder = "Selecione...",
}: SelectFilterProps) {
  return (
    <div className={styles.selectContainer}>
      <span className={styles.label}>{label}</span>
      <select
        className={styles.selectField}
        value={value} // ← aqui é importante usar o valor atual do estado
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
