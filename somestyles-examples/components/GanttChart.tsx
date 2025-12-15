import React, { useMemo, useState } from 'react'
import { 
  MagnifyingGlass, 
  Rocket, 
  ArrowsOutSimple, 
  TestTube, 
  CheckCircle,
  Flag,
  Seal,
  ArrowsOut,
  X
} from '@phosphor-icons/react'

interface Task {
  id: string
  name: string
  startWeek: number
  duration: number
  phase: string
  type?: 'normal' | 'critical' | 'milestone' | 'signoff'
  detail?: string
}

interface Phase {
  name: string
  description: string
  color: string
  colorDark: string
  bgColor: string
  borderColor: string
  Icon: React.ComponentType<{ size?: number; weight?: 'duotone' | 'fill' | 'regular'; color?: string }>
}

// Brand colors from theme.css
const BRAND = {
  peach: '#fad2ad',
  peachDark: '#d4a273',
  cloud: '#a8bacf',
  cloudDark: '#7f94b0',
  sky: '#86aedd',
  skyDark: '#648ec4',
  slate: '#64748b',
  slateDark: '#475569',
}

const PHASES: Record<string, Phase> = {
  'Phase 0': {
    name: 'Discovery',
    description: 'Requirements, vendor contract, compliance, security setup',
    color: BRAND.cloud,
    colorDark: BRAND.cloudDark,
    bgColor: 'rgba(168, 186, 207, 0.12)',
    borderColor: 'rgba(168, 186, 207, 0.3)',
    Icon: MagnifyingGlass
  },
  'Phase 1': {
    name: 'MVP',
    description: 'BNY + DBS + iFast integrations, AI training, reporting',
    color: BRAND.sky,
    colorDark: BRAND.skyDark,
    bgColor: 'rgba(134, 174, 221, 0.12)',
    borderColor: 'rgba(134, 174, 221, 0.3)',
    Icon: Rocket
  },
  'Phase 2': {
    name: 'Expansion',
    description: 'CCB, Maybank, Broker Waves 1 & 2, PE/VC ingestion',
    color: BRAND.sky,
    colorDark: BRAND.skyDark,
    bgColor: 'rgba(134, 174, 221, 0.15)',
    borderColor: 'rgba(134, 174, 221, 0.3)',
    Icon: ArrowsOutSimple
  },
  'Phase 3': {
    name: 'Testing',
    description: 'UAT across all counterparties, 4-week parallel run',
    color: BRAND.peach,
    colorDark: BRAND.peachDark,
    bgColor: 'rgba(250, 210, 173, 0.15)',
    borderColor: 'rgba(250, 210, 173, 0.35)',
    Icon: TestTube
  },
  'Phase 4': {
    name: 'Go-Live',
    description: 'Audit sign-off, full cutover, hypercare support',
    color: BRAND.sky,
    colorDark: BRAND.skyDark,
    bgColor: 'rgba(134, 174, 221, 0.12)',
    borderColor: 'rgba(134, 174, 221, 0.25)',
    Icon: CheckCircle
  },
}

