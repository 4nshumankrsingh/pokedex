"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, Filter, X } from "lucide-react";

export const PokemonSearch = ({ onPokemonSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showTypeFilter, setShowTypeFilter] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const pokemonTypes = [
    'normal', 'fire', 'water', 'electric', 'grass', 'ice',
    'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
    'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
  ];

  const popularPokemon = [
    { name: "pikachu", id: 25 },
    { name: "charizard", id: 6 },
    { name: "mewtwo", id: 150 },
    { name: "lucario", id: 448 },
    { name: "gardevoir", id: 282 },
    { name: "rayquaza", id: 384 }
  ];

  const getTypeColor = (type) => {
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
  };

  const handleSearch = async (searchValue) => {
    const term = searchValue || searchTerm;
    if (!term.trim()) {
      // You can add toast notification here
      console.error("Please enter a Pokémon name or ID");
      return;
    }

    setIsLoading(true);
    try {
      const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${term.toLowerCase().trim()}`).then(res => res.json());
      onPokemonSelect(pokemon);
      console.log("Pokémon Found:", pokemon.name);
    } catch (error) {
      console.error("Pokémon Not Found:", error);
      onPokemonSelect(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTypeFilter = async (type) => {
    setIsLoading(true);
    try {
      const typeData = await fetch(`https://pokeapi.co/api/v2/type/${type}`).then(res => res.json());
      if (typeData.pokemon.length > 0) {
        // Get a random Pokémon of this type
        const randomIndex = Math.floor(Math.random() * Math.min(20, typeData.pokemon.length));
        const selectedPokemonData = typeData.pokemon[randomIndex].pokemon;
        const pokemon = await fetch(selectedPokemonData.url).then(res => res.json());
        onPokemonSelect(pokemon);
        console.log(`${type.toUpperCase()} Type Found:`, pokemon.name);
      }
    } catch (error) {
      console.error("Search Failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRandomPokemon = async () => {
    setIsLoading(true);
    try {
      const randomId = Math.floor(Math.random() * 1010) + 1;
      const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`).then(res => res.json());
      onPokemonSelect(pokemon);
      console.log("Random Pokémon Found:", pokemon.name);
    } catch (error) {
      console.error("Random Search Failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Main Search */}
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Enter Pokémon name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          className="font-digital bg-screen-bg border-screen-border text-screen-text placeholder:text-screen-text/50"
          disabled={isLoading}
        />
        <Button
          onClick={() => handleSearch()}
          disabled={isLoading}
          className="hardware-button bg-pokedex-blue/80 hover:bg-pokedex-blue text-white"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Control Buttons */}
      <div className="flex space-x-2">
        <Button
          onClick={handleRandomPokemon}
          disabled={isLoading}
          className="hardware-button bg-pokedex-yellow/80 hover:bg-pokedex-yellow text-black flex-1"
        >
          🎲 RANDOM
        </Button>
        <Button
          onClick={() => setShowTypeFilter(!showTypeFilter)}
          className={`hardware-button flex-1 ${showTypeFilter ? 'bg-pokedex-green/20' : ''}`}
        >
          <Filter className="h-4 w-4 mr-1" />
          TYPES
        </Button>
      </div>

      {/* Type Filter */}
      {showTypeFilter && (
        <div className="control-panel animate-slide-in-right">
          <div className="flex items-center justify-between mb-2">
            <span className="font-digital text-sm text-screen-text">SELECT TYPE</span>
            <Button
              onClick={() => setShowTypeFilter(false)}
              className="p-1 h-6 w-6 hardware-button"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-1">
            {pokemonTypes.map((type) => (
              <Button
                key={type}
                onClick={() => handleTypeFilter(type)}
                disabled={isLoading}
                className="hardware-button text-xs p-1 h-8"
                style={{
                  backgroundColor: getTypeColor(type) + '30',
                  borderColor: getTypeColor(type)
                }}
              >
                {type.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Quick Access Buttons */}
      <div className="control-panel">
        <div className="text-xs font-digital text-screen-text/70 mb-2">POPULAR POKÉMON</div>
        <div className="grid grid-cols-3 gap-2">
          {popularPokemon.map((pokemon) => (
            <Button
              key={pokemon.name}
              onClick={() => handleSearch(pokemon.name)}
              disabled={isLoading}
              className="hardware-button text-xs p-2 h-10"
            >
              <div className="text-center">
                <div className="font-bold">{pokemon.name.toUpperCase()}</div>
                <div className="text-xs opacity-70">#{pokemon.id}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};