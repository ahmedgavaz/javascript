import { HTMLInputTypeAttribute } from "react";
import cls from 'classnames';
import classes from "./Input.module.css";

export interface TextInputProps {
  placeholder?: string;
  type?: HTMLInputTypeAttribute;

  value: string;
  onChange: (value: string) => void;

  className?: string;
}

export function TextInput({ placeholder, type, value, onChange, className }: TextInputProps) {
  return (
    <input
      className={cls(classes.input, className)}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)} />
  )
}
