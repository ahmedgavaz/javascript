import { useEffect, useState } from 'react'
import { RadioGroup } from './RadioGroup'

type Theme = 'body.light' | 'body.dark'

interface RadioOption {
  label: string
  value: string
}

const OPTIONS: RadioOption[] = [
  {
    label: 'Light',
    value: 'body.light',
  },
  {
    label: 'Dark',
    value: 'body.dark',
  },
]

export function ThemeSelector() {
  const [theme, setTheme] = useState<Theme>('body.light')

  useEffect(() => {
    document.body.classList.remove('body.light')
    document.body.classList.remove('body.dark')

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
