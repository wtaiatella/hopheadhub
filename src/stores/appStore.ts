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

      // Atualiza o atributo data-theme para o shadcn
      if (isDarkMode) {
        document.documentElement.classList.add('dark')
        document.documentElement.setAttribute('data-theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        document.documentElement.setAttribute('data-theme', 'light')
      }

      return {
        isDarkMode,
      }
    })
  },
}))

// Inicializa o tema no carregamento
if (typeof document !== 'undefined') {
  const isDarkMode = useAppStore.getState().isDarkMode
  if (isDarkMode) {
    document.documentElement.classList.add('dark')
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    document.documentElement.setAttribute('data-theme', 'light')
  }
}

export default useAppStore
