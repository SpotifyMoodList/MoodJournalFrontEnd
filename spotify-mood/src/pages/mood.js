//make basic mood page

import React from "react";

const Mood = () => {
  const songs = JSON.parse(localStorage.getItem("songs"));
  console.log(songs);
  console.log(songs[0].energy);

  function calculateMoodFromSpotifyFeatures(featuresArray) {
    if (featuresArray.length === 0) {
      return "No Data"; // Handle empty array case
    }

    let aggregate = { valence: 0, energy: 0 };

    featuresArray.forEach((features) => {
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
        return "Energetic";
      } else if (averages.energy < 0.33) {
        return "Relaxed";
      } else {
        return "Happy";
      }
    } else if (averages.valence >= 0.33) {
      // Medium valence
      if (averages.energy >= 0.33) {
        return "Pleasant";
      } else {
        return "Calm"; // Medium valence but low energy
      }
    } else {
      // Low valence
      if (averages.energy >= 0.66) {
        return "Angry";
      } else {
        return "Sad";
      }
    }
  }
  //   function calculateMoodFromSpotifyFeatures(featuresArray) {
  //   if (featuresArray.length === 0) {
  //     return 'No Data'; // Handle empty array case
  //   }

  //   // Categorize each feature into 'High', 'Medium', or 'Low'
  //   const valenceCategories = featuresArray.map(features => {
  //     if (features.valence >= 0.66) return 'High';
  //     else if (features.valence >= 0.33) return 'Medium';
  //     else return 'Low';
  //   });

  //   const energyCategories = featuresArray.map(features => {
  //     if (features.energy >= 0.66) return 'High';
  //     else if (features.energy >= 0.33) return 'Medium';
  //     else return 'Low';
  //   });

  //   // Combine categories into a single array to calculate the mode
  //   const combinedCategories = valenceCategories.concat(energyCategories);

  //   // Calculate the mode of the combined categories
  //   const modeCategory = calculateMode(combinedCategories);

  //   // Determine mood based on the mode of valence and energy categories
  //   switch (modeCategory) {
  //     case 'High':
  //       return 'Energetic/Happy';
  //     case 'Medium':
  //       return 'Pleasant/Calm';
  //     case 'Low':
  //       return 'Sad/Angry';
  //     default:
  //       return 'Undefined';
  //   }
  // }

  // function calculateMode(array) {
  //   const frequency = {}; // a map to count the frequency of each category
  //   let maxFreq = 0;
  //   let mode = '';

  //   for (const item of array) {
  //     if (frequency[item]) {
  //       frequency[item]++;
  //     } else {
  //       frequency[item] = 1;
  //     }

  //     // Update mode if current item's frequency is greater than maxFreq
  //     if (frequency[item] > maxFreq) {
  //       maxFreq = frequency[item];
  //       mode = item;
  //     }
  //   }

  //   return mode;
  // }

  // function determineOverallMood(trackAnalyses) {
  //   if (trackAnalyses.length === 0) {
  //     return 'No Data';
  //   }

  //   // Initial aggregate features
  //   let aggregate = {
  //     loudness: 0,
  //     tempo: 0,
  //     mode: { major: 0, minor: 0 },
  //   };

  //   trackAnalyses.forEach(analysis => {
  //     const { loudness, tempo, mode } = analysis;
  //     aggregate.loudness += loudness;
  //     aggregate.tempo += tempo;
  //     mode === 1 ? aggregate.mode.major++ : aggregate.mode.minor++;

  //     // Optional: Advanced dynamic range calculation from segments

  //   });

  //   // Calculate averages
  //   const averages = {
  //     loudness: aggregate.loudness / trackAnalyses.length,
  //     tempo: aggregate.tempo / trackAnalyses.length,
  //     modePreference: aggregate.mode.major > aggregate.mode.minor ? 'Major' : 'Minor',
  //   };

  //   // Determine mood based on averages
  //   let mood = "Undefined";
  //   if (averages.loudness > -10 && averages.tempo > 120) {
  //     mood = averages.modePreference === 'Major' ? "Energetic/Happy" : "Tense/Angry";
  //   } else if (averages.loudness < -20 && averages.tempo < 100) {
  //     mood = averages.modePreference === 'Major' ? "Relaxed/Pleasant" : "Calm/Sad";
  //   }

  //   // Consider dynamic range for additional mood nuances
  //   // if (averages.dynamicRange > 10) {
  //   //   mood += " with Dynamic Intensity";
  //   // }

  //   return mood;
  // }

  return (
    //display the mood page with the list of songs, but check if the songs are there first
    <div>
      <h1>Your Mood</h1>
      {/* <ul>
        {songs && songs.map((song, index) => (
          <li key={index}>{song.name} by {song.artist['#text']}</li>
        ))}
      </ul> */}
      <div>
        {/* call the mood function and display the result, songs is an array of features */}
        <h2>Your mood is {calculateMoodFromSpotifyFeatures(songs)}</h2>
      </div>
    </div>
  );
};

export default Mood;
