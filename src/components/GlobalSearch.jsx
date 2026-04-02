import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, User, ShoppingCart, FileEdit, X } from 'lucide-react'
import { patients, orders, drafts } from '../data/mockData'
import './GlobalSearch.css'

export default function GlobalSearch({ onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    inputRef.current?.focus()
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const q = query.toLowerCase().trim()

  const filteredPatients = q
    ? patients.filter(p => p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q))
    : patients.slice(0, 3)

  const filteredOrders = q
    ? orders.filter(o => o.patientName.toLowerCase().includes(q) || o.id.toLowerCase().includes(q) || o.jobNumber.toLowerCase().includes(q))
    : orders.slice(0, 3)

  const filteredDrafts = q
    ? drafts.filter(d => d.patientName.toLowerCase().includes(q) || d.id.toLowerCase().includes(q))
    : drafts.slice(0, 2)

  const hasResults = filteredPatients.length > 0 || filteredOrders.length > 0 || filteredDrafts.length > 0

  const go = (path) => {
    navigate(path)
    onClose()
  }

  return (
    <div className="global-search-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="global-search">
        <div className="global-search-input-wrapper">
          <Search size={18} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search patients, orders, drafts..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button className="search-esc" onClick={onClose}>ESC</button>
        </div>
        <div className="global-search-results">
          {!hasResults && q && (
            <div className="global-search-empty">No results for "{query}"</div>
          )}

          {filteredPatients.length > 0 && (
            <div className="global-search-group">
              <div className="global-search-group-label">Patients</div>
              {filteredPatients.map(p => (
                <div key={p.id} className="global-search-item" onClick={() => go(`/patients/${p.id}`)}>
                  <div className="global-search-item-icon patient"><User size={16} /></div>
                  <div className="global-search-item-text">
                    <div className="global-search-item-title">{p.name}</div>
                    <div className="global-search-item-sub">{p.id} &middot; {p.physician}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredOrders.length > 0 && (
            <div className="global-search-group">
              <div className="global-search-group-label">Orders</div>
              {filteredOrders.map(o => (
                <div key={o.id} className="global-search-item" onClick={() => go(`/orders/${o.id}`)}>
                  <div className="global-search-item-icon order"><ShoppingCart size={16} /></div>
                  <div className="global-search-item-text">
                    <div className="global-search-item-title">{o.id} &mdash; {o.patientName}</div>
                    <div className="global-search-item-sub">{o.product} &middot; {o.status}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredDrafts.length > 0 && (
            <div className="global-search-group">
              <div className="global-search-group-label">Drafts</div>
              {filteredDrafts.map(d => (
                <div key={d.id} className="global-search-item" onClick={() => go('/drafts')}>
                  <div className="global-search-item-icon draft"><FileEdit size={16} /></div>
                  <div className="global-search-item-text">
                    <div className="global-search-item-title">{d.id} &mdash; {d.patientName}</div>
                    <div className="global-search-item-sub">{d.product} &middot; Step {d.currentStep}/{d.totalSteps}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
