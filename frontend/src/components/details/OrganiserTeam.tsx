import { useContext } from 'react'
import cat from '../../assets/images/organiser-cat.svg'
import { LangContext } from '../../i18n/LanguageContext'

const groups = [
  {
    title: ['Event leadership', 'Renginio vadovybė'],
    roles: [{ number: '01', title: ['LAN Party Manager', 'LAN vakarėlio vadovas'] }],
  },
  {
    title: ['Tournament operations', 'Turnyrų organizavimas'],
    roles: [
      { number: '02', title: ['Main tournament organiser', 'Pagrindinio turnyro organizatorius'] },
      { number: '03', title: ['Main tournament organiser', 'Pagrindinio turnyro organizatorius'] },
      { number: '04', title: ['Side tournaments organiser', 'Papildomų turnyrų organizatorius'] },
    ],
  },
  {
    title: ['Community & broadcast', 'Bendruomenė ir transliacijos'],
    roles: [
      { number: '05', title: ['Marketing', 'Rinkodara'] },
      { number: '06', title: ['Communication', 'Komunikacija'], team: ['Discord manager', 'Discord vadovas'], count: 1 },
      { number: '07', title: ['Stream', 'Transliacija'], team: ['Caster team', 'Komentatorių komanda'], count: 3 },
    ],
  },
]

export default function OrganiserTeam() {
  const language = useContext(LangContext) === 'LT' ? 1 : 0

  return (
    <section className="organiser-team" aria-labelledby="organiser-team-title">
      <header className="organiser-header">
        <p>{language ? 'Renginio užkulisiai' : 'Behind the event'}</p>
        <h2 id="organiser-team-title">{language ? 'Organizatorių komanda' : 'Organiser team'}</h2>
      </header>
      {groups.map(({ title, roles }, index) => (
        <section className="organiser-group" key={title[0]} aria-labelledby={`organiser-group-${index}`}>
          <h3 className="organiser-group-title" id={`organiser-group-${index}`}>
            <span aria-hidden="true">0{index + 1}</span>
            {title[language]}
          </h3>
          <div className={index === 0 ? 'organiser-cards organiser-cards--lead' : 'organiser-cards'}>
            {roles.map(({ number, title, team, count }) => (
              <article className="showcase-card organiser-card" key={number}>
                <span className="organiser-card-number" aria-hidden="true">{number}</span>
                <img className="organiser-avatar" src={cat} alt="" width="170" height="180" loading="lazy" />
                <h4>{title[language]}</h4>
                {team && (
                  <div className="organiser-card-team">
                    <div className="organiser-team-icons" aria-hidden="true">
                      {Array.from({ length: count ?? 0 }, (_, member) => (
                        <img key={member} src={cat} alt="" width="30" height="32" loading="lazy" />
                      ))}
                    </div>
                    <span>{team[language]}</span>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      ))}
    </section>
  )
}
