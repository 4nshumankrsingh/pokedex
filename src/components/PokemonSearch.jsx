"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, Filter, X, ChevronDown, ChevronUp } from "lucide-react";

export const PokemonSearch = ({ onPokemonSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showTypeFilter, setShowTypeFilter] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [allPokemon, setAllPokemon] = useState([]);
  const [isLoadingAll, setIsLoadingAll] = useState(false);
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
    setIsLoadingAll(true);
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
      const data = await response.json();
      
      // Create an array with id and name for each Pokémon
      const pokemonList = data.results.map((pokemon, index) => ({
        id: index + 1,
        name: pokemon.name,
        displayName: formatPokemonName(pokemon.name)
      }));
      
      setAllPokemon(pokemonList);
    } catch (error) {
      console.error("Failed to load Pokémon list:", error);
    } finally {
      setIsLoadingAll(false);
    }
  };

  const formatPokemonName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, " ");
  };

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

  // Update suggestions when search term changes
  useEffect(() => {
    if (searchTerm.length > 1) {
      const filtered = allPokemon.filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pokemon.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pokemon.id.toString().includes(searchTerm)
      ).slice(0, 8); // Limit to 8 suggestions
      
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, allPokemon]);

  const handleSearch = async (searchValue) => {
    const term = searchValue || searchTerm;
    if (!term.trim()) {
      console.error("Please enter a Pokémon name or ID");
      return;
    }

    setIsLoading(true);
    setShowSuggestions(false);
    try {
      const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${term.toLowerCase().trim()}`).then(res => res.json());
      onPokemonSelect(pokemon);
      setSearchTerm("");
      console.log("Pokémon Found:", pokemon.name);
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
      console.log("Pokémon Found:", pokemonData.name);
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

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleInputFocus = () => {
    if (searchTerm.length > 1 && suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Main Search with Suggestions */}
      <div className="relative" ref={searchRef}>
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Enter Pokémon name or ID..."
            value={searchTerm}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            onFocus={handleInputFocus}
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

        {/* Search Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-screen-bg border border-screen-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {suggestions.map((pokemon) => (
              <div
                key={pokemon.id}
                className="flex items-center justify-between p-3 hover:bg-pokedex-blue/20 cursor-pointer border-b border-screen-border/30 last:border-b-0 transition-colors"
                onClick={() => handleSuggestionClick(pokemon)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-muted/20 rounded-full flex items-center justify-center">
                    <span className="text-xs font-digital text-screen-text/70">
                      #{pokemon.id}
                    </span>
                  </div>
                  <span className="font-digital text-screen-text font-medium">
                    {pokemon.displayName}
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 text-screen-text/50" />
              </div>
            ))}
          </div>
        )}

        {/* Loading State for Suggestions */}
        {isLoadingAll && searchTerm.length > 0 && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-screen-bg border border-screen-border rounded-lg p-4">
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin text-pokedex-blue" />
              <span className="font-digital text-screen-text text-sm">Loading Pokémon...</span>
            </div>
          </div>
        )}

        {/* No Results Found */}
        {showSuggestions && searchTerm.length > 1 && suggestions.length === 0 && !isLoadingAll && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-screen-bg border border-screen-border rounded-lg p-4">
            <div className="text-center">
              <span className="font-digital text-screen-text/70 text-sm">No Pokémon found</span>
            </div>
          </div>
        )}
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
                <div className="font-bold">{formatPokemonName(pokemon.name)}</div>
                <div className="text-xs opacity-70">#{pokemon.id}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Search Tips */}
      <div className="control-panel">
        <div className="text-xs font-digital text-screen-text/70 mb-2">SEARCH TIPS</div>
        <div className="space-y-1 text-xs text-screen-text/60">
          <div>• Start typing to see suggestions</div>
          <div>• Use name or ID number</div>
          <div>• Click suggestions to load instantly</div>
        </div>
      </div>
    </div>
  );
};

// Add missing ChevronRight icon component
const ChevronRight = ({ className }) => (
  <svg
    className={className}
    fill="none"
    height="24"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="24"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);