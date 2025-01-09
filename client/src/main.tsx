import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ContextProvider } from './context/Context.tsx'
import { PostContextProvider } from './context/PostContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContextProvider>
      <PostContextProvider>
        <App />
      </PostContextProvider>
    </ContextProvider>
  </React.StrictMode>,
)
