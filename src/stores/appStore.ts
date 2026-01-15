import { create } from 'zustand'

type AppState = {
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const useAppStore = create<AppState>(set => ({
  isDarkMode: false,
  toggleDarkMode: () => {
    set(state => {
      const isDarkMode = !state.isDarkMode
      return {
        isDarkMode,
      }
    })
  },
}))

export default useAppStore
