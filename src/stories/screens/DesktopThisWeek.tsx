// Desktop "this week" (Figma `desktop / this week`, 518:534), composed from the
// library components on a fixed 1440 by 900 canvas. Storybook only this round.
import { snippet, snippetSize } from '../../app/assets'
import { oneThing } from '../../app/data'
import { AppBadge } from '../../components/AppBadge'
import type { Bearing } from '../../components/BearingTag'
import { Button } from '../../components/Button'
import { CalendarEvent } from '../../components/CalendarEvent'
import { GlassCard } from '../../components/GlassCard'
import { Mark } from '../../components/Mark'
import { SidebarNavItem } from '../../components/SidebarNavItem'
import './DesktopThisWeek.css'

type Ev = { time: string; title: string; bearing: Bearing; kind?: 'bill'; amount?: string }

const week: Array<{ day: string; date: number; today?: boolean; events: Ev[] }> = [
  { day: 'Mon', date: 18, events: [{ time: '9:00', title: 'Gym', bearing: 'health' }, { time: '14:00', title: 'Portfolio review', bearing: 'work' }] },
  { day: 'Tue', date: 19, events: [{ time: '10:00', title: 'Design crit', bearing: 'work' }, { time: '19:00', title: 'Dinner with Ana', bearing: 'people' }] },
  { day: 'Wed', date: 20, events: [{ time: 'due', title: 'Rent', bearing: 'home', kind: 'bill', amount: '$1,450' }, { time: '18:30', title: 'Pottery class', bearing: 'craft' }] },
  { day: 'Thu', date: 21, events: [{ time: '9:00', title: 'Gym', bearing: 'health' }, { time: '13:00', title: 'Film edit', bearing: 'craft' }] },
  {
    day: 'Fri',
    date: 22,
    today: true,
    events: [
      { time: '9:30', title: 'Dentist', bearing: 'health' },
      { time: '12:00', title: 'Lunch with Sam', bearing: 'people' },
      { time: 'due', title: 'Electric', bearing: 'home', kind: 'bill', amount: '$84' },
    ],
  },
  { day: 'Sat', date: 23, events: [{ time: '10:00', title: 'Farmers market', bearing: 'home' }] },
  { day: 'Sun', date: 24, events: [{ time: '17:00', title: 'Sunday plan', bearing: 'work' }] },
]

const bearings: Bearing[] = ['health', 'people', 'home', 'work', 'craft']

const destinations: Array<{ title: string; pct: number; bearing: Bearing }> = [
  { title: 'Run a half marathon', pct: 55, bearing: 'health' },
  { title: 'Launch the portfolio', pct: 80, bearing: 'work' },
  { title: 'Save the house fund', pct: 35, bearing: 'home' },
]

function LooseEnd({ title }: { title: string }) {
  return (
    <GlassCard>
      <p className="pf-desk__body">{title}</p>
      <div className="pf-desk__chips" role="group" aria-label={`Which way does ${title} go?`}>
        {(['N', 'E', 'S', 'W'] as const).map((d) => (
          <button key={d} type="button" className="pf-desk__chip" aria-label={{ N: 'Now', E: 'Later', S: 'Share', W: 'Drop' }[d]}>
            {d}
          </button>
        ))}
      </div>
    </GlassCard>
  )
}

