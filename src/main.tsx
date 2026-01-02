import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import './styles.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  document.body.innerHTML = `
    <div style="padding: 40px; font-family: sans-serif; text-align: center;">
      <h1 style="color: #c33;">Error: Root element not found</h1>
      <p>Make sure there is a &lt;div id="root"&gt;&lt;/div&gt; in index.html</p>
    </div>
  `
  throw new Error('Root element not found')
}

try {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  )
} catch (error) {
  console.error('Failed to render React app:', error)
  rootElement.innerHTML = `
    <div style="padding: 40px; font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #c33;">Failed to Load Application</h1>
      <p><strong>Error:</strong> ${error instanceof Error ? error.message : 'Unknown error'}</p>
      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-top: 20px;">
        <h2>To run this app:</h2>
        <ol style="text-align: left;">
          <li>Make sure Node.js is installed</li>
          <li>Install dependencies: <code>npm install</code></li>
          <li>Start the dev server: <code>npm run dev</code></li>
          <li>Open the URL shown (usually http://localhost:5173)</li>
        </ol>
        <p style="margin-top: 20px; color: #666;">
          <strong>Note:</strong> You cannot open index.html directly in a browser. 
          This React/TypeScript app must be served through Vite's development server.
        </p>
      </div>
    </div>
  `
}

