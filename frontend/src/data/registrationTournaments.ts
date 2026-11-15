import gameCs2 from '../assets/images/game-cs2.png'
import gameLol from '../assets/images/game-val.png'
import gameTft from '../assets/images/game-fifa.png'
import gameValorant from '../assets/images/game-lol.png'
import gameFifa from '../assets/images/game-nba.png'
import gameNba from '../assets/images/game-tft.png'
import type { RegistrationTournament } from '../types/registration'
import type { Translation } from '../i18n/translations'

type TournamentCard = RegistrationTournament & { descriptionKey: keyof Translation }

export const registrationTournaments: Record<'main' | 'side', TournamentCard[]> = {
  main: [
    {
      id: 'cs2',
      name: 'Counter-Strike 2',
      shortName: 'CS2',
      descriptionKey: 'registerCs2Desc',
      image: gameCs2,
      imageClass: 'register-card-image--cover',
      background: 'linear-gradient(145deg, #211304, #0e1015 72%)',
    },
    {
      id: 'lol',
      name: 'League of Legends',
      shortName: 'LoL',
      descriptionKey: 'registerLolDesc',
      image: gameLol,
      imageClass: 'register-card-image--contain register-card-image--lol',
      background: 'radial-gradient(circle at 50% 30%, #123644, #070b12 70%)',
    },
    {
      id: 'valorant',
      name: 'VALORANT',
      shortName: 'VAL',
      descriptionKey: 'registerValorantDesc',
      image: gameValorant,
      imageClass: 'register-card-image--cover',
      background: 'linear-gradient(145deg, #211015, #0d131c 74%)',
    },
    {
      id: 'tft',
      name: 'Teamfight Tactics',
      shortName: 'TFT',
      descriptionKey: 'registerTftDesc',
      image: gameTft,
      imageClass: 'register-card-image--contain register-card-image--tft',
      background: 'radial-gradient(circle at 50% 34%, #3a260c, #0a0b10 68%)',
    },
  ],
  side: [
    {
      id: 'tekken',
      name: 'Tekken',
      shortName: 'TKN',
      descriptionKey: 'registerTekkenDesc',
      background: 'linear-gradient(145deg, #291004, #0d0b0d 72%)',
    },
    {
      id: 'fifa',
      name: 'FIFA',
      shortName: 'FIFA',
      descriptionKey: 'registerFifaDesc',
      image: gameFifa,
      imageClass: 'register-card-image--contain register-card-image--side',
      background: 'radial-gradient(circle at 50% 35%, #082d20, #080c10 70%)',
    },
    {
      id: 'hoi4',
      name: 'Hearts of Iron IV',
      shortName: 'HOI IV',
      descriptionKey: 'registerHoi4Desc',
      background: 'linear-gradient(145deg, #18241d, #090d0c 72%)',
    },
    {
      id: 'nba2k',
      name: 'NBA 2K',
      shortName: 'NBA',
      descriptionKey: 'registerNbaDesc',
      image: gameNba,
      imageClass: 'register-card-image--contain register-card-image--side',
      background: 'radial-gradient(circle at 50% 35%, #2b1013, #0d0a0c 70%)',
    },
  ],
}