const TASKS: Task[] = [
  // Phase 0
  { id: 'p0a', name: 'Requirements & Contract', startWeek: 1, duration: 2, phase: 'Phase 0', detail: 'Document flows, vendor demo' },
  { id: 'p0b', name: 'Security & Compliance', startWeek: 3, duration: 1, phase: 'Phase 0', detail: 'SSO/MFA, RBAC, data residency' },
  { id: 'p0c', name: 'CCB MPLS Procurement', startWeek: 1, duration: 10, phase: 'Phase 0', type: 'critical', detail: '45-60 day lead time - START DAY 1' },
  
  // Phase 1
  { id: 'p1a', name: 'Data Mapping (BNY/DBS)', startWeek: 4, duration: 2, phase: 'Phase 1', detail: 'Map source fields to target schema' },
  { id: 'p1b', name: 'BNY Mellon Integration', startWeek: 4, duration: 5, phase: 'Phase 1', detail: 'mTLS certs + Nexo API' },
  { id: 'p1b-sign', name: 'BNY Sign-off', startWeek: 9, duration: 0.5, phase: 'Phase 1', type: 'signoff' },
  { id: 'p1c', name: 'DBS Bank Integration', startWeek: 5, duration: 4, phase: 'Phase 1', detail: 'PGP encryption + RAPID API' },
  { id: 'p1c-sign', name: 'DBS Sign-off', startWeek: 9, duration: 0.5, phase: 'Phase 1', type: 'signoff' },
  { id: 'p1d', name: 'iFast Integration', startWeek: 9, duration: 2, phase: 'Phase 1', detail: 'Modern Open API' },
  { id: 'p1d-sign', name: 'iFast Sign-off', startWeek: 11, duration: 0.5, phase: 'Phase 1', type: 'signoff' },
  { id: 'p1e', name: 'AI Training & Rules', startWeek: 10, duration: 2, phase: 'Phase 1', detail: 'Train the Trainer, confidence ≥98%' },
  { id: 'p1f', name: 'Reporting & Dashboards', startWeek: 11, duration: 2, phase: 'Phase 1', detail: 'Break aging, STP rate, MIC packs' },
  { id: 'p1g', name: 'MVP Testing', startWeek: 12, duration: 2, phase: 'Phase 1', type: 'critical', detail: 'Validate all MVP flows' },
  { id: 'mvp', name: 'MVP Go-Live', startWeek: 13, duration: 0.5, phase: 'Phase 1', type: 'milestone' },
  
  // Phase 2
  { id: 'p2a', name: 'CCB Technical Setup', startWeek: 12, duration: 4, phase: 'Phase 2', detail: 'MPLS ready W10, H2H config' },
  { id: 'p2a-sign', name: 'CCB Sign-off', startWeek: 16, duration: 0.5, phase: 'Phase 2', type: 'signoff' },
  { id: 'p2b', name: 'Maybank Integration', startWeek: 13, duration: 4, phase: 'Phase 2', detail: 'Similar H2H complexity' },
  { id: 'p2b-sign', name: 'Maybank Sign-off', startWeek: 17, duration: 0.5, phase: 'Phase 2', type: 'signoff' },
  { id: 'p2c', name: 'Broker Wave 1 (4)', startWeek: 17, duration: 4, phase: 'Phase 2', detail: 'Haitong, IB, CGS, BNY Pershing' },
  { id: 'p2c-sign', name: 'Wave 1 Sign-off', startWeek: 21, duration: 0.5, phase: 'Phase 2', type: 'signoff' },
  { id: 'p2d', name: 'Broker Wave 2 (4)', startWeek: 21, duration: 4, phase: 'Phase 2', detail: 'DBS Vickers, CCB Intl, Citic, Maybank KE' },
  { id: 'p2d-sign', name: 'Wave 2 Sign-off', startWeek: 25, duration: 0.5, phase: 'Phase 2', type: 'signoff' },
  { id: 'p2e', name: 'PE/VC PDF Ingestion', startWeek: 24, duration: 3, phase: 'Phase 2', detail: 'Capital call / distribution NLP' },
  
  // Phase 3
  { id: 'p3a', name: 'UAT & Parallel Run', startWeek: 26, duration: 4, phase: 'Phase 3', type: 'critical', detail: '4 weeks parallel, STP ≥92%' },
  { id: 'p3b', name: 'UAT Sign-off', startWeek: 30, duration: 0.5, phase: 'Phase 3', type: 'signoff' },
  
  // Phase 4
  { id: 'p4', name: 'Full Go-Live', startWeek: 30, duration: 0.5, phase: 'Phase 4', type: 'milestone' },
  { id: 'p4h', name: 'Hypercare', startWeek: 31, duration: 4, phase: 'Phase 4', detail: 'Vendor support, daily KPI reviews' },
]

const TOTAL_WEEKS = 36

interface GanttContentProps {
  isFullscreen: boolean
  groupedTasks: Record<string, Task[]>
  months: { name: string; startWeek: number; weeks: number }[]
  getBarStyle: (task: Task) => React.CSSProperties
  weekWidth: number
  rowHeight: number
  labelWidth: number
  headerHeight: number
  phaseHeaderHeight: number
}

