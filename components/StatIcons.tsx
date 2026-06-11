// Simple white-line icons drawn from scratch to sit inside the blue stat chips.

export function HeightIcon() {
  return (
    <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden="true">
      <g fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* person */}
        <circle cx="13" cy="8" r="3" fill="#fff" stroke="none" />
        <path d="M13 12 L13 22 M13 16 L9 21 M13 16 L17 21" />
        {/* height ruler */}
        <path d="M25 5 L25 27" />
        <path d="M22 6 L28 6 M22 26 L28 26" />
      </g>
    </svg>
  );
}

export function WeightIcon() {
  return (
    <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden="true">
      <g fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round">
        {/* kettlebell body */}
        <path d="M8 14 Q16 9 24 14 L26 27 L6 27 Z" fill="#fff" stroke="#fff" />
        {/* handle */}
        <path d="M11 14 Q16 7 21 14" fill="none" stroke="#fff" strokeWidth="2.5" />
      </g>
      <text x="16" y="25" textAnchor="middle" fontSize="8" fontWeight="700" fill="#2f6fc0">
        KG
      </text>
    </svg>
  );
}

export function PositionIcon() {
  return (
    <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden="true">
      <g fill="none" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round">
        <rect x="5" y="7" width="22" height="18" rx="1.5" />
        <line x1="16" y1="7" x2="16" y2="25" />
        <circle cx="16" cy="16" r="3.2" fill="#ffd23f" stroke="#ffd23f" />
        {/* goal areas */}
        <rect x="5" y="12" width="3" height="8" />
        <rect x="24" y="12" width="3" height="8" />
      </g>
    </svg>
  );
}
