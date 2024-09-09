import './App.css'
import Dashboard from '../src/Components/Dashboard'
import Login from '../src/Components/Login'
import Register from '../src/Components/Register'
import Forgot from '../src/Components/ForgotPassword'



import {
  createBrowserRouter, 
  RouterProvider
} from 'react-router-dom'


const router = createBrowserRouter([
  {
    path: '/',
    element: <div><Login/></div>
  }, 
  {
    path: '/register',
    element: <div><Register/></div>
  }, 
  {
    path: '/Dashboard',
    element: <div><Dashboard/></div>
  },
  {
    path: '/forgot',
    element: <div><Forgot/></div>
  }
])

function App() {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
