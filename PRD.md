# PRD: React Native Pokedex

## 1. Executive Summary

**Project Description:** A web and Android application for querying *Pokemon* data. The application will function as a *Pokedex* that uses the **PokeAPI** to display detailed information about each *Pokemon*.

**Main Objective:** Create a user interface that allows listing, filtering, and detailed viewing of each *Pokemon*, using lazy loading techniques *(Infinite Scroll)*.

---

## 2. Product Vision & Strategy

### Product Vision
Provide users with a fast and lightweight search tool without the unnecessary information of traditional *Pokedexes*, offering smooth navigation and immediate access to detailed information for each *Pokemon*.

### Development Strategy
1. **Performance:** Implementation of an *Infinite Scroll* that loads *Pokemons* in batches of 30.
2. **Efficient State Management:** Using **Zustand** for search logic and type-based filtering results.
3. **Hybrid Filtering:** Ability to combine name search and type filtering simultaneously to improve accuracy.
4. **Technical Scalability:** Use of clean architecture that allows adding features such as stat comparisons or favorite systems in later phases without changing the core codebase.

--- 

## 3. Functional Requirements

### 3.1 User Stories

| ID | Role | I want to... | So that... |
| :--- | :--- | :--- | :--- |
| **US-01** | User | See an initial list of 30 *Pokémon* | Explore the catalog without long loading times. |
| **US-02** | User | Load more *Pokémon* when scrolling down | Keep browsing the *Pokédex* in a smooth way. |
| **US-03** | User | Search for a *Pokémon* by name | Quickly find a specific *Pokémon* among hundreds of options. |
| **US-04** | User | Filter the list by type (e.g., **Fire**, **Water**) | See only the *Pokémon* that belong to the selected type. |
| **US-05** | User | View the details of a *Pokémon* when selecting it | Check its base stats, types, and specific abilities. |

### 3.2 Technical Functional Specifications

#### RF-01: Dynamic List and Infinite Scroll
* **Initial Load:** When the main component is mounted, the app must make a request to the **PokeAPI**, limiting the results to the **first 30 records**.
* **Scroll Trigger:** An observer must be implemented at the end of the list to trigger a new request.
* **Cumulative Pagination:** Each new load must bring exactly **30 additional items**, keeping the previous ones stored in the global **Zustand** state.

#### RF-02: Search and Filter System
* **Search by Name:** The search input must filter the results. When the user types, the list must update to show partial or exact matches.
* **Filter by Type:** A selector must be provided with the official *Pokemon* types. When one is selected, the list will be cleared and updated to show only the *Pokemon* that have that type.
* **Combined State:** Filters must work together (e.g., searching "Char" while filtering only by type "Fire").

#### RF-03: Detail View
* **Navigation:** When clicking on a card in the list, the app must display detailed information.
* **Required Data:** The view must render at least:
    * Front image (Sprite).
    * Name and ID number.
    * Elemental types.
    * Base stats (HP, Attack, Defense, Special Attack, Special Defense, Speed).
    * Abilities.

---

## 4. Non-Functional Requirements

### 4.1 Performance
* **Initial Loading Time:** The application must load and display the first 30 *Pokémon* at a satisfactory speed.
* **Image Optimization:** The official sprites from the *PokéAPI* must be used, preferably in `.webp` or `.png` format.

### 4.2 Design
* **Responsive Design:** The interface must adapt correctly to mobile devices, tablets, and desktop screens (In web).
* **Visual Feedback:** Loading *Skeletons* must be shown while the next 30 Pokémon are being fetched through Infinite Scroll.
* Proper color contrast must be used (especially for the "Type" labels).

### 4.3 Maintainability and Technical Quality
* **Error Handling:** The application must handle error states (e.g., "*Pokémon* not found" or "API connection error") by showing notifications.
* **Data Consistency:** If the user filters by type and then scrolls, the *Infinite Scroll* must respect the active filter and load the next 30 Pokémon of that specific type, or apply the filter to the local data set.


