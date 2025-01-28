import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//Pages
import AddPost from './pages/AddPost.jsx'
import AllPost from './pages/AllPost.jsx'
import  EditPost from "./pages/EditPost.jsx";
import Home from "./pages/Home.jsx";
import AuthLogin from "./pages/AuthLogin.jsx"
import Post from "./pages/Post.jsx";
import Signup from './pages/Signup.jsx'

//Components
import AuthLayout from './components/AuthLayout/AuthLayout.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false} >
          <AuthLogin />
        </AuthLayout>
        )
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false} >
          <Signup />
          </AuthLayout>
        )
      },
      {
        path: '/all-posts',
        element: (
          <AuthLayout authentication={true} >
            {" "}
          <AllPost />
          </AuthLayout>
        )
      },
      {
        path: '/add-post',
        element: (
          <AuthLayout authentication={true} >
            {" "}
          <AddPost />
          </AuthLayout>
        )
      },
      {
        path: '/edit-post/:slug',
        element: (
          <AuthLayout authentication={true} >
            {" "}
          <EditPost />
          </AuthLayout>
        )
      },
      {
        path: '/post/:slug',
        element: (          
          <Post />          
        )
      },

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
  </StrictMode>,
)
