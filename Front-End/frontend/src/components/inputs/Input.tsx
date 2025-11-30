import styles from "./styles.module.css";

interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  labelClass?: string;
  readOnly?: boolean; // ✔ implementado
}

export default function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  className,
  labelClass,
  readOnly,
}: InputProps) {
  return (
    <div className={styles.container}>
      <label className={`${styles.label} ${labelClass || ""}`}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readOnly} // ✔ aplicado corretamente
        className={`${styles.inputField} ${className || ""}`}
      />
    </div>
  );
}
