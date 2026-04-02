import { Link } from 'react-router-dom'
import { FileEdit } from 'lucide-react'
import './AwarenessStrip.css'

export default function AwarenessStrip({ draftCount }) {
  if (draftCount === 0) return null

  return (
    <div className="awareness-strip">
      <FileEdit size={14} />
      <span>
        You have {draftCount} unsaved draft{draftCount !== 1 ? 's' : ''}.{' '}
        <Link to="/drafts">Resume drafts</Link>
      </span>
    </div>
  )
}
