import React from 'react';
import styles from './Button.module.scss'; // Создайте файл с базовыми стилями

interface ButtonProps {
  label: string;
  onClick: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, type = 'button', disabled }) => {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={styles.button}>
      {label}
    </button>
  );
};

export default Button;
