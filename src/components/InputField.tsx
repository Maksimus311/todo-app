import React from 'react';
import styles from './InputField.module.scss'; // Создайте файл с базовыми стилями

interface InputFieldProps {
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  type?: 'text' | 'number' | 'textarea' | 'date';
  required?: boolean;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, type = 'text', required, error }) => {
  return (
    <div className={styles.field}>
      <label>{label}{required && '*'}</label>
      {type === 'textarea' ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} required={required} />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(type === 'number' ? Number(e.target.value) : e.target.value)} required={required} />
      )}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default InputField;
