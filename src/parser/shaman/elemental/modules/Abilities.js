import SPELLS from 'common/SPELLS';

import CoreAbilities from 'parser/core/modules/Abilities';

class Abilities extends CoreAbilities {
  spellbook() {
    const combatant = this.selectedCombatant;
    return [
      {
        spell: SPELLS.LAVA_BURST,
        charges: 2,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL,
        // haste => 8 / (1 + haste)
        // TODO: Add Cooldown with stacks and Lava Surge procs
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.LIGHTNING_BOLT,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.LIQUID_MAGMA_TOTEM_TALENT,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL_AOE,
        gcd: {
          base: 1500,
        },
        cooldown: 60,
        enabled: combatant.hasTalent(SPELLS.LIQUID_MAGMA_TOTEM_TALENT.id),
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.9,
        },
      },
      {
        spell: SPELLS.CHAIN_LIGHTNING,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL_AOE, // 2 / (1 + haste)
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.LAVA_BEAM,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL_AOE,
      },
      {
        spell: SPELLS.EARTHQUAKE,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL_AOE,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.ELEMENTAL_BLAST_TALENT,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL,
        enabled: combatant.hasTalent(SPELLS.ELEMENTAL_BLAST_TALENT.id),
        cooldown: 12,
        gcd: {
          base: 1500,
        },
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.6,
        },
      },
      {
        spell: SPELLS.ASCENDANCE_TALENT_ELEMENTAL,
        category: Abilities.SPELL_CATEGORIES.COOLDOWNS,
        cooldown: 180,
        gcd: {
          base: 1500,
        },
        enabled: combatant.hasTalent(SPELLS.ASCENDANCE_TALENT_ELEMENTAL.id),
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.9,
        },
      },
      {
        spell: SPELLS.FIRE_ELEMENTAL,
        category: Abilities.SPELL_CATEGORIES.COOLDOWNS,
        cooldown: 60 * 2.5,
        gcd: {
          base: 1500,
        },
        enabled: !combatant.hasTalent(SPELLS.STORM_ELEMENTAL_TALENT.id),
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 1.0,
        },
      },
      {
        spell: SPELLS.STORMKEEPER_TALENT,
        category: Abilities.SPELL_CATEGORIES.COOLDOWNS,
        cooldown: 60,
        gcd: {
          base: 1500,
        },
        enabled: combatant.hasTalent(SPELLS.STORMKEEPER_TALENT.id),
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.9,
        },
      },
      {
        spell: SPELLS.STORM_ELEMENTAL_TALENT,
        category: Abilities.SPELL_CATEGORIES.COOLDOWNS,
        cooldown: 60 * 2.5, // TODO: Add Elementalist -> Lava Burst cast ^= -2 sec cd
        enabled: combatant.hasTalent(SPELLS.STORM_ELEMENTAL_TALENT.id),
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.9,
        },
      },

      {
        spell: SPELLS.FLAME_SHOCK,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.FROST_SHOCK,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.ICEFURY_TALENT,
        category: Abilities.SPELL_CATEGORIES.COOLDOWNS,
        cooldown: 30,
        gcd: {
          base: 1500,
        },
        enabled: combatant.hasTalent(SPELLS.ICEFURY_TALENT.id),
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.8,
        },
      },
      {
        spell: SPELLS.EARTH_SHOCK,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.CAPACITOR_TOTEM,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        gcd: {
          base: 1500,
        },
        cooldown: 60, //misses Static Charge CDR
      },
      {
        spell: SPELLS.ASTRAL_SHIFT,
        buffSpellId: SPELLS.ASTRAL_SHIFT.id,
        cooldown: 90,
        category: Abilities.SPELL_CATEGORIES.DEFENSIVE,
      },
      {
        spell: SPELLS.THUNDERSTORM,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        gcd: {
          base: 1000,
        },
        cooldown: 45,
      },
      {
        spell: SPELLS.TREMOR_TOTEM,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        gcd: {
          base: 1500,
        },
      },
      {
        spell: SPELLS.WIND_SHEAR,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
      },
      {
        spell: SPELLS.TOTEM_MASTERY_TALENT_ELEMENTAL,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL,
        enabled: combatant.hasTalent(SPELLS.TOTEM_MASTERY_TALENT_ELEMENTAL),
        gcd: {
          base: 1000,
        },
      },
      {
        spell: SPELLS.BLOODLUST,
        category: Abilities.SPELL_CATEGORIES.COOLDOWNS,
      },
      {
        spell: SPELLS.HEROISM,
        category: Abilities.SPELL_CATEGORIES.COOLDOWNS,
      },
      {
        spell: SPELLS.REINCARNATION,
        category: Abilities.SPELL_CATEGORIES.OTHERS,
      },
    ];
  }
}

export default Abilities;
