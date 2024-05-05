import { createRouter, RouterProvider } from '@tanstack/react-router'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { routeTree } from './routeTree.gen'
import { NotFoundPage } from './components'
import './styles.css'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider
      router={createRouter({
        routeTree,
        defaultNotFoundComponent: () => <NotFoundPage />,
      })}
    />
  </React.StrictMode>,
)
