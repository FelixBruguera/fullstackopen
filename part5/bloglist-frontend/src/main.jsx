import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import store from './store'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>,
)
