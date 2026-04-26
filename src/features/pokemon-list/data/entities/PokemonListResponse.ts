export interface PokemonListItemResponse {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  limit: number;
  offset: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItemResponse[];
}
