import { tanks, damage, supports } from "./src/data/heroesUpdated";

type Hero = {
  name: string;
  role: "Tank" | "Damage" | "Support";
  drawbacks: string[];
  hates: string[];
};

function validateDrawbacksAndHates(heroes: Hero[]): void {
  console.log("✅ Running Drawback & Hate Validation...");

  const drawbacksMap = new Map<string, string[]>(); // Heroes with each drawback
  const hatesMap = new Map<string, string[]>(); // Heroes that hate each drawback

  // Populate mappings
  heroes.forEach((hero) => {
    hero.drawbacks.forEach((drawback) => {
      if (!drawbacksMap.has(drawback)) drawbacksMap.set(drawback, []);
      drawbacksMap.get(drawback)?.push(hero.name);
    });

    hero.hates.forEach((hate) => {
      if (!hatesMap.has(hate)) hatesMap.set(hate, []);
      hatesMap.get(hate)?.push(hero.name);
    });
  });

  // Find missing matches
  const unmatchedDrawbacks: string[] = [];
  const unmatchedHates: string[] = [];

  drawbacksMap.forEach((heroesWithDrawback, drawback) => {
    if (!hatesMap.has(drawback)) {
      unmatchedDrawbacks.push(drawback);
    }
  });

  hatesMap.forEach((heroesHating, hate) => {
    if (!drawbacksMap.has(hate)) {
      unmatchedHates.push(hate);
    }
  });

  // Display results
  if (unmatchedDrawbacks.length > 0) {
    console.log("❌ Drawbacks with no matching hate:", unmatchedDrawbacks);
  } else {
    console.log("✅ All drawbacks have at least one hero that hates them.");
  }

  if (unmatchedHates.length > 0) {
    console.log("❌ Hates with no matching drawback:", unmatchedHates);
  } else {
    console.log("✅ All hates correspond to an actual drawback.");
  }
}

const allHeroes: Hero[] = [...tanks, ...damage, ...supports];
validateDrawbacksAndHates(allHeroes);
