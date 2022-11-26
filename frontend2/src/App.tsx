import React, { lazy, Suspense } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Post } from './pages/Post/Post'
import store from './redux/store'
const Login = lazy(() => import('./pages/Login/Login'))
const App = () => {
  return (
    <React.StrictMode>
      <Suspense fallback={<div>Cargando</div>}>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login></Login>}></Route>
              <Route path="/" element={<Post></Post>}></Route>
            </Routes>
          </BrowserRouter>
        </Provider>
      </Suspense>
    </React.StrictMode>
  )
}

export default App
