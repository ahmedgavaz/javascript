import { useEffect, useState } from 'react'
import { RadioGroup } from './RadioGroup'

type Theme = 'light' | 'dark'

interface RadioOption {
  label: string
  value: string
}

const OPTIONS: RadioOption[] = [
  {
    label: 'Light',
    value: 'light',
  },
  {
    label: 'Dark',
    value: 'dark',
  },
]

export function ThemeSelector() {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    document.body.classList.remove('light')
    document.body.classList.remove('dark')

    document.body.classList.add(theme)
  }, [theme])

  return (
    <div>
      <RadioGroup
        options={OPTIONS}
        onChange={(value) => setTheme(value as Theme)}
        value={theme}
      />
    </div>
  )
}
