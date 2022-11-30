import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { AppLayout } from './pages/Home/AppLayout'
import { FullPage } from './pages/Home/Container'
import { NotFound } from './pages/Home/NotFound'
import { ProtectedRoute } from './pages/Home/ProtectedRoute'
import { AuthPage } from './pages/Login/AuthPage'
import { Posts } from './pages/Post/Posts'
import { Profile } from './pages/Profile/Profile'
import { createUser } from './redux/states/user'
import { AppStore } from './redux/store'
import { getFromLocalStorage } from './utilities/handleStorage.utility'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const user = getFromLocalStorage('user')
    dispatch(createUser(user))
  })
  const theme = useSelector((store: AppStore) => store.theme)
  return (
    <ThemeProvider theme={theme}>
      <FullPage>
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
      </FullPage>
    </ThemeProvider>
  )
}

export default App
