"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search, Filter, X } from "lucide-react";

export const PokemonSearch = ({ onPokemonSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showTypeFilter, setShowTypeFilter] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [allPokemon, setAllPokemon] = useState([]);
  const searchRef = useRef(null);

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

  // Load all Pokémon names on component mount
  useEffect(() => {
    loadAllPokemon();
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const loadAllPokemon = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
      const data = await response.json();
      
      const pokemonList = data.results.map((pokemon, index) => ({
        id: index + 1,
        name: pokemon.name,
        displayName: formatPokemonName(pokemon.name)
      }));
      
      setAllPokemon(pokemonList);
    } catch (error) {
      console.error("Failed to load Pokémon list:", error);
    }
  };

  const formatPokemonName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, " ");
  };

  const getTypeColor = (type) => {
    const typeColors = {
      normal: "#94a3b8",
      fire: "#f97316",
      water: "#3b82f6", 
      electric: "#eab308",
      grass: "#22c55e",
      ice: "#7dd3fc",
      fighting: "#dc2626",
      poison: "#a855f7",
      ground: "#d97706",
      flying: "#93c5fd",
      psychic: "#ec4899",
      bug: "#84cc16",
      rock: "#a16207",
      ghost: "#7e22ce",
      dragon: "#6366f1",
      dark: "#475569",
      steel: "#64748b",
      fairy: "#f0abfc",
    };
    return typeColors[type] || "#6b7280";
  };

  // Update suggestions when search term changes
  useEffect(() => {
    if (searchTerm.length > 1) {
      const filtered = allPokemon.filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pokemon.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pokemon.id.toString().includes(searchTerm)
      ).slice(0, 6);
      
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, allPokemon]);

  const handleSearch = async (searchValue) => {
    const term = searchValue || searchTerm;
    if (!term.trim()) return;

    setIsLoading(true);
    setShowSuggestions(false);
    try {
      const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${term.toLowerCase().trim()}`).then(res => res.json());
      onPokemonSelect(pokemon);
      setSearchTerm("");
    } catch (error) {
      console.error("Pokémon Not Found:", error);
      onPokemonSelect(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = async (pokemon) => {
    setIsLoading(true);
    setShowSuggestions(false);
    setSearchTerm("");
    try {
      const pokemonData = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`).then(res => res.json());
      onPokemonSelect(pokemonData);
    } catch (error) {
      console.error("Failed to load Pokémon:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTypeFilter = async (type) => {
    setIsLoading(true);
    setShowTypeFilter(false);
    try {
      const typeData = await fetch(`https://pokeapi.co/api/v2/type/${type}`).then(res => res.json());
      if (typeData.pokemon.length > 0) {
        const randomIndex = Math.floor(Math.random() * Math.min(20, typeData.pokemon.length));
        const selectedPokemonData = typeData.pokemon[randomIndex].pokemon;
        const pokemon = await fetch(selectedPokemonData.url).then(res => res.json());
        onPokemonSelect(pokemon);
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
    <div className="space-y-3 animate-fade-in">
      {/* Main Search with Suggestions */}
      <div className="relative" ref={searchRef}>
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Enter Pokémon name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => searchTerm.length > 1 && setShowSuggestions(true)}
            className="font-digital bg-screen-bg border-screen-border text-screen-text placeholder:text-screen-text/50"
            disabled={isLoading}
          />
          <Button
            onClick={() => handleSearch()}
            disabled={isLoading}
            className="hardware-button bg-pokedex-blue/80 hover:bg-pokedex-blue text-white px-3"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Search Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-screen-bg border border-screen-border rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {suggestions.map((pokemon) => (
              <div
                key={pokemon.id}
                className="flex items-center justify-between p-2 hover:bg-pokedex-blue/20 cursor-pointer border-b border-screen-border/30 last:border-b-0 transition-colors"
                onClick={() => handleSuggestionClick(pokemon)}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-muted/20 rounded-full flex items-center justify-center">
                    <span className="text-xs font-digital text-screen-text/70">
                      #{pokemon.id}
                    </span>
                  </div>
                  <span className="font-digital text-screen-text text-sm">
                    {pokemon.displayName}
                  </span>
                </div>
                <div className="w-4 h-4">
                  <svg fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="16">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Control Buttons */}
      <div className="flex space-x-2">
        <Button
          onClick={handleRandomPokemon}
          disabled={isLoading}
          className="hardware-button bg-pokedex-yellow/80 hover:bg-pokedex-yellow text-black flex-1 text-sm py-2"
        >
          🎲 RANDOM
        </Button>
        <Button
          onClick={() => setShowTypeFilter(!showTypeFilter)}
          className={`hardware-button flex-1 text-sm py-2 ${showTypeFilter ? 'bg-pokedex-green/20' : ''}`}
        >
          <Filter className="h-3 w-3 mr-1" />
          TYPES
        </Button>
      </div>

      {/* Type Filter */}
      {showTypeFilter && (
        <div className="control-panel p-3 animate-slide-in-right">
          <div className="flex items-center justify-between mb-2">
            <span className="font-digital text-sm text-screen-text">SELECT TYPE</span>
            <Button
              onClick={() => setShowTypeFilter(false)}
              className="p-1 h-5 w-5 hardware-button"
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
                className="hardware-button text-xs p-1 h-7"
                style={{
                  backgroundColor: getTypeColor(type) + '20',
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
      <div className="control-panel p-3">
        <div className="text-xs font-digital text-screen-text/70 mb-2">POPULAR POKÉMON</div>
        <div className="grid grid-cols-3 gap-1">
          {popularPokemon.map((pokemon) => (
            <Button
              key={pokemon.name}
              onClick={() => handleSearch(pokemon.name)}
              disabled={isLoading}
              className="hardware-button text-xs p-1 h-8"
            >
              <div className="text-center">
                <div className="font-bold text-[10px] leading-tight">{formatPokemonName(pokemon.name)}</div>
                <div className="text-[9px] opacity-70">#{pokemon.id}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Search Tips - Compact Version */}
      <div className="control-panel p-2">
        <div className="text-xs font-digital text-screen-text/70 mb-1 text-center">SEARCH TIPS</div>
        <div className="text-[10px] text-screen-text/60 text-center space-y-0.5">
          <div>Start typing to see suggestions</div>
          <div>Use name or ID number • Click suggestions to load</div>
        </div>
      </div>
    </div>
  );
};