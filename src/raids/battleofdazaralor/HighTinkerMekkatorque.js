// import Background from './images/backgrounds/FridaIronbellows.jpg';
import Headshot from './images/headshots/HighTinkerMekkatorque.jpg';
import { BOD_ALLIANCE_TO_HORDE } from './RaceTranslation';

export default {
  id: 2276,
  name: 'High Tinker Mekkatorque',
  // TODO: background: Background,
  headshot: Headshot,
  icon: 'achievement_boss_zuldazar_mekkatorque',
  fight: {
    // TODO: Add vantusRuneBuffId: 250144,
    softMitigationChecks: {
      physical: [],
      magical: [],
    },
    raceTranslation: BOD_ALLIANCE_TO_HORDE,
  },
};
