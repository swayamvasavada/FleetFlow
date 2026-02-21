import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <div>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
