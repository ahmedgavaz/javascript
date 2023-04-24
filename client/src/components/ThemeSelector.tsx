import { useEffect } from 'react'
import { RadioGroup } from './RadioGroup'
import { useUserPreferences } from '../contexts/UserPreferencesContext'

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
  const { preferences: { theme }, setPreferences } = useUserPreferences()

  useEffect(() => {
    document.body.classList.remove('light')
    document.body.classList.remove('dark')

    document.body.classList.add(theme)
  }, [theme])

  return (
    <div>
      <RadioGroup
        options={OPTIONS}
        onChange={(value) => setPreferences({ theme: value as Theme })}
        value={theme}
      />
    </div>
  )
}
