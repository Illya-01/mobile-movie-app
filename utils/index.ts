export const getGenreNames = (
  genreIds: number[],
  allGenres: Genre[]
): string[] => {
  return genreIds
    .map((id) => allGenres.find((genre) => genre.id === id)?.name)
    .filter((name): name is string => Boolean(name));
};

export const getReleaseYear = (release_date = "") => {
  if (!release_date) return "Unknown Year";

  return release_date.split("-")[0];
};

export const convertToHoursAndMinutes = (runtime: number) => {
  if (typeof runtime !== "number" || isNaN(runtime) || runtime < 0) {
    return "Unknown Runtime";
  }

  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  if (hours === 0) {
    return `${minutes}m`;
  }

  if (minutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${minutes}m`;
};

export const formatReleaseDate = (dateString = "") => {
  if (!dateString) return "Unknown Release Date";

  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatBigNums = (amount: number) => {
  if (!amount || amount <= 0) {
    return "0";
  }

  if (amount >= 1000000000) {
    // Billions
    const billions = amount / 1000000000;
    return billions % 1 === 0
      ? `${billions.toFixed(0)}B`
      : `${billions.toFixed(1)}B`;
  } else if (amount >= 1000000) {
    // Millions
    const millions = amount / 1000000;
    return millions % 1 === 0
      ? `${millions.toFixed(0)}M`
      : `${millions.toFixed(1)}M`;
  } else if (amount >= 1000) {
    // Thousands
    const thousands = amount / 1000;
    return thousands % 1 === 0
      ? `${thousands.toFixed(0)}K`
      : `${thousands.toFixed(1)}K`;
  } else {
    // Less than a thousand, show as is
    return `${amount.toLocaleString()}`;
  }
};