export function DesktopThisWeek() {
  const hand = snippet('one-thing')
  const handSize = snippetSize('one-thing')
  return (
    <div className="pf-ambient pf-desk">
      <aside className="pf-glass pf-desk__sidebar">
        <div className="pf-desk__brand">
          <AppBadge />
          <span className="pf-desk__wordmark">Pathfinder</span>
        </div>
        <nav aria-label="Main" className="pf-desk__nav">
          <SidebarNavItem label="Today" href="#today" icon="sun" />
          <SidebarNavItem label="This week" href="#week" icon="calendar-range" active />
          <SidebarNavItem label="Inbox" href="#inbox" icon="inbox" count={3} />
          <SidebarNavItem label="Calendar" href="#calendar" icon="calendar" />
          <SidebarNavItem label="Projects" href="#projects" icon="folder-kanban" />
          <SidebarNavItem label="Library" href="#library" icon="library" />
          <SidebarNavItem label="Look back" href="#look-back" icon="history" />
        </nav>
        <div className="pf-desk__spacer" />
        <div className="pf-desk__bearings">
          <h2 className="pf-desk__label">Bearings</h2>
          <ul>
            {bearings.map((b) => (
              <li key={b}>
                <span className="pf-desk__dot" style={{ background: `var(--bearing-${b})` }} aria-hidden="true" />
                {b[0].toUpperCase() + b.slice(1)}
              </li>
            ))}
          </ul>
        </div>
        <Button variant="quiet">Morning ritual</Button>
      </aside>

      <main className="pf-desk__main">
        <header className="pf-desk__header">
          <div className="pf-desk__title">
            <p className="pf-desk__eyebrow">Week 42 · Oct 18 to 24</p>
            <h1 className="pf-desk__display">This week</h1>
          </div>
          <Button variant="quiet">Print next week</Button>
          <Button>Start Sunday plan</Button>
        </header>
        <div className="pf-desk__week">
          {week.map((d) => (
            <section key={d.day} className={`pf-glass pf-desk__day${d.today ? ' pf-desk__day--today' : ''}`} aria-label={`${d.day} ${d.date}${d.today ? ', today' : ''}`}>
              <h2 className="pf-desk__date">
                <span className="pf-desk__weekday">{d.day}</span>
                <span className="pf-desk__daynum">{d.date}</span>
              </h2>
              {d.events.map((e) => (
                <CalendarEvent key={e.title} {...e} />
              ))}
            </section>
          ))}
        </div>
        <div className="pf-desk__lower">
          <GlassCard>
            <h2 className="pf-desk__label">Carried forward</h2>
            <p className="pf-desk__row"><Mark type="moved" size={18} />Call the dentist (3rd week)</p>
            <p className="pf-desk__row"><Mark type="moved" size={18} />Update case study images</p>
          </GlassCard>
          <GlassCard>
            <h2 className="pf-desk__label">Due this week</h2>
            <p className="pf-desk__row"><span className="pf-desk__glyph" aria-hidden="true">$</span>Rent · $1,450 · paid</p>
            <p className="pf-desk__row"><span className="pf-desk__glyph" aria-hidden="true">$</span>Electric · $84 · Fri</p>
          </GlassCard>
          <GlassCard>
            <h2 className="pf-desk__label">Printables</h2>
            <p className="pf-desk__row"><span className="pf-desk__glyph" aria-hidden="true">▤</span>Next week, pre-filled</p>
            <p className="pf-desk__row"><span className="pf-desk__glyph" aria-hidden="true">▤</span>Trip page · March</p>
          </GlassCard>
        </div>
      </main>

      <aside className="pf-glass pf-desk__panel" aria-label="This week at a glance">
        <section className="pf-desk__group">
          <h2 className="pf-desk__label">The one thing this week</h2>
          <div className="pf-paper pf-desk__paper">
            {hand ? <img src={hand} alt={oneThing} width={handSize?.width} height={handSize?.height} /> : oneThing}
          </div>
          <p className="pf-desk__moves">Moves Destination 2: launch the portfolio</p>
        </section>
        <section className="pf-desk__group">
          <h2 className="pf-desk__label">Week so far</h2>
          <div className="pf-desk__tally">
            <span className="pf-desk__numeral">14</span>
            <div>
              <p className="pf-desk__strong">done since Monday</p>
              <p className="pf-desk__secondary">5 moved, 2 dropped on purpose</p>
            </div>
          </div>
        </section>
        <section className="pf-desk__group">
          <h2 className="pf-desk__label">Loose ends · sort when ready</h2>
          <LooseEnd title="Call the dentist" />
          <LooseEnd title="Book flights for March" />
        </section>
        <section className="pf-desk__group">
          <h2 className="pf-desk__label">Destinations · 2027</h2>
          {destinations.map((d) => (
            <div key={d.title} className="pf-desk__destination">
              <p className="pf-desk__line">
                <span>{d.title}</span>
                <span className="pf-desk__pct">{d.pct}%</span>
              </p>
              <span
                className="pf-desk__track"
                role="progressbar"
                aria-label={d.title}
                aria-valuenow={d.pct}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <span style={{ width: `${d.pct}%`, background: `var(--bearing-${d.bearing})` }} />
              </span>
            </div>
          ))}
        </section>
      </aside>
    </div>
  )
}
