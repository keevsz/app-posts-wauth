import { lazy } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { AppStore } from './redux/store'
import { Suspense } from 'react'
import { FullPage } from './styled-components/FullPage'

const Posts = lazy(() => import('./pages/Post/Posts'))
const Profile = lazy(() => import('./pages/Profile/Profile'))
const AuthPage = lazy(() => import('./pages/Login/AuthPage'))
const AppLayout = lazy(() => import('./pages/Home/components/AppLayout'))
const NotFound = lazy(() => import('./pages/Others/NotFound'))
const ProtectedRoute = lazy(() => import('./pages/Others/ProtectedRoute'))

const App = () => {
  const theme = useSelector((store: AppStore) => store.theme)
  return (
    <ThemeProvider theme={theme}>
      <FullPage>
        <Suspense fallback={<></>}>
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
        </Suspense>
      </FullPage>
    </ThemeProvider>
  )
}

export default App
