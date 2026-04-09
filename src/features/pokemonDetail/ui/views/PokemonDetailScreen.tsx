import { usePokemonDetailStore } from '@/app/store';
import React, { useEffect } from 'react';
import { PokemonDetailView } from './PokemonDetailView';

interface PokemonDetailScreenProps {
  id: string | number;
  onBack?: () => void;
}

const PokemonDetailScreen = ({ id, onBack }: PokemonDetailScreenProps) => {
  const { pokemonDetail, loading, error, fetchPokemonDetail } =
    usePokemonDetailStore();

  useEffect(() => {
    if (id) {
      fetchPokemonDetail(id);
    }
  }, [id, fetchPokemonDetail]);

  return (
    <PokemonDetailView
      pokemonDetail={pokemonDetail}
      loading={loading}
      error={error}
      onRetry={() => fetchPokemonDetail(id)}
      onBack={onBack}
    />
  );
};

export default PokemonDetailScreen;
