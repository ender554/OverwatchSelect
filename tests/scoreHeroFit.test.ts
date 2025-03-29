import {
  initializeTeam,
  addHeroToTeam,
  scoreHeroFit,
  getHeroFits,
  filterAvailableHeroes,
  generateFitEvaluations,
} from "../src/utils/identity";
import { HeroIdentity, TeamIdentity } from "../src/types";

const identityDisruptor: HeroIdentity = {
  id: "weirdman",
  name: "Weirdman",
  role: "support",
  tempo: "slow", // clash
  playstyle: { primary: "poke", subtypes: [] }, // clash
  formation: "tight", // clash
  pressure: "poke",
  winCondition: "attrition",
  provides: ["zone-control"],
  needs: ["shielding"],
  dislikes: ["fast", "split", "mid-fight"],
};

const teamWithBall = addHeroToTeam(initializeTeam(), {
  id: "wreckingball",
  name: "Wrecking Ball",
  role: "tank",
  tempo: "fast",
  playstyle: { primary: "dive", subtypes: ["flank", "disrupt"] },
  formation: "split",
  pressure: "disruption",
  winCondition: "mid-fight",
  provides: ["disruption", "engage-initiation", "space-creation"],
  needs: ["follow-up", "flank-pressure"],
  dislikes: ["poke-heavy", "slow comps"],
});

const tracer: HeroIdentity = {
  id: "tracer",
  name: "Tracer",
  role: "dps",
  tempo: "fast",
  playstyle: { primary: "dive", subtypes: ["flank"] },
  formation: "split",
  pressure: "burst",
  winCondition: "mid-fight",
  provides: ["flank-pressure", "follow-up", "burst-threat"],
  needs: ["engage-window", "support-cover"],
  dislikes: ["barriers", "AoE spam"],
};

const bastion: HeroIdentity = {
  id: "bastion",
  name: "Bastion",
  role: "dps",
  tempo: "slow",
  playstyle: { primary: "poke", subtypes: ["anchor"] },
  formation: "tight",
  pressure: "poke",
  winCondition: "attrition",
  provides: ["poke-damage", "zone-control"],
  needs: ["shielding", "setup-time"],
  dislikes: ["flank-heavy", "split comps"],
};

const sombraClone: HeroIdentity = {
  id: "sombra-clone",
  name: "SombraClone",
  role: "dps",
  tempo: "fast",
  playstyle: { primary: "dive", subtypes: ["flank", "disrupt"] },
  formation: "split",
  pressure: "disruption",
  winCondition: "mid-fight",
  provides: ["support-cover", "flank-pressure", "disruption"],
  needs: ["engage-initiation"],
  dislikes: ["slow comps", "anchor setups"],
};

const ball: HeroIdentity = {
  id: "wreckingball",
  name: "Wrecking Ball",
  role: "tank",
  tempo: "fast",
  playstyle: { primary: "dive", subtypes: ["flank", "disrupt"] },
  formation: "split",
  pressure: "disruption",
  winCondition: "mid-fight",
  provides: ["disruption", "engage-initiation", "space-creation"],
  needs: ["follow-up", "flank-pressure"],
  dislikes: ["poke-heavy", "slow comps"],
};

const juno: HeroIdentity = {
  id: "juno",
  name: "Juno",
  role: "support",
  tempo: "fast",
  playstyle: { primary: "brawl", subtypes: ["flank", "hold"] }, // ✅ replaced 'sustain'
  formation: "split",
  pressure: "sustain",
  winCondition: "mid-fight",
  provides: ["healing-output", "support-cover", "utility-tools"],
  needs: ["frontline", "dive-partners"],
  dislikes: ["poke-heavy", "anchor comps"],
};

const illari: HeroIdentity = {
  id: "illari",
  name: "Illari",
  role: "support",
  tempo: "medium",
  playstyle: { primary: "poke", subtypes: ["hold"] }, // ✅ replaced 'sustain'
  formation: "split",
  pressure: "poke",
  winCondition: "attrition",
  provides: ["poke-damage", "sustain-healing", "range-pressure"],
  needs: ["peel", "line-of-sight"],
  dislikes: ["dive-heavy", "split comps"],
};

const sombra: HeroIdentity = {
  id: "sombra",
  name: "Sombra",
  role: "dps",
  tempo: "fast",
  playstyle: { primary: "dive", subtypes: ["flank", "disrupt"] },
  formation: "split",
  pressure: "disruption",
  winCondition: "mid-fight",
  provides: ["disruption", "support-cover", "flank-pressure"],
  needs: ["engage-initiation", "follow-up"],
  dislikes: ["tight comps", "anchor play"],
};

