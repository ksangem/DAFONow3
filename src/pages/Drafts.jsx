import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Play, Trash2 } from 'lucide-react'
import { drafts } from '../data/mockData'
import './Drafts.css'

export default function Drafts() {
  const navigate = useNavigate()
  const [discardTarget, setDiscardTarget] = useState(null)
  const [draftList, setDraftList] = useState(drafts)

  const circumference = 2 * Math.PI * 20

  const handleDiscard = () => {
    setDraftList(prev => prev.filter(d => d.id !== discardTarget.id))
    setDiscardTarget(null)
  }

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1>Drafts</h1>
        <p>{draftList.length} unsaved draft{draftList.length !== 1 ? 's' : ''}</p>
      </div>

      {draftList.length > 0 ? (
        <div className="drafts-grid">
          {draftList.map(d => {
            const pct = d.currentStep / d.totalSteps
            const offset = circumference * (1 - pct)
            return (
              <div key={d.id} className="draft-card">
                <div className="draft-card-header">
                  <span className="draft-card-id">{d.id}</span>
                  <span className="draft-card-modified">Modified {d.lastModified}</span>
                </div>
                <div className="draft-card-patient">{d.patientName}</div>
                <div className="draft-card-product">{d.product} &middot; {d.side} &middot; {d.size}</div>

                <div className="draft-card-progress">
                  <div className="draft-progress-circle">
                    <svg viewBox="0 0 48 48">
                      <circle className="progress-bg" />
                      <circle
                        className="progress-fill"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                      />
                    </svg>
                    <div className="draft-progress-text">{Math.round(pct * 100)}%</div>
                  </div>
                  <div className="draft-progress-label">
                    Step <strong>{d.currentStep}</strong> of <strong>{d.totalSteps}</strong>
                  </div>
                </div>

                <div className="draft-card-actions">
                  <button className="btn btn-primary btn-sm" onClick={() => navigate('/orders/new')}>
                    <Play size={14} />
                    Resume
                  </button>
                  <button className="btn btn-ghost btn-sm" style={{ color: 'var(--color-error)' }} onClick={() => setDiscardTarget(d)}>
                    <Trash2 size={14} />
                    Discard
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="card">
          <div className="empty-state">
            <p>No drafts. All caught up!</p>
          </div>
        </div>
      )}

      {/* Discard Draft Modal */}
      {discardTarget && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setDiscardTarget(null) }}>
          <div className="modal">
            <div className="modal-header">
              <h3>Discard Draft</h3>
            </div>
            <div className="modal-body">
              Are you sure you want to discard the draft for <strong>{discardTarget.patientName}</strong> ({discardTarget.id})? This action cannot be undone.
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setDiscardTarget(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={handleDiscard}>
                Discard Draft
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
