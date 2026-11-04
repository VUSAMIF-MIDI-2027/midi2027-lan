import type { RouteObject } from 'react-router'
import SiteLayout from './components/layout/SiteLayout'
import AboutPage from './pages/AboutPage'
import ComingSoonPage from './pages/ComingSoonPage'
import GalleryPage from './pages/GalleryPage'
import GamesPage from './pages/GamesPage'
import RegisterPage from './pages/RegisterPage'
import DetailsPage from './pages/DetailsPage'
import ContactPage from './pages/ContactPage'

export const routes: RouteObject[] = [
  {
    path: '/',
    Component: SiteLayout,
    children: [
      { index: true, Component: AboutPage },
      { path: 'about', Component: AboutPage },
      { path: 'gallery', Component: GalleryPage },
      { path: 'games', Component: GamesPage },
      { path: 'register', Component: RegisterPage },
      { path: 'details', Component: DetailsPage },
      { path: 'contact', Component: ContactPage },
      ...['privacy', 'cookies'].map(path => ({
        path, Component: ComingSoonPage,
      })),
      { path: '*', Component: ComingSoonPage },
    ],
  },
]
