import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { patients, orders, getStatusClass } from '../data/mockData'
import './PatientDetail.css'

export default function PatientDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const patient = patients.find(p => p.id === id)

  if (!patient) {
    return (
      <div className="fade-in">
        <Link to="/patients" className="patient-detail-back"><ArrowLeft size={16} /> Back to Patients</Link>
        <div className="empty-state"><p>Patient not found</p></div>
      </div>
    )
  }

  const patientOrders = orders.filter(o => o.patientId === id)
  const initials = patient.name.split(' ').map(n => n[0]).join('')

  return (
    <div className="fade-in">
      <Link to="/patients" className="patient-detail-back">
        <ArrowLeft size={16} /> Back to Patients
      </Link>

      <div className="patient-detail-grid">
        <div>
          <div className="card patient-profile-card">
            <div className="patient-avatar-large">{initials}</div>
            <div className="patient-profile-name">{patient.name}</div>
            <div className="patient-profile-id">{patient.id}</div>
            <div className="patient-profile-details">
              <div className="patient-profile-row"><span>Date of Birth</span><span>{patient.dob}</span></div>
              <div className="patient-profile-row"><span>Age</span><span>{patient.age}</span></div>
              <div className="patient-profile-row"><span>Physician</span><span>{patient.physician}</span></div>
              <div className="patient-profile-row"><span>Facility</span><span>{patient.facility}</span></div>
              <div className="patient-profile-row"><span>Phone</span><span>{patient.phone}</span></div>
              <div className="patient-profile-row"><span>Total Orders</span><span>{patient.orders}</span></div>
            </div>
          </div>
        </div>

        <div>
          <div className="card">
            <div className="card-header">
              <h3>Order History</h3>
              <Link to="/orders/new" className="btn btn-primary btn-sm">New Order</Link>
            </div>
            {patientOrders.length > 0 ? (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Product</th>
                    <th>Status</th>
                    <th>Side</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {patientOrders.map(o => (
                    <tr key={o.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/orders/${o.id}`)}>
                      <td className="link-cell">{o.id}</td>
                      <td>{o.product}</td>
                      <td><span className={`status-badge ${getStatusClass(o.status)}`}>{o.status}</span></td>
                      <td>{o.side}</td>
                      <td className="text-muted">{o.orderDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-state"><p>No orders yet for this patient</p></div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
