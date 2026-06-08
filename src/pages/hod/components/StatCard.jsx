import React from 'react';

export default function StatCard({ label, value, icon, color, bg, onClick, subtext }) {
  return (
    <div 
      className="stat-card" 
      onClick={onClick} 
      style={{ 
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.2s, box-shadow 0.2s'
      }}
      onMouseEnter={(e) => { if (onClick) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.05)'; } }}
      onMouseLeave={(e) => { if (onClick) { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; } }}
    >
      <div className="s-header">
        <div className="s-icon" style={{ background: bg, color: color }}>
          {icon}
        </div>
        <span className="s-label">{label}</span>
      </div>
      <div className="s-value">{value}</div>
      <a 
        href="#" 
        className="s-link" 
        style={{ color: color }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (onClick) onClick();
        }}
      >
        View Detailed Report →
      </a>
    </div>
  );
}
