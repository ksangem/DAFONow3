import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { orders, getStatusClass } from '../data/mockData'
import TrackingTimeline from '../components/TrackingTimeline'
import './Tracking.css'

export default function Tracking() {
  const [tab, setTab] = useState('active')
  const navigate = useNavigate()

  const active = orders.filter(o => o.status !== 'Delivered')
  const delivered = orders.filter(o => o.status === 'Delivered')
  const displayed = tab === 'active' ? active : delivered

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1>Tracking</h1>
        <p>Monitor order progress and delivery status</p>
      </div>

      <div className="tabs">
        <button className={`tab ${tab === 'active' ? 'active' : ''}`} onClick={() => setTab('active')}>
          Active ({active.length})
        </button>
        <button className={`tab ${tab === 'delivered' ? 'active' : ''}`} onClick={() => setTab('delivered')}>
          Delivered ({delivered.length})
        </button>
      </div>

      <div className="tracking-cards">
        {displayed.map(o => (
          <div key={o.id} className="tracking-card" onClick={() => navigate(`/orders/${o.id}`)}>
            <div className="tracking-card-top">
              <span className="tracking-card-id">{o.id}</span>
              <span className={`status-badge ${getStatusClass(o.status)}`}>{o.status}</span>
            </div>
            <div className="tracking-card-info">
              <span>{o.patientName}</span>
              <span>{o.product}</span>
              <span>Est. {o.estimatedDelivery}</span>
            </div>
            <div className="tracking-card-timeline">
              <TrackingTimeline status={o.status} mode="horizontal" />
              <div className="tracking-card-labels">
                <span>Submitted</span>
                <span>Review</span>
                <span>Mfg</span>
                <span>Shipped</span>
                <span>Delivered</span>
              </div>
            </div>
          </div>
        ))}
        {displayed.length === 0 && (
          <div className="card">
            <div className="empty-state"><p>No {tab} orders</p></div>
          </div>
        )}
      </div>
    </div>
  )
}
