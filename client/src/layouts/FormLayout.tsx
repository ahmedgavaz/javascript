import { ReactNode } from 'react'
import cls from 'classnames'
import classes from './FormLayout.module.css'

export interface FormLayoutProps {
  children: ReactNode;
  className?: string;
}

export function FormLayout({ children, className }: FormLayoutProps) {
  return (
    <div className={cls(classes.root, className)}>
      {children}
    </div>
  )
}
