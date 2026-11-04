import assert from 'node:assert/strict'
import { renderToString } from 'react-dom/server'
import { createMemoryRouter, MemoryRouter, RouterProvider } from 'react-router'
import { routes } from '../src/routes'
import { LangContext } from '../src/i18n/LanguageContext'
import RegisterPage from '../src/pages/RegisterPage'
import GalleryPage from '../src/pages/GalleryPage'
import DetailsPage from '../src/pages/DetailsPage'
import ContactPage from '../src/pages/ContactPage'
import GamesPage from '../src/pages/GamesPage'

export function checkPages() {
  const destinations = {
    '/': 'MIDI', '/about': 'MIDI', '/gallery': 'Gallery', '/games': 'Coming soon',
    '/register': 'Choose Your Tournament', '/details': 'Event details', '/contact': 'Let&#x27;s talk',
  }
  for (const [path, heading] of Object.entries(destinations)) {
    const router = createMemoryRouter(routes, { initialEntries: [path] })
    const html = renderToString(<RouterProvider router={router} />)
    assert.ok(html.includes(heading), `${path} has the expected page content`)
    assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `${path} has exactly one primary heading`)
    assert.ok(!html.includes('undefined'), `${path} has no missing translated strings`)
    router.dispose()
  }

  for (const game of ['cs2', 'lol', 'valorant', 'val', 'tft']) {
    const html = renderToString(<MemoryRouter initialEntries={['/register?game='+game]}><RegisterPage /></MemoryRouter>)
    assert.ok(html.includes('register-modal-title'), `${game} deep link renders its dialog`)
    assert.ok(html.includes('Registration is not open yet'), 'Registration has an honest unavailable state')
    assert.ok(html.includes('disabled=""'), 'Submission is disabled without the backend')
    if (game === 'valorant' || game === 'val') assert.ok(html.includes('player5RiotId'), 'Valorant has all five player inputs')
  }

  for (const Page of [RegisterPage, GalleryPage, DetailsPage, ContactPage, GamesPage]) {
    const html = renderToString(<MemoryRouter><LangContext.Provider value="LT"><Page /></LangContext.Provider></MemoryRouter>)
    assert.ok(!html.includes('undefined'), 'Lithuanian page has all translations')
    assert.ok(html.includes('<h1'), 'Lithuanian page has a primary heading')
  }
  console.log('Passed: 7 routes, 5 registration deep links, and 5 Lithuanian page renders.')
}
