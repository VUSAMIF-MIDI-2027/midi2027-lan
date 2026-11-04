import type { ReactNode } from 'react'
import gameLol from '../assets/images/game-val.png'
import gameCs2 from '../assets/images/game-cs2.png'
import gameVal from '../assets/images/game-lol.png'
import gameTft from '../assets/images/game-fifa.png'
import gameNba from '../assets/images/game-tft.png'
import gameFifa from '../assets/images/game-nba.png'

export const tournamentFixtures: {
    game: string; class: string; date: string; accent: string; bg: string; abbr: string;
    logo?: string; logoCover?: boolean; logoBlend?: 'screen' | 'multiply'; imagePosition?: string;
    art?: ReactNode;
  }[] = [
    {
      game: 'League of Legends',
      class: 'Main',
      date: 'Apr 10, 2026',
      accent: '#0075b5',
      bg: 'linear-gradient(160deg, #0a0800 0%, #1c1400 60%, #2a1e00 100%)',
      abbr: 'LoL',
      logo: gameLol,
      logoCover: true,
      imagePosition: 'center',
    },
    {
      game: 'Counter-Strike 2',
      class: 'Main',
      date: 'Apr 10, 2026',
      accent: '#0075b5',
      bg: '#000',
      abbr: 'CS2',
      logo: gameCs2,
      logoCover: true,
    },
    {
      game: 'Valorant',
      class: 'Main',
      date: 'Apr 11, 2026',
      accent: '#0075b5',
      bg: '#000',
      abbr: 'VAL',
      logo: gameVal,
      logoCover: true,
      imagePosition: 'center',
    },
    {
      game: 'Teamfight Tactics',
      class: 'Main',
      date: 'Apr 11, 2026',
      accent: '#0075b5',
      bg: 'linear-gradient(160deg, #120e00 0%, #1e1800 100%)',
      abbr: 'TFT',
      logo: gameTft,
      logoBlend: 'multiply',
    },
    {
      game: 'NBA 2K',
      class: 'Side',
      date: 'Apr 10, 2026',
      accent: '#0075b5',
      bg: 'linear-gradient(160deg, #0a0000 0%, #180000 100%)',
      abbr: 'NBA',
      logo: gameNba,
      logoBlend: 'multiply',
    },
    {
      game: 'FIFA',
      class: 'Side',
      date: 'Apr 10, 2026',
      accent: '#0075b5',
      bg: 'linear-gradient(160deg, #001208 0%, #001e10 100%)',
      abbr: 'FIFA',
      logo: gameFifa,
      logoBlend: 'multiply',
    },
    {
      game: 'Tekken',
      class: 'Side',
      date: 'Apr 11, 2026',
      accent: '#0075b5',
      bg: 'linear-gradient(135deg, #1a0800 0%, #280f00 100%)',
      abbr: 'TKN',
      art: (
        <svg viewBox="0 0 280 220" fill="none" width="100%" style={{ position: 'absolute', inset: 0 }}>
          <path d="M80 190 L140 40 L200 190" stroke="#f97316" strokeWidth="1.5" opacity="0.3" fill="none"/>
          <path d="M140 40 L140 190" stroke="#f97316" strokeWidth="1" opacity="0.2"/>
          <path d="M95 145 L185 145" stroke="#f97316" strokeWidth="0.8" opacity="0.2"/>
          <path d="M108 100 L172 100" stroke="#f97316" strokeWidth="0.6" opacity="0.18"/>
          <circle cx="140" cy="75" r="18" fill="rgba(249,115,22,0.1)" stroke="#f97316" strokeWidth="1.5" opacity="0.4"/>
          <circle cx="140" cy="75" r="6" fill="#f97316" opacity="0.35"/>
        </svg>
      ),
    },
  ]

