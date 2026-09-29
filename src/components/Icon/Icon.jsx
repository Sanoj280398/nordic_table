// Simple outline-ikoner (stroke = currentColor), dekorative for skærmlæsere
const icons = {
  Facebook: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M16 7h-1.5A2.5 2.5 0 0 0 12 9.5V21M9.5 12.5H15" />
    </>
  ),
  Instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="16.8" cy="7.2" r="0.6" />
    </>
  ),
  address: <path fillRule="evenodd" d="M12 21s-6-5.6-6-11a6 6 0 0 1 12 0c0 5.4-6 11-6 11zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  email: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      {/* Konvolut-flappen får baggrundsfarven, når ikonet er fyldt */}
      <path d="m3 7 9 6 9-6" stroke="var(--icon-cutout, currentColor)" />
    </>
  ),
  guests: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6" />
    </>
  ),
  // Gaffel + kniv
  cutlery: (
    <path
      strokeWidth="2"
      strokeLinecap="round"
      d="M6 3v5a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V3M8 3v18M17 21V3c-2 1.5-3 4-3 7v3h3"
    />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
}

export default function Icon({ name, size = 18, filled = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  )
}
