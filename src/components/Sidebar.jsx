import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, ShoppingCart, Users, FileEdit, Truck, HelpCircle, Plus } from 'lucide-react'
import { drafts } from '../data/mockData'
import './Sidebar.css'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/orders', icon: ShoppingCart, label: 'Orders' },
  { to: '/patients', icon: Users, label: 'Patients' },
  { to: '/drafts', icon: FileEdit, label: 'Drafts', badge: drafts.length },
  { to: '/tracking', icon: Truck, label: 'Tracking' },
  { to: '/help', icon: HelpCircle, label: 'Help' },
]

export default function Sidebar() {
  const navigate = useNavigate()

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">CD</div>
        <div className="sidebar-logo-text">
          DAFONow
          <span>Cascade Dafo</span>
        </div>
      </div>

      <div className="sidebar-new-order">
        <button className="btn btn-primary" onClick={() => navigate('/orders/new')}>
          <Plus size={16} />
          New Order
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
          >
            <item.icon size={18} />
            {item.label}
            {item.badge > 0 && <span className="sidebar-badge">{item.badge}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-user">
        <div className="sidebar-user-avatar">KS</div>
        <div className="sidebar-user-info">
          <div className="sidebar-user-name">Kiran S.</div>
          <div className="sidebar-user-role">Orthotist</div>
        </div>
      </div>
    </aside>
  )
}
