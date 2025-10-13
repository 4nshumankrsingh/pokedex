# Pokédex - Modern Pokémon Database 🎮

<div align="center">
  
![Home Page](/public/home-page.png)

A sleek, modern Pokédex web application built with Next.js 15, featuring real-time search, dynamic suggestions, and comprehensive Pokémon data visualization.

</div>

## 🌟 Live Demo

🔗 **Live Application**: [https://pokedex-two-gold.vercel.app/](https://pokedex-two-gold.vercel.app/)

## ✨ Features

### 🔍 Smart Search System
- **Real-time Search Suggestions**: Dynamic dropdown with Pokémon names and IDs as you type
- **Multiple Search Methods**: Search by name, ID number, or Pokémon type
- **Quick Access**: Popular Pokémon buttons for instant access
- **Random Pokémon Discovery**: Explore random Pokémon with one click

### 📊 Comprehensive Pokémon Data
- **Detailed Statistics**: HP, Attack, Defense, Special Attack, Special Defense, and Speed
- **Evolution Chains**: Complete evolution paths with requirements
- **Ability Information**: Normal and hidden abilities with slot details
- **Move Sets**: Organized by learning methods (level-up, machine, egg, tutor)
- **Physical Attributes**: Height, weight, and base experience

### 🎨 Modern UI/UX
- **Digital Pokédex Theme**: Authentic Pokédex styling
- **Responsive Design**: Optimized for desktop and mobile devices
- **Smooth Animations**: Fade-in, slide-in, and scale animations
- **Interactive Elements**: Hover effects and transition animations
- **Notification System**: Toast notifications for search feedback

### 🎯 Advanced Functionality
- **Image Controls**: Toggle between normal/shiny and front/back sprites
- **Type Filtering**: Filter Pokémon by all 18 elemental types
- **Text-to-Speech**: Pokémon description narration (where supported)
- **Navigation Controls**: Previous/next Pokémon browsing
- **Version Selection**: Multiple Pokédex entry versions

## 🛠️ Technology Stack

| **Category** | **Technologies** |
|--------------|------------------|
| **Frontend** | Next.js 15, React 18, Tailwind CSS |
| **Backend** | Next.js API Routes, Vercel Serverless Functions |
| **Data Source** | PokeAPI (REST API) |
| **Styling** | Tailwind CSS, Custom CSS Animations |
| **Icons** | Lucide React |
| **Deployment** | Vercel |

## 📁 Project Structure

```
pokedex/
├── src/
│   ├── app/                 # Next.js 15 app directory
│   │   ├── globals.css      # Global styles and Tailwind config
│   │   ├── layout.js        # Root layout component
│   │   ├── page.js          # Home page
│   │   └── not-found.js     # 404 error page
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   │   ├── badge.jsx
│   │   │   ├── button.jsx
│   │   │   ├── progress.jsx
│   │   │   └── input.jsx
│   │   ├── pokemon/         # Pokémon-specific components
│   │   │   ├── PokemonAbilities.jsx
│   │   │   ├── PokemonBasicInfo.jsx
│   │   │   ├── PokemonDescription.jsx
│   │   │   ├── PokemonEvolution.jsx
│   │   │   ├── PokemonMoves.jsx
│   │   │   ├── PokemonNavigation.jsx
│   │   │   └── PokemonStats.jsx
│   │   ├── PokemonDisplay.jsx
│   │   └── PokemonSearch.jsx
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   ├── types/               # Type definitions
│   └── utils/               # Helper utilities
├── tailwind.config.js       # Tailwind CSS configuration
└── next.config.js          # Next.js configuration
```

## 🎮 How to Use

### Basic Search
1. Type a Pokémon name or ID in the search bar
2. Select from real-time suggestions or press Enter
3. View comprehensive data in the display panel

### Advanced Features
- **Type Filter**: Click "TYPES" and select an element to find random Pokémon of that type
- **Random Discovery**: Click "RANDOM" to explore unexpected Pokémon
- **Image Controls**: Use badges on Pokémon images to toggle shiny forms and back sprites
- **Evolution Navigation**: Click any Pokémon in evolution chains to view their data

### Search Tips
- Start typing to see instant suggestions
- Use exact names or ID numbers (1-1010)
- Click suggestions for immediate loading
- Use popular Pokémon buttons for quick access

## 🔧 API Integration

This project uses the PokeAPI to fetch Pokémon data:

- **Pokémon Data**: `/pokemon/{id_or_name}`
- **Species Info**: `/pokemon-species/{id}`
- **Evolution Chains**: `/evolution-chain/{id}`
- **Type Data**: `/type/{type_name}`

## 🙏 Acknowledgments

- **PokeAPI** for providing comprehensive Pokémon data
- **Next.js** for the amazing React framework
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for beautiful icons

---

<div align="center">
  
**Pokédex - Gotta Catch 'Em All!** 🐾

</div>
