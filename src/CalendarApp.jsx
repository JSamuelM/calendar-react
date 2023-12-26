import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router'
import { AppTheme } from './theme/AppTheme'
import { store } from './store'
import { Provider } from 'react-redux'

export const CalendarApp = () => {
  return (
    <Provider store={ store }>
      <AppTheme>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </AppTheme>
    </Provider>
  )
}
