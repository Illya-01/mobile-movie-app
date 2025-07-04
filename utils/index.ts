export const getGenreNames = (
  genreIds: number[],
  allGenres: Genre[]
): string[] => {
  return genreIds
    .map((id) => allGenres.find((genre) => genre.id === id)?.name)
    .filter((name): name is string => Boolean(name));
};
