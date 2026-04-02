import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { patients } from '../data/mockData'
import './Patients.css'

export default function Patients() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const filtered = patients.filter(p =>
    !search ||
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase()) ||
    p.physician.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1>Patients</h1>
        <p>Manage patient records and order history</p>
      </div>

      <div className="patients-toolbar">
        <div className="search-input-wrapper patients-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search patients..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="patients-count">{filtered.length} patient{filtered.length !== 1 ? 's' : ''}</div>

      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Physician</th>
              <th>Facility</th>
              <th>Orders</th>
              <th>Last Order</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/patients/${p.id}`)}>
                <td className="link-cell">{p.id}</td>
                <td className="name-cell">{p.name}</td>
                <td>{p.age}</td>
                <td>{p.physician}</td>
                <td className="text-muted">{p.facility}</td>
                <td>{p.orders}</td>
                <td className="text-muted">{p.lastOrder}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-muted)' }}>
                  No patients found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
