import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Save, CheckCircle, X } from 'lucide-react'
import { patients, products, colorOptions } from '../data/mockData'
import './NewOrder.css'

const stepLabels = ['Patient', 'Product', 'Customize', 'Review', 'Submit']

export default function NewOrder() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [showDiscard, setShowDiscard] = useState(false)

  const [form, setForm] = useState({
    patientId: '',
    productId: '',
    side: '',
    size: '',
    color: '',
    notes: '',
  })

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

  const selectedPatient = patients.find(p => p.id === form.patientId)
  const selectedProduct = products.find(p => p.id === form.productId)

  const canNext = () => {
    if (step === 1) return !!form.patientId
    if (step === 2) return !!form.productId
    if (step === 3) return !!form.side && !!form.size && !!form.color
    return true
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  const handleSaveDraft = () => {
    navigate('/drafts')
  }

  if (submitted) {
    return (
      <div className="fade-in">
        <div className="success-screen">
          <div className="success-icon"><CheckCircle size={32} /></div>
          <h2>Order Submitted</h2>
          <p>Your order has been submitted successfully and is now being processed.</p>
          <div className="success-actions">
            <button className="btn btn-primary" onClick={() => navigate('/orders')}>View Orders</button>
            <button className="btn btn-ghost" onClick={() => { setSubmitted(false); setStep(1); setForm({ patientId: '', productId: '', side: '', size: '', color: '', notes: '' }) }}>New Order</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1>New Order</h1>
        <p>Create a new DAFO order in {stepLabels.length} steps</p>
      </div>

      {/* Progress Steps */}
      <div className="new-order-progress">
        {stepLabels.map((label, i) => (
          <div key={label} className="new-order-step-indicator">
            {i > 0 && <div className={`new-order-step-connector ${i < step ? 'completed' : ''}`} />}
            <div className={`new-order-step-dot ${i + 1 === step ? 'active' : ''} ${i + 1 < step ? 'completed' : ''}`}>
              {i + 1 < step ? '\u2713' : i + 1}
            </div>
            <span className={`new-order-step-label ${i + 1 === step ? 'active' : ''} ${i + 1 < step ? 'completed' : ''}`}>
              {label}
            </span>
          </div>
        ))}
      </div>

      <div className="new-order-content">
        <div className="card">
          {/* Step 1: Patient */}
          {step === 1 && (
            <div>
              <h3 style={{ marginBottom: 'var(--space-lg)' }}>Select Patient</h3>
              <div className="form-group">
                <label className="form-label">Patient</label>
                <select className="form-select" value={form.patientId} onChange={e => update('patientId', e.target.value)}>
                  <option value="">Choose a patient...</option>
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
                  ))}
                </select>
              </div>
              {selectedPatient && (
                <div style={{ padding: 'var(--space-base)', background: 'var(--color-bg)', borderRadius: 'var(--radius-md)', fontSize: 'var(--fs-sm)' }}>
                  <div style={{ fontWeight: 'var(--fw-medium)', color: 'var(--color-text-dark)', marginBottom: 4 }}>{selectedPatient.name}</div>
                  <div style={{ color: 'var(--color-text-muted)' }}>{selectedPatient.physician} &middot; {selectedPatient.facility}</div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Product */}
          {step === 2 && (
            <div>
              <h3 style={{ marginBottom: 'var(--space-lg)' }}>Select Product</h3>
              <div className="product-grid">
                {products.map(p => (
                  <div
                    key={p.id}
                    className={`product-option ${form.productId === p.id ? 'selected' : ''}`}
                    onClick={() => update('productId', p.id)}
                  >
                    <div className="product-option-name">{p.name}</div>
                    <div className="product-option-category">{p.category}</div>
                    <div className="product-option-desc">{p.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Customize */}
          {step === 3 && (
            <div>
              <h3 style={{ marginBottom: 'var(--space-lg)' }}>Customize Order</h3>
              <div className="form-group">
                <label className="form-label">Side</label>
                <select className="form-select" value={form.side} onChange={e => update('side', e.target.value)}>
                  <option value="">Select side...</option>
                  <option value="Left">Left</option>
                  <option value="Right">Right</option>
                  <option value="Bilateral">Bilateral</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Size</label>
                <select className="form-select" value={form.size} onChange={e => update('size', e.target.value)}>
                  <option value="">Select size...</option>
                  {selectedProduct?.sizes.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Color / Pattern</label>
                <select className="form-select" value={form.color} onChange={e => update('color', e.target.value)}>
                  <option value="">Select color...</option>
                  {colorOptions.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Additional Notes</label>
                <textarea className="form-textarea" placeholder="Any special instructions..." value={form.notes} onChange={e => update('notes', e.target.value)} />
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div>
              <h3 style={{ marginBottom: 'var(--space-lg)' }}>Review Order</h3>
              <div className="review-section">
                <h4>Patient</h4>
                <div className="review-row"><span>Name</span><span>{selectedPatient?.name}</span></div>
                <div className="review-row"><span>ID</span><span>{selectedPatient?.id}</span></div>
                <div className="review-row"><span>Physician</span><span>{selectedPatient?.physician}</span></div>
                <div className="review-row"><span>Facility</span><span>{selectedPatient?.facility}</span></div>
              </div>
              <div className="review-section">
                <h4>Product</h4>
                <div className="review-row"><span>Product</span><span>{selectedProduct?.name}</span></div>
                <div className="review-row"><span>Category</span><span>{selectedProduct?.category}</span></div>
              </div>
              <div className="review-section">
                <h4>Specifications</h4>
                <div className="review-row"><span>Side</span><span>{form.side}</span></div>
                <div className="review-row"><span>Size</span><span>{form.size}</span></div>
                <div className="review-row"><span>Color</span><span>{form.color}</span></div>
                {form.notes && <div className="review-row"><span>Notes</span><span>{form.notes}</span></div>}
              </div>
            </div>
          )}

          {/* Step 5: Submit */}
          {step === 5 && (
            <div style={{ textAlign: 'center', padding: 'var(--space-xl) 0' }}>
              <h3 style={{ marginBottom: 'var(--space-md)' }}>Ready to Submit</h3>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-xl)' }}>
                Please confirm all details are correct. Once submitted, the order will be processed by the Cascade Dafo team.
              </p>
              <button className="btn btn-primary btn-lg" onClick={handleSubmit}>
                <CheckCircle size={18} />
                Submit Order
              </button>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="new-order-footer">
          <div>
            {step > 1 && (
              <button className="btn btn-ghost" onClick={() => setStep(s => s - 1)}>
                <ArrowLeft size={16} />
                Back
              </button>
            )}
          </div>
          <div className="new-order-footer-right">
            {step >= 3 && step < 5 && (
              <button className="btn btn-ghost" onClick={handleSaveDraft}>
                <Save size={16} />
                Save Draft
              </button>
            )}
            {step >= 3 && (
              <button className="btn btn-ghost" style={{ color: 'var(--color-error)' }} onClick={() => setShowDiscard(true)}>
                Discard Draft
              </button>
            )}
            {step < 5 && (
              <button className="btn btn-primary" disabled={!canNext()} onClick={() => setStep(s => s + 1)} style={!canNext() ? { opacity: 0.5, cursor: 'not-allowed' } : {}}>
                Next
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Discard Draft Modal */}
      {showDiscard && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowDiscard(false) }}>
          <div className="modal">
            <div className="modal-header">
              <h3>Discard Draft</h3>
            </div>
            <div className="modal-body">
              Are you sure you want to discard this draft? All progress will be lost.
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setShowDiscard(false)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => { setShowDiscard(false); navigate('/orders') }}>
                Discard Draft
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
