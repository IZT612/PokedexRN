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