import { useContext } from 'react'
import venueMap from '../../assets/images/venue-map.svg'
import { LangContext } from '../../i18n/LanguageContext'

const schedule = [
  {
    day: '10',
    weekday: 'Saturday',
    weekdayLt: 'Šeštadienis',
    events: [
      ['10:00', 'League of Legends'],
      ['11:00', 'Counter-Strike 2'],
      ['14:45', 'FIFA'],
      ['17:20', 'NBA 2K'],
    ],
  },
  {
    day: '11',
    weekday: 'Sunday',
    weekdayLt: 'Sekmadienis',
    events: [
      ['10:00', 'Valorant'],
      ['11:00', 'Teamfight Tactics'],
      ['16:00', 'Tekken'],
    ],
  },
]

export default function VenueAndSchedule() {
  const isLithuanian = useContext(LangContext) === 'LT'

  return (
    <div className="details-feature-grid">
      <section className="details-feature-panel" aria-labelledby="venue-map-title">
        <header className="details-feature-header">
          <span>{isLithuanian ? '01 / VIETA' : '01 / VENUE'}</span>
          <h2 id="venue-map-title">{isLithuanian ? 'Kaip atvykti' : 'Find your way'}</h2>
          <p>{isLithuanian ? 'VU Matematikos ir informatikos fakultetas, Vilnius.' : 'VU Faculty of Mathematics and Informatics, Vilnius.'}</p>
        </header>
        <div className="details-map-body">
          <img
            className="details-venue-map"
            src={venueMap}
            alt={isLithuanian ? 'Du įėjimai į B korpusą tarp Švitrigailos ir Algirdo gatvių.' : 'Two entrances to Building B between Švitrigailos and Algirdo streets.'}
            width="1080"
            height="1350"
          />
        </div>
      </section>
      <section className="details-feature-panel" aria-labelledby="schedule-title">
        <header className="details-feature-header">
          <span>{isLithuanian ? '02 / TVARKARAŠTIS' : '02 / SCHEDULE'}</span>
          <h2 id="schedule-title">{isLithuanian ? 'Turnyrų tvarkaraštis' : 'Tournament schedule'}</h2>
          <p>{isLithuanian ? 'Turnyrų pradžios laikai abiem renginio dienomis.' : 'Tournament start times across both event days.'}</p>
        </header>
        <div className="details-schedule-grid">
          {schedule.map(({ day, weekday, weekdayLt, events }) => (
            <article className="details-schedule-day" key={day}>
              <h3>
                <strong>{day}</strong>
                <span>
                  {isLithuanian ? weekdayLt : weekday}
                  <small>{isLithuanian ? 'Balandis 2026' : 'April 2026'}</small>
                </span>
              </h3>
              <ul>
                {events.map(([time, name]) => (
                  <li key={name}>
                    <time dateTime={time}>{time}</time>
                    <span>{name}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
