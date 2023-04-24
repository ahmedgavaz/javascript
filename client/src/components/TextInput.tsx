import { HTMLInputTypeAttribute } from "react";
import cls from 'classnames';
import classes from "./TextInput.module.css";

interface BaseTextInputProps {
  placeholder?: string;

  value: string;
  onChange: (value: string) => void;

  className?: string;
  errors?: string[];
}

export type TextInputProps = BaseTextInputProps & (
  { multiline?: false; type?: HTMLInputTypeAttribute; } |
  { multiline: true; }
)

export function TextInput({ placeholder, value, onChange, className, errors, ...props }: TextInputProps) {
  if (props.multiline) {
    return (
      <div className={classes.root}>
        <textarea
          className={cls(classes.input, className)}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)} />

        {errors?.map(error => (
          <span key={error} className={classes.errorLabel}>{error}</span>
        ))}
      </div>
    )
  }

  return (
    <div className={classes.root}>
      <input
        className={cls(classes.input, className)}
        placeholder={placeholder}
        type={props.type}
        value={value}
        onChange={(e) => onChange(e.target.value)} />

      {errors?.map(error => (
        <span key={error} className={classes.errorLabel}>{error}</span>
      ))}
    </div>
  )
}
