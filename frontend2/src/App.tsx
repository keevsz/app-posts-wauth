import { lazy, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppLayout } from './pages/Home/AppLayout'
import { NotFound } from './pages/Home/NotFound'
import { ProtectedRoute } from './pages/Home/ProtectedRoute'
import { Posts } from './pages/Post/Posts'
import { Profile } from './pages/Profile/Profile'
import { createUser } from './redux/states/user'

const Login = lazy(() => import('./pages/Login/Login'))

const App = () => {
  const dispatch = useDispatch()
  const user = localStorage.getItem('user')
  dispatch(createUser(user))

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
      </Routes>
    </BrowserRouter>
  )
}

export default App
