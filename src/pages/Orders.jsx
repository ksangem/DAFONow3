import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Search, Plus } from 'lucide-react'
import { orders, getStatusClass } from '../data/mockData'
import './Orders.css'

const filters = ['All', 'Submitted', 'In Review', 'Manufacturing', 'Shipped', 'Delivered']

export default function Orders() {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')
  const navigate = useNavigate()

  const filtered = orders.filter(o => {
    const matchSearch = !search ||
      o.patientName.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.jobNumber.toLowerCase().includes(search.toLowerCase())
    const matchFilter = activeFilter === 'All' || o.status === activeFilter
    return matchSearch && matchFilter
  })

  return (
    <div className="fade-in">
      <div className="page-header">
        <div className="flex-between">
          <div>
            <h1>Orders</h1>
            <p>Manage and track all DAFO orders</p>
          </div>
          <Link to="/orders/new" className="btn btn-primary">
            <Plus size={16} />
            New Order
          </Link>
        </div>
      </div>

      <div className="orders-toolbar">
        <div className="orders-toolbar-left">
          <div className="search-input-wrapper orders-search">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-pills">
            {filters.map(f => (
              <button
                key={f}
                className={`filter-pill ${activeFilter === f ? 'active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="orders-count">{filtered.length} order{filtered.length !== 1 ? 's' : ''}</div>

      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Job #</th>
              <th>Patient</th>
              <th>Product</th>
              <th>Status</th>
              <th>Facility</th>
              <th>Order Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(o => (
              <tr key={o.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/orders/${o.id}`)}>
                <td className="link-cell">{o.id}</td>
                <td className="text-muted">{o.jobNumber}</td>
                <td className="name-cell">{o.patientName}</td>
                <td>{o.product}</td>
                <td><span className={`status-badge ${getStatusClass(o.status)}`}>{o.status}</span></td>
                <td className="text-muted">{o.facility}</td>
                <td className="text-muted">{o.orderDate}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-muted)' }}>
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
