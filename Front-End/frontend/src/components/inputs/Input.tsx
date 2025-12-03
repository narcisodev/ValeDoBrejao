import styles from "./styles.module.css";
import InputMask from "react-input-mask";
import React, { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  labelClass?: string;
  readOnly?: boolean;
  mask?: string; // máscara opcional
  error?: string; // nova prop de erro
}

// Usando forwardRef para passar a referência corretamente
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      type = "text",
      placeholder,
      value,
      onChange,
      className,
      labelClass,
      readOnly,
      mask,
      error,
    },
    ref
  ) => {
    return (
      <div className={styles.container}>
        <label className={`${styles.label} ${labelClass || ""}`}>{label}</label>

        {mask ? (
          <InputMask
            mask={mask}
            value={value}
            onChange={onChange}
            disabled={readOnly}
          >
            {(inputProps: InputHTMLAttributes<HTMLInputElement>) => (
              <input
                {...inputProps}
                ref={ref} // passa a ref aqui
                type={type}
                placeholder={placeholder}
                className={`${styles.inputField} ${className || ""} ${
                  error ? styles.inputError : ""
                }`}
              />
            )}
          </InputMask>
        ) : (
          <input
            ref={ref} // ref também aqui
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            className={`${styles.inputField} ${className || ""} ${
              error ? styles.inputError : ""
            }`}
          />
        )}

        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  }
);

export default Input;
