import React from 'react';

import { joshinator, Yajinni } from 'CONTRIBUTORS';
import SPELLS from 'common/SPELLS';
import SpellLink from 'common/SpellLink';
import { change, date } from 'common/changelog';

export default [
  {
    date: new Date('2019-02-14'),
    changes: <>Updated <SpellLink id={SPELLS.BONE_SHIELD.id} />-suggestion to account for different types of bad <SpellLink id={SPELLS.MARROWREND.id} />s</>,
    contributors: [joshinator],
  },
  {
    date: new Date('2019-02-03'),
    changes: <>Added <SpellLink id={SPELLS.BLOODY_RUNEBLADE.id} /> azerite trait and marked patch 8.1 compatible.</>,
    contributors: [Yajinni],
  },
  {
    date: new Date('2018-11-30'),
    changes: <>Readd the checklist, make <SpellLink id={SPELLS.OSSUARY_TALENT.id} />-suggestion based on <SpellLink id={SPELLS.DEATH_STRIKE.id} /> casts without <SpellLink id={SPELLS.OSSUARY_TALENT.id} />.</>,
    contributors: [joshinator],
  },
  {
    date: new Date('2018-11-06'),
    changes: <>Updated the <SpellLink id={SPELLS.DEATHS_CARESS.id} />-usage module to check more accurately if a cast was bad or not (by checking available ranged spells and the distance between the player and the enemy).</>,
    contributors: [joshinator],
  },
  {
    date: new Date('2018-09-28'),
    changes: <>Updated the <SpellLink id={SPELLS.MARROWREND.id} />-usage module to account for <SpellLink id={SPELLS.BONES_OF_THE_DAMNED.id} /> and updated <SpellLink id={SPELLS.HEARTBREAKER_TALENT.id} />-Module.</>,
    contributors: [joshinator],
  },
  {
    date: new Date('2018-08-03'),
    changes: <>Added <SpellLink id={SPELLS.BONE_SPIKE_GRAVEYARD.id} />-Module.</>,
    contributors: [joshinator],
  },
  {
    date: new Date('2018-08-01'),
    changes: <>Added <SpellLink id={SPELLS.BONES_OF_THE_DAMNED.id} />-Module.</>,
    contributors: [joshinator],
  },
  {
    date: new Date('2018-07-19'),
    changes: <>Updated <SpellLink id={SPELLS.FOUL_BULWARK_TALENT.id} /> to its new reduced value.</>,
    contributors: [Yajinni],
  },
  {
    date: new Date('2018-07-18'),
    changes: <>Removed old legion traits/talents/abilities.</>,
    contributors: [Yajinni],
  },
];
