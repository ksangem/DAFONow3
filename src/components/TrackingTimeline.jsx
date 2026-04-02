import { trackingSteps, getStatusStep } from '../data/mockData'
import './TrackingTimeline.css'

export default function TrackingTimeline({ status, mode = 'vertical' }) {
  const currentIdx = getStatusStep(status)

  if (mode === 'horizontal') {
    return (
      <div className="tracking-timeline-horizontal">
        {trackingSteps.map((step, i) => {
          let cls = ''
          if (i < currentIdx) cls = 'completed'
          else if (i === currentIdx) cls = 'current'
          return (
            <div key={step.key} className={`timeline-h-step ${cls}`}>
              <div className="timeline-h-dot" title={step.label} />
              {i < trackingSteps.length - 1 && <div className="timeline-h-line" />}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="tracking-timeline-vertical">
      {trackingSteps.map((step, i) => {
        let cls = ''
        if (i < currentIdx) cls = 'completed'
        else if (i === currentIdx) cls = 'current'
        return (
          <div key={step.key} className={`timeline-step ${cls}`}>
            <div className="timeline-step-indicator">
              <div className="timeline-step-dot" />
              <div className="timeline-step-line" />
            </div>
            <div className="timeline-step-content">
              <div className="timeline-step-label">{step.label}</div>
              <div className="timeline-step-desc">{step.description}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
