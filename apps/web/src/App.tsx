import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import { LoginPage } from './components/pages/LoginPage'
import { SignupPage } from './components/pages/SignupPage'

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/login" replace /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/cadastro', element: <SignupPage /> },
])

export default function App() {
  return <RouterProvider router={router} />
}
