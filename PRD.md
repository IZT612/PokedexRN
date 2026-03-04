# PRD: React Native Pokédex

## 1. Executive Summary

**Project Description:** A web and Android application for querying *Pokémon* data. The application will function as a *Pokédex* that uses the **PokéAPI** to display detailed information about each *Pokémon*.

**Main Objective:** Create a user interface that allows listing, filtering, and detailed viewing of each *Pokémon*, using lazy loading techniques *(Infinite Scroll)*.

---

## 2. Product Vision & Strategy

### Product Vision
Provide users with a fast and lightweight search tool without the unnecessary information of traditional *Pokédex*, offering smooth navigation and immediate access to detailed information for each *Pokémon*.

### Development Strategy
1. **Performance:** Implementation of an *Infinite Scroll* that loads *Pokémon* in batches of 30.
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
* **Initial Load:** When the main component is mounted, the app must make a request to the **PokéAPI**, limiting the results to the **first 30 records**.
* **Scroll Trigger:** An observer must be implemented at the end of the list to trigger a new request.
* **Cumulative Pagination:** Each new load must bring exactly **30 additional items**, keeping the previous ones stored in the global **Zustand** state.

#### RF-02: Search and Filter System
* **Search by Name:** The search input must filter the results. When the user types, the list must update to show partial or exact matches.
* **Filter by Type:** A selector must be provided with the official *Pokémon* types. When one is selected, the list will be cleared and updated to show only the *Pokémon* that have that type.
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
* **Image Optimization:** The official sprites from the *PokéAPI* must be used, preferably in `.png` format.

### 4.2 Design
* **Responsive Design:** The interface must adapt correctly to mobile devices, tablets, and desktop screens (In web).
* **Visual Feedback:** Loading *Skeletons* must be shown while the next 30 *Pokémon* are being fetched through Infinite Scroll.
* Proper color contrast must be used (especially for the "Type" labels).

### 4.3 Maintainability and Technical Quality
* **Error Handling:** The application must handle error states (e.g., "*Pokémon* not found" or "API connection error") by showing notifications.
* **Data Consistency:** If the user filters by type and then scrolls, the *Infinite Scroll* must respect the active filter and load the next 30 *Pokémon* of that specific type, or apply the filter to the local data set.


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

--- 

## 7. Design System Specification

To ensure a professional and consistent visual experience, we define a design system based on **tokens**. This allows any change in colors or typography to update automatically across the entire application.

### 7.1 Core Brand Tokens
These are the base values for the interface on both desktop and mobile versions.

| Token | Value | Description |
| :--- | :--- | :--- |
| **Primary Red** | `#EF5350` | Main brand color (Classic Pokedex style). |
| **Secondary Blue**| `#3761A8` | Accent color for buttons and links. |
| **Background** | `#F5F5F5` | Neutral background to make Pokemon cards stand out. |
| **Surface** | `#FFFFFF` | Background color for cards and modals. |
| **Font Family** | `'Inter', system-ui` | Modern typography for better readability of stats. |

### 7.2 Pokemon Type Tokens
Semantic colors associated with each elemental type to improve visual recognition in cards and filters.

| Type | Color (Hex) | UI Application |
| :--- | :--- | :--- |
| **Normal** | `#A8A77A` | Type labels and card borders. |
| **Fire** | `#EE8130` | Type labels and card borders. |
| **Water** | `#6390F0` | Type labels and card borders. |
| **Electric**| `#F7D02C` | Type labels and card borders. |
| **Grass** | `#7AC74C` | Type labels and card borders. |
| **Ice** | `#96D9D6` | Type labels and card borders. |
| **Fighting**| `#C22E28` | Type labels and card borders. |
| **Poison** | `#A33EA1` | Type labels and card borders. |
| **Ground** | `#E2BF65` | Type labels and card borders. |
| **Flying** | `#A98FF3` | Type labels and card borders. |
| **Psychic** | `#F95587` | Type labels and card borders. |
| **Bug** | `#A6B91A` | Type labels and card borders. |
| **Rock** | `#B6A136` | Type labels and card borders. |
| **Ghost** | `#735797` | Type labels and card borders. |
| **Dragon** | `#6F35FC` | Type labels and card borders. |
| **Dark** | `#736C75` | Type labels and card borders. |
| **Steel** | `#B7B7CE` | Type labels and card borders. |
| **Fairy** | `#D685AD` | Type labels and card borders. |

---

## 8. User Flows & Wireframes

(Visual images of the screens are not ready yet. The wireframe is made with ASCII Art thanks to AI for now.)

This section shows how a user interacts with the Pokedex and how the screens are organized.

### 8.1 User Navigation Flow
1. **Entry:** User opens the app and sees the first 30 Pokemon.
2. **Browsing:** User scrolls down; the app loads 30 more Pokemon automatically.
3. **Searching:** User types a name in the search bar; the list updates instantly.
4. **Filtering:** User selects a "Type" (e.g., Water); the list shows only Water Pokemon.
5. **Detail:** User clicks a card; a detailed view opens with stats and abilities.

