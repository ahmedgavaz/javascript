import { ReactNode, createContext, useContext, useState } from "react";
import { LocalStorage } from "../lib/LocalStorage";

export interface UserPreferences {
  theme: 'light' | 'dark'
  isGrid: boolean
}

interface ContextValue {
  preferences: UserPreferences
  setPreferences: (preferences: Partial<UserPreferences>) => void
}

const Context = createContext<ContextValue | undefined>(undefined)

const storage = new LocalStorage<UserPreferences>('preferences')

export function UserPreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, _setPreferences] = useState<UserPreferences>(() => {
    return storage.get() ?? { theme: 'light', isGrid: false }
  })

  function setPreferences(updates: Partial<UserPreferences>) {
    const newPreferences = { ...preferences, ...updates }

    storage.set(newPreferences)
    _setPreferences(newPreferences)
  }

  return (
    <Context.Provider value={{ preferences, setPreferences }}>{children}</Context.Provider>
  )
}

export function useUserPreferences() {
  const context = useContext(Context)
  if (!context) {
    throw new Error('Cannot use useUserPreferences outside of UserPreferencesProvider')
  }

  return context
}