describe("scoreHeroFit", () => {
  it("should give a high score to a hero that fits the team’s identity and fills needs", () => {
    const result = scoreHeroFit(teamWithBall, tracer);
    expect(result.score).toBeGreaterThan(70);
    expect(result.reasons).toContain("Matches tempo");
    expect(result.reasons).toContain("Fulfills team need: follow-up");
  });

  it("should give a low score to a hero that conflicts with the team’s identity", () => {
    const result = scoreHeroFit(teamWithBall, bastion);
    expect(result.score).toBeLessThan(40);
    expect(result.reasons).toContain("Tempo mismatch");
    expect(result.reasons).toContain("Formation conflict");
  });
  it("should score heroes and allow external ranking", () => {
    const fits = getHeroFits(teamWithBall, [tracer, bastion]);

    expect(fits.length).toBe(2);

    const [first, second] = fits.sort((a, b) => b.score - a.score);

    expect(first.hero.id).toBe("tracer");
    expect(second.hero.id).toBe("bastion");
    expect(first.score).toBeGreaterThan(second.score);
  });
  it("should adjust team identity with multiple heroes and impact third hero scoring", () => {
    // Add Wrecking Ball → then Tracer
    const teamWithBallAndTracer = addHeroToTeam(teamWithBall, tracer);

    // Now score Bastion against this new 2-hero team
    const result = scoreHeroFit(teamWithBallAndTracer, bastion);

    // Bastion should still be low, but slightly different if identity shifts
    expect(result.score).toBeLessThan(40);
    expect(result.reasons).toContain("Tempo mismatch");
  });
  it("should give a high score to a third hero that fits an existing dive team", () => {
    const teamWithBallAndTracer = addHeroToTeam(teamWithBall, tracer);

    const result = scoreHeroFit(teamWithBallAndTracer, sombraClone);

    expect(result.score).toBeGreaterThan(70);
    expect(result.reasons).toContain("Matches tempo");
    expect(result.reasons).toContain("Matches playstyle");
    expect(result.reasons).toContain("Fulfills team need: support-cover");
  });
  it("should exclude already-added heroes from fit suggestions", () => {
    const team = addHeroToTeam(initializeTeam(), tracer);

    const allHeroes = [tracer, bastion];
    const available = filterAvailableHeroes(team, allHeroes);

    expect(available.map((h) => h.id)).not.toContain("tracer");
    expect(available.map((h) => h.id)).toContain("bastion");

    const fits = getHeroFits(team, available);
    expect(fits.every((fit) => fit.hero.id !== "tracer")).toBe(true);
  });
  it("should generate a full set of slot-based evaluations for a candidate", () => {
    const team: TeamIdentity = {
      ...initializeTeam(),
      currentHeroes: [ball, tracer, null, juno, illari, null],
    };

    const results = generateFitEvaluations(team, [sombra]);

    const evaluator = results[0];
    expect(evaluator.hero.id).toBe("sombra");

    // 2 open slots → addScore should be defined
    expect(evaluator.addScore).toBeGreaterThan(0);

    // 6 replaceScores (including null slots)
    expect(evaluator.replaceScores.length).toBe(6);

    for (let i = 0; i < 6; i++) {
      const slot = evaluator.replaceScores.find((r) => r.slotIndex === i);
      expect(slot).toBeDefined();
      expect(slot?.slotIndex).toBe(i);
      expect(typeof slot?.score).toBe("number");
      expect(Array.isArray(slot?.reasons)).toBe(true);
    }
  });
  it("should ensure empty slot scores match addScore", () => {
    const team: TeamIdentity = {
      ...initializeTeam(),
      currentHeroes: [ball, tracer, null, juno, illari, null],
    };

    const [evaluation] = generateFitEvaluations(team, [sombra]);

    // Ensure addScore is calculated
    expect(evaluation.addScore).toBeGreaterThan(0);

    // Check each empty slot (slots 2 and 5 in this case)
    const emptySlots = [2, 5];

    for (const slotIndex of emptySlots) {
      const slot = evaluation.replaceScores.find(
        (r) => r.slotIndex === slotIndex
      );
      expect(slot).toBeDefined();
      expect(slot!.score).toBe(evaluation.addScore);
    }
  });
  it("should not evaluate heroes already in the team", () => {
    const team: TeamIdentity = {
      ...initializeTeam(),
      currentHeroes: [ball, tracer, null, juno, illari, null],
    };

    // Try to evaluate 'tracer', which is already in the team
    const results = generateFitEvaluations(team, [tracer, sombra]);

    // Should only return evaluations for heroes NOT already in the team
    const ids = results.map((r) => r.hero.id);
    expect(ids).not.toContain("tracer");
    expect(ids).toContain("sombra");
  });
  it("should change slot-specific score when team identity changes", () => {
    const teamBase: TeamIdentity = {
      ...initializeTeam(),
      currentHeroes: [ball, null, null, juno, illari, sombra],
    };

    const resultsWithTracerInSlot2 = generateFitEvaluations(teamBase, [tracer]);
    const slot2TracerScore = resultsWithTracerInSlot2[0].replaceScores.find(
      (r) => r.slotIndex === 2
    )!.score;

    const teamWithDisruptor = {
      ...teamBase,
      currentHeroes: [identityDisruptor, null, null, juno, illari, sombra],
    };

    const resultsWithBastion = generateFitEvaluations(teamWithDisruptor, [
      tracer,
    ]);
    const slot2TracerScoreWithDisruptor =
      resultsWithBastion[0].replaceScores.find((r) => r.slotIndex === 2)!.score;

    expect(slot2TracerScore).not.toBe(slot2TracerScoreWithDisruptor);
  });
});
