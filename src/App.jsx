import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { getUsers, getMetrics } from './api'

function Dashboard() {
  const [metrics, setMetrics] = useState(null)
  const [users, setUsers] = useState([])

  useEffect(() => {
    getMetrics().then(r => setMetrics(r.data)).catch(() => {})
    getUsers().then(r => setUsers(r.data)).catch(() => {})
  }, [])

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(metrics, null, 2)}</pre>
      <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Dashboard} />
      </Switch>
    </Router>
  )
}
