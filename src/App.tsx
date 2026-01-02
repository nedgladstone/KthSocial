import { useState } from 'react'
import PersonList from './components/PersonList'
import PostFeed from './components/PostFeed'
import type { ViewType } from './types'

const API_BASE_URL = 'http://localhost:3000'

function App(): JSX.Element {
  const [activeView, setActiveView] = useState<ViewType>('post-feed')

  return (
    <div className="container">
      <header>
        <h1>KTH Social</h1>
        <nav className="menu">
          <button
            className={`menu-item ${activeView === 'post-feed' ? 'active' : ''}`}
            onClick={() => setActiveView('post-feed')}
          >
            News Feed
          </button>
          <button
            className={`menu-item ${activeView === 'list-persons' ? 'active' : ''}`}
            onClick={() => setActiveView('list-persons')}
          >
            List Persons
          </button>
        </nav>
      </header>

      <main>
        <div className="content">
          {activeView === 'post-feed' && <PostFeed apiBaseUrl={API_BASE_URL} />}
          {activeView === 'list-persons' && <PersonList apiBaseUrl={API_BASE_URL} />}
        </div>
      </main>
    </div>
  )
}

export default App



