import { usePokemonDetailStore } from '@/app/store';
import { brandColors, pokemonTypeColors } from '@/constants/colors';
import {
  BorderRadius,
  Colors,
  Shadows,
  Sizes,
  Spacing,
  Typography,
} from '@/constants/theme';
import { Button } from '@/src/shared/ui/components/button';
import { LoadingSpinner } from '@/src/shared/ui/components/loadingSpinner';
import { Tag } from '@/src/shared/ui/components/tag';
import { Activity, Ruler, Scale, Sparkles } from '@tamagui/lucide-icons';
import React, { useEffect } from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { H1, H2, H3, Paragraph, XStack, YStack } from 'tamagui';

interface DetailScreenProps {
  id: string | number;
  onBack?: () => void;
}

export const DetailScreen = ({ id, onBack }: DetailScreenProps) => {
  const { pokemonDetail, loading, error, fetchPokemonDetail } =
    usePokemonDetailStore();

  const colorScheme = useColorScheme() ?? 'light';
  const themeColors = Colors[colorScheme];

  const getStatColor = (value: number) => {
    // Changes the color of the stat bar based on the value
    if (value < 50) {
      return themeColors.error;
    } else if (value < 80) {
      return themeColors.warning;
    } else {
      return themeColors.success;
    }
  };

  useEffect(() => {
    if (id) {
      fetchPokemonDetail(id);
    }
  }, [id, fetchPokemonDetail]);

  const renderContent = () => {
    if (loading) {
      return (
        <YStack flex={1} justifyContent="center" alignItems="center">
          <LoadingSpinner />
        </YStack>
      );
    }

    if (error) {
      return (
        <YStack flex={1} justifyContent="center" alignItems="center">
          <Paragraph color={themeColors.error}>
            Failed to load Pokémon.
          </Paragraph>

          <Button title="Try again" onPress={() => fetchPokemonDetail(id)} />
        </YStack>
      );
    }

    if (!pokemonDetail) {
      return (
        <Paragraph
          fontStyle="italic"
          color={themeColors.text}
          textAlign="center"
          marginTop={Spacing.xl}
        >
          Pokemon not found.
        </Paragraph>
      );
    }

    const formattedId = `#${pokemonDetail.id.toString().padStart(3, '0')}`;
    const capitalizedName =
      pokemonDetail.name[0].toUpperCase() + pokemonDetail.name.slice(1);

    const primaryType = pokemonDetail.types[0];
    const secondaryType = pokemonDetail.types[1];

    const primaryTypeColor =
      pokemonTypeColors[primaryType] ?? themeColors.surface;

    const secondaryTypeColor = secondaryType
      ? pokemonTypeColors[secondaryType]
      : primaryTypeColor;

    const totalStats = pokemonDetail.stats.reduce(
      (acc, stat) => acc + stat.value,
      0,
    );

    // TO DO: add weight/height to Pokemon entity
    const weight = pokemonDetail.weight;
    const height = pokemonDetail.height;
    const displayWeight = weight ? `${(weight / 10).toFixed(1)} kg` : 'N/A';

    const displayHeight = height ? `${(height / 10).toFixed(1)} m` : 'N/A';

    const getStatWidth = (value: number) => {
      return `${Math.min((value / 255) * 100, 100)}%`;
    };

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack gap={Spacing.md} paddingBottom={Spacing.xl}>
          {/* Image and types */}
          <YStack
            backgroundColor={primaryTypeColor}
            borderRadius={BorderRadius.lg}
            padding={Spacing.lg}
            alignItems="center"
            borderWidth={
              pokemonDetail.types.length > 1 ? Sizes.borderWidth.thick : 0
            }
            borderColor={secondaryTypeColor}
            {...Shadows.base}
          >
            <Image
              source={{ uri: pokemonDetail.image }}
              style={{ width: 200, height: 200 }}
              resizeMode="contain"
            />

            <H2
              color={brandColors.surfaceLight}
              marginTop={Spacing.md}
              style={Shadows.text}
            >
              {capitalizedName}
            </H2>
            <Paragraph
              color={brandColors.surfaceLight}
              opacity={0.9}
              fontSize={Typography.fontSize.lg}
              fontWeight="bold"
              style={Shadows.text}
            >
              {formattedId}
            </Paragraph>

            <XStack
              flexWrap="wrap"
              justifyContent="center"
              gap={Spacing.sm}
              marginTop={Spacing.md}
            >
              {pokemonDetail.types.map((type) => (
                <Tag key={type} label={type} color={pokemonTypeColors[type]} />
              ))}
            </XStack>
          </YStack>

          {/* Weight and height */}
          <XStack gap={Spacing.md}>
            <YStack
              flex={1}
              backgroundColor={themeColors.surface}
              padding={Spacing.md}
              borderRadius={BorderRadius.md}
              alignItems="center"
              {...Shadows.base}
            >
              <Scale size={Sizes.icon.sm} color={themeColors.icon} />{' '}
              <Paragraph
                color={themeColors.icon}
                fontSize={Typography.fontSize.xs}
                marginTop={Spacing.xs}
              >
                Weight
              </Paragraph>
              <Paragraph
                color={themeColors.text}
                fontWeight="bold"
                fontSize={Typography.fontSize.lg}
              >
                {displayWeight}
              </Paragraph>
            </YStack>

            <YStack
              flex={1}
              backgroundColor={themeColors.surface}
              padding={Spacing.md}
              borderRadius={BorderRadius.md}
              alignItems="center"
              {...Shadows.base}
            >
              <Ruler size={Sizes.icon.sm} color={themeColors.icon} />{' '}
              <Paragraph
                color={themeColors.icon}
                fontSize={Typography.fontSize.xs}
                marginTop={Spacing.xs}
              >
                Height
              </Paragraph>
              <Paragraph
                color={themeColors.text}
                fontWeight="bold"
                fontSize={Typography.fontSize.lg}
              >
                {displayHeight}
              </Paragraph>
            </YStack>
          </XStack>

          {/* Abilities */}
          <YStack
            backgroundColor={themeColors.surface}
            borderRadius={BorderRadius.md}
            padding={Spacing.md}
            {...Shadows.base}
          >
            <XStack
              alignItems="center"
              gap={Spacing.sm}
              marginBottom={Spacing.sm}
            >
              <Sparkles size={Sizes.icon.sm} color={themeColors.icon} />{' '}
              <H3 color={themeColors.text}>Abilities</H3>
            </XStack>

            <XStack flexWrap="wrap" gap={Spacing.sm}>
              {pokemonDetail.abilities.map((ability) => (
                <YStack
                  key={ability}
                  backgroundColor={themeColors.background}
                  paddingHorizontal={Spacing.md}
                  paddingVertical={Spacing.xs}
                  borderRadius={BorderRadius.full}
                  borderWidth={Sizes.borderWidth.thin}
                  borderColor={themeColors.border}
                >
                  <Paragraph
                    color={themeColors.text}
                    textTransform="capitalize"
                  >
                    {ability}
                  </Paragraph>
                </YStack>
              ))}
            </XStack>
          </YStack>

          {/* Base Stats */}
          <YStack
            backgroundColor={themeColors.surface}
            borderRadius={BorderRadius.md}
            padding={Spacing.md}
            {...Shadows.base}
          >
            <XStack
              justifyContent="space-between"
              alignItems="center"
              marginBottom={Spacing.md}
            >
              <XStack alignItems="center" gap={Spacing.sm}>
                <Activity size={Sizes.icon.sm} color={themeColors.icon} />{' '}
                <H3 color={themeColors.text}>Base Stats</H3>
              </XStack>
              <Paragraph color={themeColors.icon} fontWeight="bold">
                Total: {totalStats}
              </Paragraph>
            </XStack>

            <YStack gap={Spacing.sm}>
              {pokemonDetail.stats.map((stat) => (
                <XStack key={stat.name} alignItems="center" width="100%">
                  <Paragraph
                    color={themeColors.icon}
                    flex={2}
                    textTransform="capitalize"
                  >
                    {stat.name}
                  </Paragraph>
                  <Paragraph
                    color={themeColors.text}
                    fontWeight="bold"
                    flex={1}
                    textAlign="right"
                  >
                    {stat.value}
                  </Paragraph>

                  <YStack
                    flex={4}
                    height={Spacing.sm}
                    backgroundColor={themeColors.background}
                    borderRadius={BorderRadius.full}
                    marginLeft={Spacing.md}
                    overflow="hidden"
                  >
                    <YStack
                      height="100%"
                      width={getStatWidth(stat.value)}
                      backgroundColor={getStatColor(stat.value)}
                      borderRadius={BorderRadius.full}
                    />
                  </YStack>
                </XStack>
              ))}
            </YStack>
          </YStack>
        </YStack>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.background }}>
      <YStack
        flex={1}
        width="100%"
        maxWidth={1200}
        alignSelf="center"
        paddingHorizontal={Spacing.md}
      >
        <XStack
          paddingTop={
            Platform.OS === 'android' ? StatusBar.currentHeight : Spacing.lg
          }
          paddingBottom={Spacing.md}
          marginBottom={Spacing.md}
          alignItems="center"
          gap={Spacing.md}
        >
          {onBack && <Button title="<" onPress={onBack} />}
          <H1 color={themeColors.text} flex={1}>
            Details
          </H1>
        </XStack>

        <YStack flex={1}>{renderContent()}</YStack>
      </YStack>
    </SafeAreaView>
  );
};
