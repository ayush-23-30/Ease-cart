import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './component/Home.jsx';
import Cart from './component/Cart.jsx';
import Context from './context/Context.jsx';

const router = createBrowserRouter([
  {
    path : "/", 
    element : <App/>, 
    children : [
      {
        path : "/", 
        element : <Home></Home>
      } , 
      {
        path : "/cart", 
        element: <Cart></Cart>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Context>
    <RouterProvider router={router}>
    <App />
    </RouterProvider>
    </Context>

  </React.StrictMode>,
)
