import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import { LoginPage } from './components/pages/LoginPage'

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/login" replace /> },
  { path: '/login', element: <LoginPage /> },
])

export default function App() {
  return <RouterProvider router={router} />
}
