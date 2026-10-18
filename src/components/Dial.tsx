// The Pathfinder logo. Drawn from the brand file's `dial` and `mark` components
// (Figma YvFbHaXgIBzzJlHoHpuzyw). The colour comes from currentColor, set to the
// --brand-mark token, so the logo follows tokens.json.

/** Below this size the ring crowds the star, so the logo drops to the star alone. */
export const DIAL_MIN_SIZE = 24

// The compass rose P on the dial's 200 grid: 112 tall, ray crossing at (100, 100).
const dialStar =
  'M111.03 81.9359C114.845 82.3962 118.42 84.1318 121.165 86.8969C124.396 90.1524 126.211 94.5682 126.211 99.1722C126.211 103.776 124.396 108.192 121.165 111.448C118.501 114.131 115.054 115.844 111.366 116.364L100 153.493L87.4624 112.537L89.1343 110.866L54.8657 100L89.1343 89.1342L87.4624 87.4623L99.9995 41.4926L111.03 81.9359ZM101.011 90.7728V107.573H107.846C110.192 107.573 112.442 106.688 114.101 105.113C115.76 103.537 116.691 101.4 116.691 99.1722C116.691 96.9446 115.76 94.808 114.101 93.2328C112.442 91.6575 110.192 90.7728 107.846 90.7728H101.011Z'

// The compass rose P alone, the mark's own drawing (brand/mark.svg).
const markStar =
  'M65.445 36.1104C68.8512 36.5213 72.0433 38.0711 74.4938 40.54C77.379 43.4468 78.9997 47.3892 78.9997 51.5C78.9997 55.6108 77.379 59.5532 74.4938 62.46C72.1151 64.8565 69.0376 66.386 65.7438 66.8496L55.5974 100L44.403 63.4326L45.8952 61.9404L15.2985 52.2393L45.8952 42.5371L44.403 41.0449L55.5974 0L65.445 36.1104ZM56.4997 44V59H62.6022C64.6968 59 66.7061 58.2102 68.1872 56.8037C69.6683 55.3972 70.4997 53.4891 70.4997 51.5C70.4997 49.5109 69.6683 47.6028 68.1872 46.1963C66.7061 44.7898 64.6968 44 62.6022 44H56.4997Z'

export interface DialProps {
  size?: number
  label?: string
}

export function Dial({ size = 40, label = 'Pathfinder' }: DialProps) {
  const full = size >= DIAL_MIN_SIZE
  return (
    <svg
      width={size}
      height={size}
      viewBox={full ? '0 0 200 200' : '-2.8 0 100 100'}
      fill="none"
      role="img"
      aria-label={label}
      style={{ color: 'var(--brand-mark)', flexShrink: 0 }}
    >
      {full ? (
        <>
          <circle cx={100} cy={100} r={95} stroke="currentColor" strokeWidth={10} />
          <path d={dialStar} fill="currentColor" />
        </>
      ) : (
        <path d={markStar} fill="currentColor" fillRule="evenodd" />
      )}
    </svg>
  )
}
