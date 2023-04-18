import cls from 'classnames'
import classes from './Button.module.css'

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: 'primary' | 'secondary' | 'accent'
}

export function Button({
  variant = 'primary',
  children,
  className,
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      className={cls(classes.button, className, classes[variant])}
      {...buttonProps}
    >
      {children}
    </button>
  )
}
