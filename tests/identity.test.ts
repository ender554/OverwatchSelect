import { initializeTeam, addHeroToTeam } from "../src/utils/identity";
import { HeroIdentity } from "../src/types";

const testHero: HeroIdentity = {
  id: "testHero",
  name: "Test Hero",
  role: "dps",
  tempo: "fast",
  playstyle: {
    primary: "dive",
    subtypes: ["flank", "disrupt"],
  },
  formation: "split",
  pressure: "burst",
  winCondition: "mid-fight",
  provides: ["engage-initiation", "flank-presence"],
  needs: ["burst-healing", "follow-up"],
  dislikes: ["poke-heavy", "slow tempo"],
  mapSensitivity: "medium",
  mapPreferences: {
    favors: ["flank-heavy"],
    avoids: ["long-sightlines"],
  },
};

describe("addHeroToTeam", () => {
  it("should set the team identity to match the hero's identity when the team is empty", () => {
    const team = initializeTeam();
    const updatedTeam = addHeroToTeam(team, testHero);

    expect(updatedTeam.tempo).toBe(testHero.tempo);
    expect(updatedTeam.playstyle.primary).toBe(testHero.playstyle.primary);
    expect(updatedTeam.formation).toBe(testHero.formation);
    expect(updatedTeam.pressure).toContain(testHero.pressure);
    expect(updatedTeam.winCondition).toBe(testHero.winCondition);

    expect(updatedTeam.accumulatedProvides).toEqual(
      expect.arrayContaining(testHero.provides)
    );
    expect(updatedTeam.unmetNeeds).toEqual(
      expect.arrayContaining(testHero.needs)
    );
    expect(updatedTeam.dislikes).toEqual(
      expect.arrayContaining(testHero.dislikes)
    );
    expect(updatedTeam.currentHeroes.length).toBe(1);
    expect(updatedTeam.currentHeroes[0].id).toBe(testHero.id);
  });
});
