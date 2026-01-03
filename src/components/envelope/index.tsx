import React from 'react'

interface EnvelopeProps {
  className?: string
  openStage: number // 0: closed, 1: seal removed, 2: flap opening, 3: card showing
}

export const Envelope: React.FC<EnvelopeProps> = ({ className, openStage }) => {
  return (
    <svg 
      viewBox="0 0 160 100" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
    >
      {/* Shadow layer */}
      <rect x="0" y="0" width="160" height="100" rx="2" fill="black" fillOpacity="0.1" />
      
      {/* Base / Background */}
      <rect x="0" y="0" width="160" height="100" rx="2" fill="#9fc5e8" />
      
      {/* Side Flaps */}
      <path d="M0 0 L80 50 L0 100 Z" fill="#a8c9e4" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
      <path d="M160 0 L80 50 L160 100 Z" fill="#a8c9e4" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
      
      {/* Bottom Flap (65% height from bottom) */}
      <path d="M0 100 L160 100 L80 40 Z" fill="#9fc5e8" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" />
      
      {/* Invitation Card Placeholder (will be animated in page.tsx but we need slot here or overlay) */}
      
      {/* Top Flap (65% height from top) */}
      <g 
        style={{ 
          transformOrigin: 'top center',
          transition: 'transform 0.8s ease-in-out',
          transform: openStage >= 2 ? 'rotateX(180deg)' : 'rotateX(0deg)',
        }}
      >
        <path 
          d="M0 0 L160 0 L80 65 Z" 
          fill="#a8c9e4" 
          stroke="rgba(255,255,255,0.8)" 
          strokeWidth="1" 
          filter="url(#flapShadow)" 
        />
      </g>
      
      <defs>
        <filter id="flapShadow" x="-10%" y="-10%" width="120%" height="150%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15" />
        </filter>
      </defs>
    </svg>
  )
}