---

## 5. Technical Architecture

To make sure the app is well separated and easy to test, the application is divided into four main layers, following the principles of Robert C. Martin. We will also apply the MVVM pattern.

### 5.1 System Layers

1. **Domain Layer:** Contains the business entities, interfaces and the use cases.
2. **Data Layer:** This is where the API connection and repositories are located.
3. **UI Layer:** React components, Hooks, ViewModels, and the **Zustand** state. Its only responsibility is to display data and react to user events.
4. **Core Layer (Support):** Principally **Dependency Injection**.

### 5.2 Flow and Dependency Diagram

```
  [ UI Layer ] --> [ Domain Layer (Interfaces / Use Cases) ]
                                    ^
                                    |
                    [ Data Layer (Implementations) ]
```

---

## 6. Data Model & TypeScript Interfaces

This section defines the data structure following Clean Architecture principles, making sure there is complete separation between the external data source (PokéAPI) and application logic. A strong typing system is used to prevent runtime errors and make maintenance easier.

### 6.1 Domain Entities
Pure and simplified data models used by the business logic and the user interface.

```typescript
// src/domain/entities/Pokemon.ts

export type PokemonType = 
  | 'grass' | 'fire' | 'water' | 'bug' | 'normal' | 'poison' 
  | 'electric' | 'ground' | 'fairy' | 'fighting' | 'psychic' 
  | 'rock' | 'ghost' | 'ice' | 'dragon' | 'dark' | 'steel' | 'flying';

export interface PokemonStat {
  name: string;
  value: number;
}

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: string[];
}

export interface PokemonPageResponse {
  count: number;
  next: string | null;
  results: PokemonShort[];
}

export interface PokemonShort {
  name: string;
  url: string; 
}
```

### 6.2 Data Transfer Objects
Exact representation of the PokéAPI schema. Used in the Data layer for typing HTTP responses before mapping them to domain entities.

```typescript
// src/data/models/PokeApiDto.ts

export interface PokeApiPokemonDto {
  id: number;
  name: string;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: Array<{
    type: { name: string };
  }>;
  stats: Array<{
    base_stat: number;
    stat: { name: string };
  }>;
  abilities: Array<{
    ability: { name: string };
  }>;
}
```

### 6.3 State Management Model (Zustand)
Interface for the global Store in the Presentation layer. It centralizes the list state, pagination, and reactive filtering logic.

```typescript
// src/presentation/state/usePokemonStore.ts

import { Pokemon, PokemonType } from '../../domain/entities/Pokemon';

interface PokemonState {
  // State
  // Master list (If the list was only obtained via API, we wouldn't be able to use the name filter effectively, this way we can filter by similarities in the name too)
  pokemons: Pokemon[];
  filteredPokemons: Pokemon[]; // Processed list to be rendered on screen
  loading: boolean;
  error: string | null;
  offset: number;              // Current pointer (batches of 30)
  hasMore: boolean;            // Flag to stop the observer
  
  // Filters State
  searchQuery: string;
  selectedType: PokemonType | 'all';

  // Actions (Call the Use Cases)
  fetchNextPage: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  setSelectedType: (type: PokemonType | 'all') => void;
}
```

### 6.4 Data Mapping Rules
The **Data** layer is responsible for transforming DTOs into domain entities using *Mappers*. This ensures the UI does not depend on accidental changes in the PokéAPI.

**Transformation rules applied:**
1. **Name Normalization:** `toUpperCase()` or capitalization is applied to the first letter of `name` so the UI receives data ready to display.
2. **Stats Structure:** The original API array is mapped to the `PokemonStat[]` interface, renaming raw fields like `base_stat` to a simple `value`.
3. **Asset Selection:** The entity's `image` property is mapped exclusively from `sprites.other['official-artwork'].front_default`, ignoring other low-quality sprites.
4. **Type Simplification:** Only the type name (`type.name`) is extracted to avoid handling nested objects in UI components.