import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Clock, Truck, CheckCircle, Plus, FileEdit, HelpCircle } from 'lucide-react'
import { orders, drafts, patients } from '../data/mockData'
import { getStatusClass } from '../data/mockData'
import TrackingTimeline from '../components/TrackingTimeline'
import './Dashboard.css'

export default function Dashboard() {
  const navigate = useNavigate()

  const activeOrders = orders.filter(o => o.status !== 'Delivered').length
  const inManufacturing = orders.filter(o => o.status === 'Manufacturing').length
  const shipped = orders.filter(o => o.status === 'Shipped').length
  const delivered = orders.filter(o => o.status === 'Delivered').length

  const recentOrders = orders.slice(0, 5)
  const activeTracking = orders.filter(o => o.status === 'Manufacturing' || o.status === 'Shipped').slice(0, 3)

  return (
    <div className="fade-in">
      <div className="dashboard-welcome">
        <h1>Good morning, Kiran</h1>
        <p>Here is your order activity for today.</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'var(--color-primary-bg)', color: 'var(--color-primary)' }}>
            <ShoppingCart size={18} />
          </div>
          <div className="stat-value">{activeOrders}</div>
          <div className="stat-label">Active Orders</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#FFF4E8', color: 'var(--color-accent)' }}>
            <Clock size={18} />
          </div>
          <div className="stat-value">{inManufacturing}</div>
          <div className="stat-label">Manufacturing</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#E6F4F1', color: 'var(--color-success)' }}>
            <Truck size={18} />
          </div>
          <div className="stat-value">{shipped}</div>
          <div className="stat-label">In Transit</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#EDF7E8', color: 'var(--color-success-light)' }}>
            <CheckCircle size={18} />
          </div>
          <div className="stat-value">{delivered}</div>
          <div className="stat-label">Delivered</div>
        </div>
      </div>

      {drafts.length > 0 && (
        <div className="card mb-xl">
          <div className="card-header">
            <h3>Resume Drafts</h3>
            <Link to="/drafts" className="btn btn-ghost btn-sm">View All</Link>
          </div>
          <div className="resume-drafts">
            {drafts.map(d => (
              <div key={d.id} className="resume-draft-card" onClick={() => navigate('/drafts')}>
                <div className="resume-draft-patient">{d.patientName}</div>
                <div className="resume-draft-product">{d.product} &middot; {d.id}</div>
                <div className="resume-draft-progress">
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: `${(d.currentStep / d.totalSteps) * 100}%` }} />
                  </div>
                  <span>Step {d.currentStep}/{d.totalSteps}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="dashboard-grid">
        <div className="dashboard-main">
          <div className="card">
            <div className="card-header">
              <h3>Recent Orders</h3>
              <Link to="/orders" className="btn btn-ghost btn-sm">View All</Link>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Patient</th>
                  <th>Product</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(o => (
                  <tr key={o.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/orders/${o.id}`)}>
                    <td className="link-cell">{o.id}</td>
                    <td className="name-cell">{o.patientName}</td>
                    <td>{o.product}</td>
                    <td><span className={`status-badge ${getStatusClass(o.status)}`}>{o.status}</span></td>
                    <td className="text-muted">{o.orderDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="dashboard-sidebar-section">
          <div className="card">
            <div className="card-header">
              <h3>Active Tracking</h3>
            </div>
            {activeTracking.map(o => (
              <div key={o.id} style={{ marginBottom: 'var(--space-base)', cursor: 'pointer' }} onClick={() => navigate(`/orders/${o.id}`)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontWeight: 'var(--fw-medium)', color: 'var(--color-text-dark)', fontSize: 'var(--fs-sm)' }}>{o.id}</span>
                  <span className={`status-badge ${getStatusClass(o.status)}`} style={{ fontSize: 11 }}>{o.status}</span>
                </div>
                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-text-muted)', marginBottom: 8 }}>{o.patientName}</div>
                <TrackingTimeline status={o.status} mode="horizontal" />
              </div>
            ))}
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Quick Actions</h3>
            </div>
            <div className="quick-actions">
              <Link to="/orders/new" className="quick-action-item">
                <div className="quick-action-icon" style={{ background: 'var(--color-primary-bg)', color: 'var(--color-primary)' }}>
                  <Plus size={16} />
                </div>
                <div className="quick-action-text">
                  New Order
                  <span>Start a new DAFO order</span>
                </div>
              </Link>
              <Link to="/drafts" className="quick-action-item">
                <div className="quick-action-icon" style={{ background: '#FFF4E8', color: 'var(--color-accent)' }}>
                  <FileEdit size={16} />
                </div>
                <div className="quick-action-text">
                  Resume Draft
                  <span>{drafts.length} pending drafts</span>
                </div>
              </Link>
              <Link to="/help" className="quick-action-item">
                <div className="quick-action-icon" style={{ background: '#F0EDF5', color: 'var(--color-purple)' }}>
                  <HelpCircle size={16} />
                </div>
                <div className="quick-action-text">
                  Get Help
                  <span>Contact support or FAQ</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
