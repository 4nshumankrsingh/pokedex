"use client";

import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export const PokemonBasicInfo = ({ pokemon }) => {
  const [imageType, setImageType] = useState('default');
  const [showBack, setShowBack] = useState(false);

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

  const getImageUrl = () => {
    if (showBack) {
      return imageType === 'shiny' 
        ? pokemon.sprites.back_shiny || pokemon.sprites.back_default
        : pokemon.sprites.back_default;
    }
    
    if (imageType === 'shiny') {
      return pokemon.sprites.front_shiny || 
             pokemon.sprites.other['official-artwork'].front_default || 
             pokemon.sprites.front_default;
    }
    
    return pokemon.sprites.other['official-artwork'].front_default || 
           pokemon.sprites.front_default;
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Pokemon Image */}
      <div className="text-center">
        <div className="relative mb-4 group">
          <div className="screen-panel p-4">
            <img
              src={getImageUrl()}
              alt={pokemon.name}
              className="w-48 h-48 mx-auto object-contain data-transition hover:scale-105"
              style={{
                filter: "drop-shadow(0 0 20px hsl(var(--pokedex-blue) / 0.3))"
              }}
              onError={(e) => {
                e.currentTarget.src = pokemon.sprites.front_default || '';
              }}
            />
          </div>
          
          {/* Image Controls */}
          <div className="absolute top-2 right-2 space-y-1">
            <Badge 
              variant="secondary" 
              className="font-digital text-xs cursor-pointer animate-scale-in"
              onClick={() => setImageType(imageType === 'default' ? 'shiny' : 'default')}
            >
              {imageType === 'shiny' ? '✨ SHINY' : '🎨 NORMAL'}
            </Badge>
            {(pokemon.sprites.back_default || pokemon.sprites.back_shiny) && (
              <Badge 
                variant="outline" 
                className="font-digital text-xs cursor-pointer block animate-scale-in"
                onClick={() => setShowBack(!showBack)}
              >
                {showBack ? 'FRONT' : 'BACK'}
              </Badge>
            )}
          </div>
        </div>

        <h3 className="text-3xl font-digital font-bold text-screen-text text-glow-green mb-2 animate-data-scroll">
          {formatPokemonName(pokemon.name)}
        </h3>

        {/* Types */}
        <div className="flex justify-center space-x-2 mb-4 animate-slide-in-left">
          {pokemon.types.map((type, index) => (
            <Badge
              key={type.slot}
              className="font-digital text-white font-semibold px-3 py-1 animate-scale-in"
              style={{
                backgroundColor: getTypeColor(type.type.name),
                animationDelay: `${index * 0.1}s`
              }}
            >
              {type.type.name.toUpperCase()}
            </Badge>
          ))}
        </div>

        {/* Physical Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="control-panel animate-slide-in-left">
            <div className="text-screen-text/70 font-digital text-xs">HEIGHT</div>
            <div className="text-screen-text font-digital font-bold text-lg">
              {(pokemon.height / 10).toFixed(1)}m
            </div>
          </div>
          <div className="control-panel animate-fade-in" style={{animationDelay: '0.1s'}}>
            <div className="text-screen-text/70 font-digital text-xs">WEIGHT</div>
            <div className="text-screen-text font-digital font-bold text-lg">
              {(pokemon.weight / 10).toFixed(1)}kg
            </div>
          </div>
          <div className="control-panel animate-slide-in-right" style={{animationDelay: '0.2s'}}>
            <div className="text-screen-text/70 font-digital text-xs">EXP</div>
            <div className="text-screen-text font-digital font-bold text-lg">
              {pokemon.base_experience || 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};