### 8.2 Main Screen Wireframe (ASCII Art)
This is the simple layout for the main page.

```
_______________________________________________________
|  [ Pokedex App ]                  [ Search... ] [V] | <-- Header & Filters
|_____________________________________________________|
|                                                     |
|  [ Card #1 ]    [ Card #2 ]    [ Card #3 ]          |
|  | Image   |    | Image   |    | Image   |          |
|  | Name    |    | Name    |    | Name    |          |
|  | Types   |    | Types   |    | Types   |          |
|  [_________]    [_________]    [_________]          |
|                                                     |
|  [ Card #4 ]    [ Card #5 ]    [ Card #6 ]          |
|  | Image   |    | Image   |    | Image   |          |
|  | Name    |    | Name    |    | Name    |          |
|  | Types   |    | Types   |    | Types   |          |
|  [_________]    [_________]    [_________]          |
|                                                     |
|                [ Loading more... ]                  | <-- Scroll Trigger
|_____________________________________________________|
```

### 8.3 Detail View Wireframe (ASCII Art)

This is what the user sees after clicking a Pokemon card.

```
_________________________________________
| [ < Back ]                            |
|_______________________________________|
|           #006 - CHARIZARD            |
|                                       |
|            [ IMAGE HERE ]             |
|                                       |
|   Type: [ FIRE ] [ FLYING ]           |
|_______________________________________|
|  STATS:                               |
|  HP:      |||||||| 78                 |
|  ATK:     |||||||||| 84               |
|  DEF:     |||||||| 78                 |
|_______________________________________|
|  ABILITIES:                           |
|  * Blaze   * Solar Power              |
|_______________________________________|
```

---

## 9. API Integration Specs

This section describes how the application communicates with the external PokéAPI (https://pokeapi.co/).

### 9.1 Endpoints Used
The app will consume three main endpoints:

1. **List Endpoint:** `GET /pokemon?limit=30&offset={offset}`
   * Used for: Initial load and Infinite Scroll.
   * Returns: A list of names and URLs for each Pokemon.

2. **Detail Endpoint:** `GET /pokemon/{id_or_name}`
   * Used for: Getting images, types, stats, and abilities.
   * Note: This is called for each Pokemon in the list to complete the "Domain Entity."

3. **Type Endpoint:** `GET /type/{type_id}`
   * Used for: Filtering by type.
   * Returns: A full list of all Pokemon belonging to that specific type.

### 9.2 Request Strategy
* **Parallel Requests:** When fetching a list of 30 Pokemon, the app will use `Promise.all()` to fetch their individual details in parallel. This makes the loading much faster.
* **Pagination Logic:** The `offset` will increase by 30 every time the user reaches the bottom of the screen.

---

## 10. Development Phases

This project is divided into four main stages to ensure a stable and high-quality application.

### Phase 1: Foundation & Core Architecture
* Set up React project with TypeScript.
* Create the folder structure (Data, Domain, UI, Core).
* Define Domain Entities and API DTOs.

### Phase 2: Data Layer & State Management
* Implement the Repository to fetch data from PokéAPI.
* Create the "Mappers" to transform API data into Domain Entities.
* Set up the **Zustand** store for global state.

### Phase 3: UI & User Experience
* Build the `PokemonCard` and `PokemonGrid` components.
* Implement the **Infinite Scroll**.
* Create the Search Bar and Type Filter logic.
* Apply the Design System (colors and typography).

### Phase 4: Details & Polish
* Create the Detail View to show stats and abilities.
* Add loading states (Skeletons) and error messages.
* Perform final tests for responsiveness on mobile devices.
* Deploy the application.

---

## 11. Success Criteria (Definition of Done)

The project will be considered complete and successful when the following criteria are met:

### 11.1 Functional Completion
* [ ] The app loads the first 30 Pokemon correctly on start.
* [ ] Infinite Scroll works smoothly, loading 30 new Pokemon when the user reaches the bottom.
* [ ] The Search Bar filters the list by name in real time.
* [ ] Filtering by "Type" displays the correct Pokemon and updates the list.
* [ ] Clicking a Pokemon card opens a view with accurate Stats and Abilities.

### 11.2 Technical Quality
* [ ] Code follows **Clean Architecture** (Separation of Data, Domain, and UI).
* [ ] All data structures are correctly typed with **TypeScript**.
* [ ] State management is handled entirely by **Zustand**.
* [ ] There are no console errors or memory leaks during navigation.

### 11.3 Performance & UI
* [ ] Images use lazy loading and do not slow down the scroll.
* [ ] The layout is responsive and looks good on both mobile and desktop.
* [ ] Loading states (Skeletons) are visible during API calls.

### 11.4 Documentation
* [ ] The `README.md` includes instructions on how to install and run the project.
* [ ] The final `PRD.md` is complete and reflects the actual implementation.

---