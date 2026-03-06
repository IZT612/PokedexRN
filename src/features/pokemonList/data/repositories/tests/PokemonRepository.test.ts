import { PokemonRepository } from '../PokemonRepository';

describe('PokemonRepository - E2E test', () => {
  const repository = new PokemonRepository();

  it('Should fetch a list of Pokemon', async () => {
    const result = await repository.getPokemonList(30, 0);

    expect(result.results.length).toBe(30);
    expect(typeof result.results[0].name).toBe('string');
    expect(typeof result.results[0].url).toBe('string');
  });

  it('Should fetch a list of Pokemon types', async () => {
    const types = await repository.getPokemonTypes();

    // There are currently 18 Pokemon types, but we check if it's equal to 18 or greater than 18, because in the future if they add more
    // types we don't want this test to fail
    expect(types.length).toBeGreaterThan(18);

    // We check if the types array contains all the currently known Pokemon types
    expect(types).toContain('normal');
    expect(types).toContain('fighting');
    expect(types).toContain('flying');
    expect(types).toContain('poison');
    expect(types).toContain('ground');
    expect(types).toContain('rock');
    expect(types).toContain('bug');
    expect(types).toContain('ghost');
    expect(types).toContain('steel');
    expect(types).toContain('fire');
    expect(types).toContain('water');
    expect(types).toContain('grass');
    expect(types).toContain('electric');
    expect(types).toContain('psychic');
    expect(types).toContain('ice');
    expect(types).toContain('dragon');
    expect(types).toContain('dark');
    expect(types).toContain('fairy');
  });
});
