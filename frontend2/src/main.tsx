import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import { FullPage } from './pages/Home/Container'
import store from './redux/store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<div>Cargando</div>}>
      <Provider store={store}>
        <FullPage>
          <App />
        </FullPage>
      </Provider>
    </Suspense>
  </React.StrictMode>
)
