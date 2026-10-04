import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './app/App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { ErrorBoundary } from './components/ui/ErrorBoundary/ErrorBoundary.tsx'

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ErrorBoundary>
)
