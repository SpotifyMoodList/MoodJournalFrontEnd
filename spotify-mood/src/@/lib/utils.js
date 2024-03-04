import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function calculateMoodFromSpotifyFeatures(featuresArray) {
  if (featuresArray.length === 0) {
    return 'No Data'; // Handle empty array case
  }

  let aggregate = { valence: 0, energy: 0 };

  featuresArray.forEach(features => {
    aggregate.valence += features.valence ?? 0;
    aggregate.energy += features.energy ?? 0;
  });

  const averages = {
    valence: aggregate.valence / featuresArray.length,
    energy: aggregate.energy / featuresArray.length,
  };

  console.log("Averages:", averages); // For debugging

  // Simplifying mood determination using broader thresholds
  if (averages.valence >= 0.66) {
    if (averages.energy >= 0.66) {
      return 'Energetic';
    } else if (averages.energy < 0.33) {
      return 'Relaxed';
    } else {
      return 'Happy';
    }
  } else if (averages.valence >= 0.33) { // Medium valence
    if (averages.energy >= 0.33) {
      return 'Pleasant';
    } else {
      return 'Calm'; // Medium valence but low energy
    }
  } else { // Low valence
    if (averages.energy >= 0.66) {
      return 'Angry';
    } else {
      return 'Sad';
    }
  }

}
