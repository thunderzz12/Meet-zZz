import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// to avoid null reference errorss
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Failed to find the root element. -_- deleted the <div id="root">?');
} else {
  ReactDOM.createRoot(rootElement).render(
    // to ctch bugs
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
