import React from 'react'
import ReactDOM from 'react-dom/client'
import { CalendarApp } from './CalendarApp';

import './assets/app.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CalendarApp />
  </React.StrictMode>,
)
