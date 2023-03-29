import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import UserContextWrapper from './contexts/UserContext';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <UserContextWrapper subPages={(<App />)} />
)
