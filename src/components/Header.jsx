import { useEffect } from 'react'
import { Search, Bell } from 'lucide-react'
import { notifications } from '../data/mockData'
import './Header.css'

export default function Header({ onSearchClick }) {
  const unreadCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        onSearchClick()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onSearchClick])

  return (
    <header className="header">
      <button className="header-search" onClick={onSearchClick}>
        <Search size={16} />
        <span className="header-search-text">Search patient, order, or job #</span>
        <span className="header-search-shortcut">Ctrl+K</span>
      </button>
      <div className="header-actions">
        <button className="header-notification">
          <Bell size={18} />
          {unreadCount > 0 && <span className="header-notification-dot" />}
        </button>
      </div>
    </header>
  )
}
