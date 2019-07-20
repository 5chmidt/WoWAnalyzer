import React from 'react';

import { HawkCorrigan, niseko, mtblanton } from 'CONTRIBUTORS';
import SPELLS from 'common/SPELLS';
import SpellLink from 'common/SpellLink';
import { change, date } from 'common/changelog';

export default [
  {
    date: new Date('2018-11-18'),
    changes: 'Small updates to various Enhancement spells',
    contributors: [mtblanton],
  },
  {
    date: new Date('2018-11-04'),
    changes: <>Added support for <SpellLink id={SPELLS.PACK_SPIRIT_TRAIT.id} /> and <SpellLink id={SPELLS.SERENE_SPIRIT_TRAIT.id} /> azerite traits.</>,
    contributors: [niseko],
  },
  {
    date: new Date('2018-11-01'),
    changes: <>Added support for <SpellLink id={SPELLS.ASTRAL_SHIFT.id} /> damage reduction.</>,
    contributors: [niseko],
  },
  {
    date: new Date('2018-10-24'),
    changes: 'Added "Use your offensive cooldowns..." to the Enhancement checklist',
    contributors: [mtblanton], 
  },
  {
    date: new Date('2018-10-19'),
    changes: 'Added "Always be casting" to the Enhancement checklist',
    contributors: [mtblanton],
  },
  {
    date: new Date('2018-09-16'),
    changes: 'Updated Enhancement Shaman for BfA.',
    contributors: [HawkCorrigan],
  },
];
