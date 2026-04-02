import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import AwarenessStrip from './AwarenessStrip'
import GlobalSearch from './GlobalSearch'
import { drafts } from '../data/mockData'

export default function Layout() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-wrapper">
        <AwarenessStrip draftCount={drafts.length} />
        <Header onSearchClick={() => setSearchOpen(true)} />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
      {searchOpen && <GlobalSearch onClose={() => setSearchOpen(false)} />}
    </div>
  )
}
