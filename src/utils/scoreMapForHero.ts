import { IHeroType } from "../data/heroesUpdated";
import { NewMapProperty } from "../data/types";

function scoreMapForHero(
  mapProperties: NewMapProperty[],
  hero: IHeroType & { mapLikes: NewMapProperty[]; mapHates: NewMapProperty[] }
): number {
  const weightLike = 1; // Adjust this weight if likes should count more.
  const weightHate = 1; // Adjust this weight if dislikes should count more.

  let likesCount = 0;
  let hatesCount = 0;

  // Count the likes and hates for the map's properties.
  mapProperties.forEach((property) => {
    if (hero.mapLikes.includes(property)) {
      likesCount++;
    }
    if (hero.mapHates.includes(property)) {
      hatesCount++;
    }
  });

  const totalProperties = mapProperties.length;
  if (totalProperties === 0) return 0; // Avoid division by zero

  // Calculate the normalized score: score ranges from -1 to +1.
  const normalizedScore =
    (weightLike * likesCount - weightHate * hatesCount) / totalProperties;
  return normalizedScore;
}

export default scoreMapForHero;
