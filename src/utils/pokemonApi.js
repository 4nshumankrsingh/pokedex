const BASE_URL = "https://pokeapi.co/api/v2";

class PokemonApi {
  async getPokemon(nameOrId) {
    const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon: ${nameOrId}`);
    }
    return response.json();
  }

  async getPokemonSpecies(nameOrId) {
    const response = await fetch(`${BASE_URL}/pokemon-species/${nameOrId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon species: ${nameOrId}`);
    }
    return response.json();
  }

  async getEvolutionChain(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch evolution chain: ${url}`);
    }
    return response.json();
  }

  async getRandomPokemon() {
    const randomId = Math.floor(Math.random() * 1010) + 1;
    return this.getPokemon(randomId);
  }

  async searchPokemonByType(type) {
    const response = await fetch(`${BASE_URL}/type/${type}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch type: ${type}`);
    }
    return response.json();
  }

  getNextPokemonId(currentId) {
    return currentId >= 1010 ? 1 : currentId + 1;
  }

  getPreviousPokemonId(currentId) {
    return currentId <= 1 ? 1010 : currentId - 1;
  }

  getTypeColor(type) {
    const typeColors = {
      normal: "hsl(165, 19%, 50%)",
      fire: "hsl(25, 85%, 55%)",
      water: "hsl(225, 73%, 57%)",
      electric: "hsl(48, 100%, 50%)",
      grass: "hsl(100, 50%, 43%)",
      ice: "hsl(180, 85%, 70%)",
      fighting: "hsl(5, 78%, 40%)",
      poison: "hsl(300, 43%, 50%)",
      ground: "hsl(45, 85%, 60%)",
      flying: "hsl(225, 73%, 73%)",
      psychic: "hsl(340, 73%, 65%)",
      bug: "hsl(65, 50%, 43%)",
      rock: "hsl(45, 85%, 40%)",
      ghost: "hsl(260, 33%, 43%)",
      dragon: "hsl(260, 73%, 50%)",
      dark: "hsl(24, 19%, 24%)",
      steel: "hsl(225, 8%, 58%)",
      fairy: "hsl(315, 73%, 73%)",
    };
    return typeColors[type] || "hsl(0, 0%, 50%)";
  }

  formatStatName(statName) {
    const statNames = {
      "hp": "HP",
      "attack": "ATK",
      "defense": "DEF",
      "special-attack": "SP.ATK",
      "special-defense": "SP.DEF",
      "speed": "SPEED",
    };
    return statNames[statName] || statName.toUpperCase();
  }

  formatPokemonName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, " ");
  }
}

export const pokemonApi = new PokemonApi();