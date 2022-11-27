import { lazy, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppLayout } from './pages/Home/AppLayout'
import { NotFound } from './pages/Home/NotFound'
import { ProtectedRoute } from './pages/Home/ProtectedRoute'
import { LoginSuccess } from './pages/Login/LoginSuccess'
import { Posts } from './pages/Post/Posts'
import { Profile } from './pages/Profile/Profile'
import { createUser } from './redux/states/user'
import { getFromLocalStorage } from './utilities/handleStorage.utility'

const Login = lazy(() => import('./pages/Login/Login'))

const App = () => {
  const dispatch = useDispatch()

  const getAndCreateUser = (userToLS: any) => {
    if (userToLS) localStorage.setItem('user', JSON.stringify(userToLS))
    const user = getFromLocalStorage('user')
    dispatch(createUser(user))
  }
  getAndCreateUser(null)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout></AppLayout>
            </ProtectedRoute>
          }
        >
          <Route index element={<Posts></Posts>}></Route>
          <Route path="/:email" element={<Profile></Profile>}></Route>
        </Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
        <Route
          path="/login/success"
          element={<LoginSuccess render={getAndCreateUser}></LoginSuccess>}
        ></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
