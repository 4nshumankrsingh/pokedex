// Pokemon type definitions
// These are just for reference, not used as TypeScript in JavaScript project

export const PokemonType = {
  slot: Number,
  type: {
    name: String,
    url: String,
  },
};

export const PokemonAbility = {
  ability: {
    name: String,
    url: String,
  },
  is_hidden: Boolean,
  slot: Number,
};

export const PokemonStat = {
  base_stat: Number,
  effort: Number,
  stat: {
    name: String,
    url: String,
  },
};

export const PokemonSprites = {
  front_default: String,
  front_shiny: String,
  back_default: String,
  back_shiny: String,
  other: {
    'official-artwork': {
      front_default: String,
    },
    dream_world: {
      front_default: String,
    },
    home: {
      front_default: String,
      front_shiny: String,
    },
    showdown: {
      front_default: String,
      front_shiny: String,
      back_default: String,
      back_shiny: String,
    },
  },
};

export const PokemonSpecies = {
  flavor_text_entries: [{
    flavor_text: String,
    language: {
      name: String,
    },
    version: {
      name: String,
    },
  }],
  evolution_chain: {
    url: String,
  },
};

export const EvolutionChain = {
  chain: {
    evolution_details: [{
      min_level: Number,
      min_happiness: Number,
      min_beauty: Number,
      min_affection: Number,
      needs_overworld_rain: Boolean,
      party_species: Object,
      party_type: Object,
      relative_physical_stats: Number,
      time_of_day: String,
      trade_species: Object,
      trigger: {
        name: String,
        url: String,
      },
      turn_upside_down: Boolean,
    }],
    evolves_to: [Object],
    is_baby: Boolean,
    species: {
      name: String,
      url: String,
    },
  },
};

export const PokemonMove = {
  move: {
    name: String,
    url: String,
  },
  version_group_details: [{
    level_learned_at: Number,
    move_learn_method: {
      name: String,
      url: String,
    },
    version_group: {
      name: String,
      url: String,
    },
  }],
};