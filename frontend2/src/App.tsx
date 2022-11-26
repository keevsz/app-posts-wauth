import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppLayout } from './pages/Home/AppLayout'
import { NotFound } from './pages/Home/NotFound'
import { ProtectedRoute } from './pages/Home/ProtectedRoute'
import { Posts } from './pages/Post/Posts'
import { Profile } from './pages/Profile/Profile'
import { AppStore } from './redux/store'
import { getUserToLocalStorage } from './utilities/localStorage.utility'

const Login = lazy(() => import('./pages/Login/Login'))

const App = () => {
  const user = getUserToLocalStorage('user')
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route
          path="/"
          element={
            <ProtectedRoute user={user ? JSON.parse(user) : null}>
              <AppLayout></AppLayout>
            </ProtectedRoute>
          }
        >
          <Route index element={<Posts></Posts>}></Route>
          <Route path="/:email" element={<Profile></Profile>}></Route>
        </Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
