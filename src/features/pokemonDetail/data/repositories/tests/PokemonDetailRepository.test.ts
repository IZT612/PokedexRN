import { PokemonDetailRepository } from '../PokemonDetailRepository';

describe('PokemonDetail: PokemonRepository - E2E test', () => {
  const repository = new PokemonDetailRepository();

  it('Should fetch the details of a Pokemon', async () => {
    const pokemon = await repository.getPokemonDetail(1);

    expect(pokemon.id).toBe(1);
    expect(pokemon.name).toBe('bulbasaur');

    expect(typeof pokemon.image).toBe('string');
    expect(pokemon.image).toContain('http');

    expect(pokemon.types).toContain('grass');
    expect(pokemon.types).toContain('poison');
    expect(pokemon.stats.length).toBeGreaterThan(0);
    expect(pokemon.abilities.length).toBeGreaterThan(0);

    expect(pokemon.stats[0]).toHaveProperty('name');
    expect(pokemon.stats[0]).toHaveProperty('value');
  });
});
