import gameCs2 from '../assets/images/game-cs2.png'
import gameLol from '../assets/images/game-val.png'
import gameTft from '../assets/images/game-fifa.png'
import gameValorant from '../assets/images/game-lol.png'
import type { RegistrationTournament } from '../types/registration'
import type { Translation } from '../i18n/translations'

export function getRegistrationTournaments(tr: Translation): RegistrationTournament[] {
  return [
    {
      id: 'cs2',
      name: 'Counter-Strike 2',
      shortName: 'CS2',
      description: tr.registerCs2Desc,
      image: gameCs2,
      imageClass: 'register-card-image--cover',
      background: 'linear-gradient(145deg, #211304, #0e1015 72%)',
    },
    {
      id: 'lol',
      name: 'League of Legends',
      shortName: 'LoL',
      description: tr.registerLolDesc,
      image: gameLol,
      imageClass: 'register-card-image--contain register-card-image--lol',
      background: 'radial-gradient(circle at 50% 30%, #123644, #070b12 70%)',
    },
    {
      id: 'valorant',
      name: 'VALORANT',
      shortName: 'VAL',
      description: tr.registerValorantDesc,
      image: gameValorant,
      imageClass: 'register-card-image--cover',
      background: 'linear-gradient(145deg, #211015, #0d131c 74%)',
    },
    {
      id: 'tft',
      name: 'Teamfight Tactics',
      shortName: 'TFT',
      description: tr.registerTftDesc,
      image: gameTft,
      imageClass: 'register-card-image--contain register-card-image--tft',
      background: 'radial-gradient(circle at 50% 34%, #3a260c, #0a0b10 68%)',
    },
  ]

}
