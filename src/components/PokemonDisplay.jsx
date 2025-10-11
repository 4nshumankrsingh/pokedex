"use client";

import { useEffect, useState } from "react";
import { PokemonBasicInfo } from "./pokemon/PokemonBasicInfo";
import { PokemonStats } from "./pokemon/PokemonStats";
import { PokemonAbilities } from "./pokemon/PokemonAbilities";
import { PokemonMoves } from "./pokemon/PokemonMoves";
import { PokemonDescription } from "./pokemon/PokemonDescription";
import { PokemonEvolution } from "./pokemon/PokemonEvolution";
import { PokemonNavigation } from "./pokemon/PokemonNavigation";

export const PokemonDisplay = ({ pokemon, onPokemonSelect }) => {
  const [species, setSpecies] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [flavorText, setFlavorText] = useState("");

  useEffect(() => {
    loadPokemonDetails();
  }, [pokemon.id]);

  const loadPokemonDetails = async () => {
    setIsLoading(true);
    try {
      const speciesData = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`).then(res => res.json());
      setSpecies(speciesData);
      
      // Get English flavor text
      const englishEntry = speciesData.flavor_text_entries.find(
        entry => entry.language.name === "en"
      );
      
      if (englishEntry) {
        const cleanText = englishEntry.flavor_text.replace(/[\n\f\r]/g, " ");
        setFlavorText(cleanText);
      }

      // Load evolution chain
      if (speciesData.evolution_chain?.url) {
        const evolutionData = await fetch(speciesData.evolution_chain.url).then(res => res.json());
        setEvolutionChain(evolutionData);
      }
    } catch (error) {
      console.error("Failed to load Pokémon details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleSpeech = () => {
    setIsSpeaking(!isSpeaking);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Navigation Controls */}
      <PokemonNavigation 
        pokemon={pokemon} 
        onPokemonSelect={onPokemonSelect} 
        isLoading={isLoading}
      />

      {/* Pokemon Basic Info */}
      <PokemonBasicInfo pokemon={pokemon} />

      {/* Pokemon Description with TTS */}
      <PokemonDescription 
        pokemon={pokemon}
        species={species}
        flavorText={flavorText}
        isSpeaking={isSpeaking}
        onToggleSpeech={handleToggleSpeech}
        isLoading={isLoading}
      />

      {/* Stats and Abilities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PokemonStats pokemon={pokemon} />
        <PokemonAbilities pokemon={pokemon} />
      </div>

      {/* Evolution Chain */}
      <PokemonEvolution 
        pokemon={pokemon}
        evolutionChain={evolutionChain}
        onPokemonSelect={onPokemonSelect}
      />

      {/* Moves */}
      <PokemonMoves pokemon={pokemon} />
    </div>
  );
};