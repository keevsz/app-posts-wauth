import { lazy } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppLayout } from './pages/Home/AppLayout'
import { NotFound } from './pages/Home/NotFound'
import { ProtectedRoute } from './pages/Home/ProtectedRoute'
import { AuthPage } from './pages/Login/AuthPage'
import { Posts } from './pages/Post/Posts'
import { Profile } from './pages/Profile/Profile'
import { createUser } from './redux/states/user'
import { getFromLocalStorage } from './utilities/handleStorage.utility'

const App = () => {
  const dispatch = useDispatch()
  const user = getFromLocalStorage('user')
  dispatch(createUser(user))

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthPage />}></Route>
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
