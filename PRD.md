# PRD: React Native Pokedex

## 1. Executive Summary

**Project Description:** A web application for querying *Pokemon* data. The application will function as a *Pokedex* that uses the **PokeAPI** to display detailed information about each *Pokemon*.

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
* **Responsive Design:** The interface must adapt correctly to mobile devices, tablets, and desktop screens.
* **Visual Feedback:** Loading *Skeletons* must be shown while the next 30 Pokémon are being fetched through Infinite Scroll.
* Proper color contrast must be used (especially for the "Type" labels).

### 4.3 Maintainability and Technical Quality
* **Error Handling:** The application must handle error states (e.g., "*Pokémon* not found" or "API connection error") by showing notifications.
* **Data Consistency:** If the user filters by type and then scrolls, the *Infinite Scroll* must respect the active filter and load the next 30 Pokémon of that specific type, or apply the filter to the local data set.