import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { orders, patients, getStatusClass } from '../data/mockData'
import TrackingTimeline from '../components/TrackingTimeline'
import './OrderDetail.css'

export default function OrderDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const order = orders.find(o => o.id === id)

  if (!order) {
    return (
      <div className="fade-in">
        <Link to="/orders" className="order-detail-back"><ArrowLeft size={16} /> Back to Orders</Link>
        <div className="empty-state"><p>Order not found</p></div>
      </div>
    )
  }

  const patient = patients.find(p => p.id === order.patientId)
  const initials = order.patientName.split(' ').map(n => n[0]).join('')

  return (
    <div className="fade-in">
      <Link to="/orders" className="order-detail-back">
        <ArrowLeft size={16} /> Back to Orders
      </Link>

      <div className="order-detail-header">
        <div>
          <h1>{order.id}</h1>
          <div className="order-meta">
            <span className={`status-badge ${getStatusClass(order.status)}`}>{order.status}</span>
            <span>Job {order.jobNumber}</span>
            <span>Ordered {order.orderDate}</span>
          </div>
        </div>
      </div>

      <div className="order-detail-grid">
        <div className="order-detail-main">
          <div className="card">
            <div className="card-header">
              <h3>Order Tracking</h3>
            </div>
            <TrackingTimeline status={order.status} mode="vertical" />
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Order Specifications</h3>
            </div>
            <div className="order-specs-grid">
              <div className="order-spec-item">
                <div className="order-spec-label">Product</div>
                <div className="order-spec-value">{order.product}</div>
              </div>
              <div className="order-spec-item">
                <div className="order-spec-label">Side</div>
                <div className="order-spec-value">{order.side}</div>
              </div>
              <div className="order-spec-item">
                <div className="order-spec-label">Size</div>
                <div className="order-spec-value">{order.size}</div>
              </div>
              <div className="order-spec-item">
                <div className="order-spec-label">Color / Pattern</div>
                <div className="order-spec-value">{order.color}</div>
              </div>
              <div className="order-spec-item">
                <div className="order-spec-label">Estimated Delivery</div>
                <div className="order-spec-value">{order.estimatedDelivery}</div>
              </div>
              {order.trackingNumber && (
                <div className="order-spec-item">
                  <div className="order-spec-label">Tracking Number</div>
                  <div className="order-spec-value">{order.trackingNumber}</div>
                </div>
              )}
              {order.deliveredDate && (
                <div className="order-spec-item">
                  <div className="order-spec-label">Delivered Date</div>
                  <div className="order-spec-value">{order.deliveredDate}</div>
                </div>
              )}
            </div>
            {order.notes && (
              <div style={{ marginTop: 'var(--space-base)', padding: 'var(--space-md)', background: 'var(--color-bg)', borderRadius: 'var(--radius-md)', fontSize: 'var(--fs-sm)', color: 'var(--color-text-primary)' }}>
                <strong>Notes:</strong> {order.notes}
              </div>
            )}
          </div>
        </div>

        <div className="order-detail-sidebar">
          <div className="card patient-sidebar-card">
            <div className="patient-sidebar-avatar">{initials}</div>
            <div className="patient-sidebar-name">{order.patientName}</div>
            <div className="patient-sidebar-id">{order.patientId}</div>
            {patient && (
              <>
                <div className="patient-sidebar-detail"><span>Physician</span><span>{patient.physician}</span></div>
                <div className="patient-sidebar-detail"><span>Facility</span><span>{patient.facility}</span></div>
                <div className="patient-sidebar-detail"><span>Phone</span><span>{patient.phone}</span></div>
                <div style={{ marginTop: 'var(--space-base)' }}>
                  <button className="btn btn-secondary btn-sm" style={{ width: '100%' }} onClick={() => navigate(`/patients/${patient.id}`)}>
                    View Patient
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Product Info</h3>
            </div>
            <div style={{ fontSize: 'var(--fs-base)', color: 'var(--color-text-dark)', fontWeight: 'var(--fw-medium)', marginBottom: 4 }}>{order.product}</div>
            <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-text-muted)' }}>
              {order.product === 'DAFO 3.5' && 'Posterior leaf spring AFO for flexible foot and ankle control'}
              {order.product === 'DAFO 4' && 'Hinged AFO allowing controlled dorsiflexion'}
              {order.product === 'DAFO FlexiSport' && 'Flexible sport AFO for active children'}
              {order.product === 'DAFO Tami2' && 'Floor reaction AFO for knee extension assistance'}
              {order.product === 'DAFO JumpStart' && 'SMO for mild foot and ankle instability'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