function GanttContent({ 
  isFullscreen, 
  groupedTasks, 
  months, 
  getBarStyle,
  weekWidth,
  rowHeight,
  labelWidth,
  headerHeight,
  phaseHeaderHeight
}: GanttContentProps) {
  return (
    <div className="gantt-scroll-area">
      <div className="gantt-container" style={{ minWidth: `${labelWidth + weekWidth * TOTAL_WEEKS + 24}px` }}>
        {/* Fixed Labels Column */}
        <div className="gantt-labels" style={{ minWidth: labelWidth }}>
          <div className="gantt-header-spacer" style={{ height: headerHeight }} />
          
          {Object.entries(groupedTasks).map(([phaseName, tasks]) => {
            const phase = PHASES[phaseName]
            const PhaseIcon = phase.Icon
            return (
              <div key={phaseName} className="phase-group">
                <div 
                  className="phase-header"
                  style={{ 
                    background: phase.bgColor,
                    borderLeftColor: phase.colorDark,
                    color: phase.colorDark,
                    height: phaseHeaderHeight
                  }}
                  title={`${phaseName}: ${phase.name} — ${phase.description}`}
                >
                  <span className="phase-header-icon">
                    <PhaseIcon size={isFullscreen ? 16 : 13} weight="duotone" color={phase.colorDark} />
                  </span>
                  <div className="phase-header-content">
                    <span className="phase-header-title">{phaseName}: {phase.name}</span>
                    <span className="phase-header-desc">{phase.description}</span>
                  </div>
                </div>
                
                {tasks.map(task => (
                  <div key={task.id} className="task-row" style={{ height: rowHeight }}>
                    <div className="task-label" style={{ width: labelWidth }}>
                      <span className="task-label-icon">
                        {task.type === 'milestone' ? (
                          <Flag size={isFullscreen ? 12 : 10} weight="duotone" color={BRAND.skyDark} />
                        ) : task.type === 'signoff' ? (
                          <Seal size={isFullscreen ? 12 : 10} weight="duotone" color="#16a34a" />
                        ) : null}
                      </span>
                      <span className="task-label-text">{task.name}</span>
                      {isFullscreen && task.detail && (
                        <span className="task-detail"> - {task.detail}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
        
        {/* Chart Area */}
        <div className="gantt-chart">
          {/* Header with months and weeks */}
          <div className="gantt-header" style={{ height: headerHeight }}>
            {months.map((month, idx) => (
              <div 
                key={idx} 
                className="gantt-month"
                style={{ width: month.weeks * weekWidth }}
              >
                <span className="gantt-month-name">{month.name}</span>
                <div className="gantt-month-weeks">
                  {Array.from({ length: month.weeks }, (_, i) => (
                    <span key={i} className="gantt-week-num" style={{ width: weekWidth - 4 }}>
                      W{month.startWeek + i}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Chart Body */}
          <div className="gantt-body">
            {/* Grid lines */}
            <div className="gantt-grid">
              {Array.from({ length: TOTAL_WEEKS }, (_, i) => (
                <div key={i} className="gantt-grid-week" style={{ width: weekWidth }} />
              ))}
            </div>
            
            {/* Tasks */}
            {Object.entries(groupedTasks).map(([phaseName, tasks]) => {
              return (
                <div key={phaseName} className="phase-group">
                  <div style={{ height: phaseHeaderHeight + 2 }} />
                  
                  {tasks.map(task => {
                    const left = (task.startWeek - 1) * weekWidth
                    const width = Math.max(task.duration * weekWidth - 6, 18)
                    
                    return (
                      <div key={task.id} className="task-row" style={{ height: rowHeight }}>
                        <div className="task-bar-container">
                          <div 
                            className={`task-bar ${task.type || ''}`}
                            style={{
                              left: `${left}px`,
                              width: `${width}px`,
                              height: isFullscreen ? 24 : 20,
                              ...getBarStyle(task)
                            }}
                            title={`${task.name}${task.detail ? ` - ${task.detail}` : ''} (Week ${task.startWeek}${task.duration > 0.5 ? `-${Math.round(task.startWeek + task.duration - 1)}` : ''})`}
                          >
                            {task.type === 'milestone' && (
                              <>
                                <Flag size={isFullscreen ? 12 : 10} weight="fill" />
                                {task.name}
                              </>
                            )}
                            {task.type === 'signoff' && (
                              <Seal size={isFullscreen ? 12 : 10} weight="fill" />
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export function GanttChart() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  
  const groupedTasks = useMemo(() => {
    const groups: Record<string, Task[]> = {}
    TASKS.forEach(task => {
      if (!groups[task.phase]) groups[task.phase] = []
      groups[task.phase].push(task)
    })
    return groups
  }, [])

  const months = useMemo(() => {
    const startDate = new Date(2025, 0, 6) // Jan 6, 2025
    const result: { name: string; startWeek: number; weeks: number }[] = []
    let currentMonth = -1
    
    for (let week = 1; week <= TOTAL_WEEKS; week++) {
      const date = new Date(startDate)
      date.setDate(date.getDate() + (week - 1) * 7)
      const month = date.getMonth()
      
      if (month !== currentMonth) {
        result.push({
          name: date.toLocaleString('en-US', { month: 'short' }),
          startWeek: week,
          weeks: 1
        })
        currentMonth = month
      } else {
        result[result.length - 1].weeks++
      }
    }
    return result
  }, [])

  const getBarStyle = (task: Task): React.CSSProperties => {
    const phase = PHASES[task.phase]
    
    if (task.type === 'milestone') {
      return {
        background: `linear-gradient(135deg, ${BRAND.sky}, ${BRAND.skyDark})`,
        boxShadow: `0 3px 10px ${BRAND.sky}50`,
        borderRadius: '6px',
      }
    }
    
    if (task.type === 'signoff') {
      return {
        background: `linear-gradient(135deg, #22c55e, #16a34a)`,
        boxShadow: `0 2px 8px rgba(34, 197, 94, 0.35)`,
        borderRadius: '6px',
      }
    }
    
    if (task.type === 'critical') {
      return {
        background: `linear-gradient(135deg, ${BRAND.peach}, ${BRAND.peachDark})`,
        boxShadow: `0 3px 12px rgba(250, 210, 173, 0.5)`,
        border: `2px solid ${BRAND.peachDark}`,
      }
    }
    
    return {
      background: `linear-gradient(135deg, ${phase.color}, ${phase.colorDark})`,
      boxShadow: `0 2px 6px ${phase.color}30`,
    }
  }

  // Dimensions for normal view
  const normalDimensions = {
    weekWidth: 40,
    rowHeight: 32,
    labelWidth: 190,
    headerHeight: 48,
    phaseHeaderHeight: 44
  }
  
  // Dimensions for fullscreen view
  const fullscreenDimensions = {
    weekWidth: 48,
    rowHeight: 38,
    labelWidth: 260,
    headerHeight: 56,
    phaseHeaderHeight: 52
  }
  
  const dims = isFullscreen ? fullscreenDimensions : normalDimensions

  return (
    <>
      <style>{`
        .gantt-wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
          border-radius: 16px;
          background: linear-gradient(135deg, #fefefe, #f8fafc);
          border: 1px solid rgba(134, 174, 221, 0.2);
          box-shadow: 
            0 4px 24px rgba(134, 174, 221, 0.12),
            0 1px 3px rgba(0, 0, 0, 0.05);
          margin: 1.5rem 0;
        }
        
        .gantt-expand-btn {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.4rem 0.7rem;
          border-radius: 8px;
          border: 1px solid rgba(134, 174, 221, 0.3);
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(8px);
          color: ${BRAND.skyDark};
          font-size: 0.65rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .gantt-expand-btn:hover {
          background: rgba(134, 174, 221, 0.15);
          border-color: ${BRAND.sky};
          transform: translateY(-1px);
        }
        
        .gantt-scroll-area {
          overflow-x: auto;
          overflow-y: hidden;
          -webkit-overflow-scrolling: touch;
        }
        
        .gantt-scroll-area::-webkit-scrollbar {
          height: 10px;
        }
        
        .gantt-scroll-area::-webkit-scrollbar-track {
          background: rgba(134, 174, 221, 0.08);
          border-radius: 5px;
        }
        
        .gantt-scroll-area::-webkit-scrollbar-thumb {
          background: linear-gradient(90deg, ${BRAND.cloud}, ${BRAND.sky});
          border-radius: 5px;
        }
        
        .gantt-container {
          display: flex;
        }
        
        .gantt-labels {
          position: sticky;
          left: 0;
          z-index: 5;
          background: linear-gradient(90deg, #fefefe 92%, transparent);
          border-right: 1px solid rgba(134, 174, 221, 0.15);
          overflow: hidden;
        }
        
        .gantt-header-spacer {
          background: linear-gradient(135deg, rgba(134, 174, 221, 0.08), rgba(250, 210, 173, 0.05));
          border-bottom: 1px solid rgba(134, 174, 221, 0.12);
        }
        
        .gantt-chart {
          flex: 1;
          position: relative;
        }
        
        .gantt-header {
          display: flex;
          background: linear-gradient(135deg, rgba(134, 174, 221, 0.08), rgba(250, 210, 173, 0.05));
          border-bottom: 1px solid rgba(134, 174, 221, 0.15);
        }
        
        .gantt-month {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-right: 1px solid rgba(134, 174, 221, 0.1);
          padding: 0.3rem;
        }
        
        .gantt-month-name {
          font-size: 0.7rem;
          font-weight: 600;
          color: #334155;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .gantt-month-weeks {
          display: flex;
          gap: 1px;
          margin-top: 0.2rem;
        }
        
        .gantt-week-num {
          text-align: center;
          font-size: 0.55rem;
          color: #94a3b8;
          font-weight: 500;
        }
        
        .gantt-body {
          position: relative;
        }
        
        .gantt-grid {
          position: absolute;
          inset: 0;
          display: flex;
          pointer-events: none;
        }
        
        .gantt-grid-week {
          border-right: 1px solid rgba(134, 174, 221, 0.06);
        }
        
        .gantt-grid-week:nth-child(4n) {
          border-right-color: rgba(134, 174, 221, 0.12);
        }
        
        .phase-group {
          margin-bottom: 0.15rem;
        }
        
        .phase-header {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0 0.6rem;
          border-left: 3px solid;
          margin: 0.15rem 0;
          border-radius: 0 6px 6px 0;
          overflow: hidden;
        }
        
        
        .phase-header-icon {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        
        .phase-header-content {
          display: flex;
          flex-direction: column;
          min-width: 0;
          flex: 1;
          overflow: hidden;
        }
        
        .phase-header-title {
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          white-space: nowrap;
        }
        
        .phase-header-desc {
          font-size: 0.58rem;
          opacity: 0.8;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .task-row {
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        
        .task-label {
          padding: 0 0.5rem 0 0.9rem;
          font-size: 0.65rem;
          color: #475569;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          overflow: hidden;
        }
        
        .task-label-icon {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        
        .task-label-icon:empty {
          display: none;
        }
        
        .task-label-text {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 1;
          min-width: 0;
        }
        
        .task-detail {
          font-weight: 400;
          color: #94a3b8;
          font-size: 0.6rem;
        }
        
        .task-bar-container {
          flex: 1;
          position: relative;
          height: 100%;
          display: flex;
          align-items: center;
        }
        
        .task-bar {
          position: absolute;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 0.55rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          cursor: default;
          overflow: hidden;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }
        
        .task-bar:hover {
          transform: translateY(-1px) scale(1.02);
          z-index: 10;
        }
        
        .task-bar.milestone {
          width: auto !important;
          min-width: 80px;
          padding: 0 8px;
          font-weight: 700;
          gap: 0.25rem;
        }
        
        .task-bar.signoff {
          width: auto !important;
          min-width: 24px;
          padding: 0 6px;
          font-weight: 600;
          gap: 0.2rem;
        }
        
        .task-bar.critical {
          animation: criticalPulse 3s ease-in-out infinite;
        }
        
        @keyframes criticalPulse {
          0%, 100% { box-shadow: 0 3px 12px rgba(250, 210, 173, 0.5); }
          50% { box-shadow: 0 3px 18px rgba(250, 210, 173, 0.75); }
        }
        
        .legend {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          padding: 0.6rem 1rem;
          background: linear-gradient(135deg, rgba(134, 174, 221, 0.05), rgba(250, 210, 173, 0.03));
          border-top: 1px solid rgba(134, 174, 221, 0.1);
          font-size: 0.6rem;
        }
        
        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          color: #64748b;
        }
        
        .legend-dot {
          width: 10px;
          height: 10px;
          border-radius: 3px;
        }
        
        .legend-dot.critical {
          background: linear-gradient(135deg, ${BRAND.peach}, ${BRAND.peachDark});
        }
        
        .legend-dot.normal {
          background: linear-gradient(135deg, ${BRAND.sky}, ${BRAND.skyDark});
        }
        
        .legend-dot.signoff {
          background: linear-gradient(135deg, #22c55e, #16a34a);
        }
        
        .legend-dot.milestone {
          background: linear-gradient(135deg, ${BRAND.sky}, ${BRAND.skyDark});
          border-radius: 5px;
        }
        
        /* Fullscreen Modal */
        .gantt-fullscreen-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: fadeIn 0.2s ease;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .gantt-fullscreen-modal {
          width: 100%;
          max-width: 1600px;
          max-height: calc(100vh - 3rem);
          background: linear-gradient(135deg, #fefefe, #f8fafc);
          border-radius: 20px;
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.4);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          animation: slideUp 0.25s ease;
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .gantt-fullscreen-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          background: linear-gradient(135deg, rgba(134, 174, 221, 0.1), rgba(250, 210, 173, 0.06));
          border-bottom: 1px solid rgba(134, 174, 221, 0.15);
        }
        
        .gantt-fullscreen-title {
          font-size: 1rem;
          font-weight: 700;
          color: #334155;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .gantt-fullscreen-close {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: 1px solid rgba(134, 174, 221, 0.2);
          background: rgba(255, 255, 255, 0.8);
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .gantt-fullscreen-close:hover {
          background: rgba(239, 68, 68, 0.1);
          border-color: rgba(239, 68, 68, 0.3);
          color: #dc2626;
        }
        
        .gantt-fullscreen-body {
          flex: 1;
          overflow: auto;
        }
        
        .gantt-fullscreen-body .gantt-scroll-area {
          height: 100%;
          overflow: auto;
        }
        
        .gantt-fullscreen-body .phase-header-title {
          font-size: 0.75rem;
        }
        
        .gantt-fullscreen-body .phase-header-desc {
          font-size: 0.65rem;
        }
        
        .gantt-fullscreen-body .task-label {
          font-size: 0.72rem;
        }
        
        .gantt-fullscreen-body .gantt-month-name {
          font-size: 0.8rem;
        }
        
        .gantt-fullscreen-body .gantt-week-num {
          font-size: 0.6rem;
        }
        
        .gantt-fullscreen-body .task-bar {
          font-size: 0.6rem;
        }
        
        .gantt-fullscreen-body .task-bar.milestone {
          min-width: 100px;
        }
        
        /* Tablet - show truncated description */
        @media (max-width: 900px) {
          .phase-header-desc {
            font-size: 0.5rem;
            max-width: 120px;
          }
        }
        
        /* Mobile */
        @media (max-width: 640px) {
          .gantt-wrapper {
            margin: 1rem -0.75rem;
            border-radius: 10px;
          }
          
          .gantt-expand-btn {
            padding: 0.35rem 0.5rem;
            font-size: 0.6rem;
          }
          
          .gantt-expand-btn .expand-text {
            display: none;
          }
          
          .gantt-labels {
            min-width: 100px !important;
            max-width: 100px;
          }
          
          .task-label {
            width: 100px !important;
            font-size: 0.52rem;
            padding: 0 0.25rem 0 0.4rem;
          }
          
          .task-label-icon {
            display: none;
          }
          
          .phase-header {
            padding: 0 0.35rem;
            gap: 0.25rem;
          }
          
          .phase-header-icon {
            display: none;
          }
          
          .phase-header-title {
            font-size: 0.55rem;
          }
          
          .phase-header-desc {
            font-size: 0.42rem;
            max-width: 70px;
            opacity: 0.7;
          }
          
          .gantt-header-spacer {
            height: 36px !important;
          }
          
          .gantt-header {
            height: 36px !important;
          }
          
          .gantt-month {
            padding: 0.2rem;
          }
          
          .gantt-month-name {
            font-size: 0.58rem;
          }
          
          .gantt-month-weeks {
            display: none;
          }
          
          .task-row {
            height: 26px !important;
          }
          
          .task-bar {
            height: 16px !important;
            font-size: 0.48rem;
            border-radius: 3px;
          }
          
          .task-bar.milestone {
            min-width: 60px;
            padding: 0 4px;
            gap: 0.15rem;
          }
          
          .task-bar.signoff {
            min-width: 18px;
            padding: 0 3px;
          }
          
          .legend {
            padding: 0.4rem 0.6rem;
            gap: 0.5rem;
            font-size: 0.52rem;
          }
          
          .legend-dot {
            width: 8px;
            height: 8px;
          }
          
          .gantt-fullscreen-overlay {
            padding: 0;
          }
          
          .gantt-fullscreen-modal {
            border-radius: 0;
            max-height: 100vh;
            height: 100vh;
          }
          
          .gantt-fullscreen-header {
            padding: 0.75rem 1rem;
          }
          
          .gantt-fullscreen-title {
            font-size: 0.85rem;
          }
          
          .gantt-fullscreen-body .gantt-labels {
            min-width: 140px !important;
            max-width: 140px;
          }
          
          .gantt-fullscreen-body .task-label {
            width: 140px !important;
            font-size: 0.6rem;
          }
          
          .gantt-fullscreen-body .task-detail {
            display: none;
          }
          
          .gantt-fullscreen-body .phase-header-icon {
            display: flex;
          }
          
          .gantt-fullscreen-body .phase-header-title {
            font-size: 0.62rem;
          }
          
          .gantt-fullscreen-body .phase-header-desc {
            font-size: 0.5rem;
            max-width: 100px;
          }
          
          .gantt-fullscreen-body .task-row {
            height: 30px !important;
          }
          
          .gantt-fullscreen-body .task-bar {
            height: 18px !important;
          }
        }
        
        /* Very small mobile */
        @media (max-width: 400px) {
          .gantt-labels {
            min-width: 85px !important;
            max-width: 85px;
          }
          
          .task-label {
            width: 85px !important;
            font-size: 0.48rem;
          }
          
          .phase-header-title {
            font-size: 0.5rem;
          }
        }
      `}</style>
      
      {/* Normal View */}
      <div className="gantt-wrapper">
        <button 
          className="gantt-expand-btn"
          onClick={() => setIsFullscreen(true)}
          title="View fullscreen"
        >
          <ArrowsOut size={14} weight="bold" />
          <span className="expand-text">Expand</span>
        </button>
        
        <GanttContent 
          isFullscreen={false}
          groupedTasks={groupedTasks}
          months={months}
          getBarStyle={getBarStyle}
          {...dims}
        />
        
        {/* Legend */}
        <div className="legend">
          <div className="legend-item">
            <div className="legend-dot critical" />
            <span>Critical Path</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot normal" />
            <span>Integration Work</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot signoff" />
            <span>UAT Sign-off</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot milestone" />
            <span>Milestone</span>
          </div>
        </div>
      </div>
      
      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="gantt-fullscreen-overlay" onClick={() => setIsFullscreen(false)}>
          <div className="gantt-fullscreen-modal" onClick={e => e.stopPropagation()}>
            <div className="gantt-fullscreen-header">
              <div className="gantt-fullscreen-title">
                <Flag size={20} weight="duotone" color={BRAND.skyDark} />
                SmartStream Air - Implementation Timeline
              </div>
              <button 
                className="gantt-fullscreen-close"
                onClick={() => setIsFullscreen(false)}
                title="Close"
              >
                <X size={18} weight="bold" />
              </button>
            </div>
            <div className="gantt-fullscreen-body">
              <GanttContent 
                isFullscreen={true}
                groupedTasks={groupedTasks}
                months={months}
                getBarStyle={getBarStyle}
                {...fullscreenDimensions}
              />
              
              {/* Legend */}
              <div className="legend" style={{ fontSize: '0.7rem', padding: '0.75rem 1.25rem' }}>
                <div className="legend-item">
                  <div className="legend-dot critical" style={{ width: 12, height: 12 }} />
                  <span>Critical Path</span>
                </div>
                <div className="legend-item">
                  <div className="legend-dot normal" style={{ width: 12, height: 12 }} />
                  <span>Integration Work</span>
                </div>
                <div className="legend-item">
                  <div className="legend-dot signoff" style={{ width: 12, height: 12 }} />
                  <span>UAT Sign-off</span>
                </div>
                <div className="legend-item">
                  <div className="legend-dot milestone" style={{ width: 12, height: 12 }} />
                  <span>Milestone</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default GanttChart
