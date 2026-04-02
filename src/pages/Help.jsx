import { useState } from 'react'
import { Phone, Mail, MessageCircle, ChevronDown, FileText, BookOpen, Video, ExternalLink } from 'lucide-react'
import './Help.css'

const faqs = [
  { q: 'How do I place a new DAFO order?', a: 'Navigate to Orders > New Order, or click the "New Order" button in the sidebar. Follow the 5-step wizard to select a patient, choose a product, customize specifications, review, and submit.' },
  { q: 'Can I save an order as a draft?', a: 'Yes. From step 3 (Customize) onwards, you can click "Save Draft" to save your progress. Resume any time from the Drafts page.' },
  { q: 'How do I track my order status?', a: 'Go to the Tracking page to see all active and delivered orders with real-time status updates. You can also view tracking details on any individual order page.' },
  { q: 'What DAFO products are available?', a: 'We offer DAFO 3.5 (Solid Ankle), DAFO 4 (Hinged), DAFO FlexiSport (Dynamic), DAFO Tami2 (Floor Reaction), and DAFO JumpStart (Supramalleolar). Each is designed for specific clinical needs.' },
  { q: 'How long does manufacturing take?', a: 'Standard orders are manufactured within 10-14 business days. Rush orders can be accommodated - please note this in the order notes or contact our team.' },
  { q: 'How do I update patient information?', a: 'Go to the Patients page, select the patient, and update their details. Changes will apply to all future orders.' },
]

const resources = [
  { icon: FileText, title: 'Product Catalog', desc: 'Full DAFO product line specifications', href: '#' },
  { icon: BookOpen, title: 'Ordering Guide', desc: 'Step-by-step ordering instructions', href: '#' },
  { icon: Video, title: 'Video Tutorials', desc: 'Watch how-to videos for DAFONow', href: '#' },
  { icon: ExternalLink, title: 'Cascade Dafo Website', desc: 'Visit cascadedafo.com', href: '#' },
]

export default function Help() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1>Help & Support</h1>
        <p>Get help with DAFONow or contact the Cascade Dafo team</p>
      </div>

      <div className="help-contact-grid">
        <div className="help-contact-card">
          <div className="help-contact-icon" style={{ background: 'var(--color-primary-bg)', color: 'var(--color-primary)' }}>
            <Phone size={20} />
          </div>
          <div className="help-contact-title">Phone</div>
          <div className="help-contact-desc">Mon-Fri, 8am-5pm PST</div>
          <div className="help-contact-value">(800) 848-7332</div>
        </div>
        <div className="help-contact-card">
          <div className="help-contact-icon" style={{ background: '#E6F4F1', color: 'var(--color-success)' }}>
            <Mail size={20} />
          </div>
          <div className="help-contact-title">Email</div>
          <div className="help-contact-desc">Response within 24 hours</div>
          <div className="help-contact-value">support@cascadedafo.com</div>
        </div>
        <div className="help-contact-card">
          <div className="help-contact-icon" style={{ background: '#F0EDF5', color: 'var(--color-purple)' }}>
            <MessageCircle size={20} />
          </div>
          <div className="help-contact-title">Live Chat</div>
          <div className="help-contact-desc">Available during business hours</div>
          <div className="help-contact-value">Start a conversation</div>
        </div>
      </div>

      <div className="help-faq">
        <h3 style={{ marginBottom: 'var(--space-base)' }}>Frequently Asked Questions</h3>
        {faqs.map((faq, i) => (
          <div key={i} className="faq-item">
            <button
              className={`faq-question ${openFaq === i ? 'open' : ''}`}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              {faq.q}
              <ChevronDown size={16} />
            </button>
            {openFaq === i && (
              <div className="faq-answer">{faq.a}</div>
            )}
          </div>
        ))}
      </div>

      <h3 style={{ marginBottom: 'var(--space-base)' }}>Resources</h3>
      <div className="help-resources">
        {resources.map((r, i) => (
          <a key={i} href={r.href} className="help-resource-link">
            <r.icon size={18} />
            <div className="help-resource-text">
              {r.title}
              <span>{r.desc}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
