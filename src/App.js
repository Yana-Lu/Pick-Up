import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { EventPage } from './components/EventPage'
import { signInWithGoogle } from './components/Firebase'

function App() {
  return (
    <div className="App">
      <Route path="/">
        <button>
          <Link to="/eventpage">揪團淨灘</Link>
        </button>
        <button onClick={signInWithGoogle}>登入</button>
      </Route>
      <Route path="/eventpage" exact component={EventPage} />
    </div>
  )
}

export default App
