import { NewMapProperty } from "../types/MapTypes";
// Create a union type of all valid property keys for validation

export interface IMapData {
  name: string;
  type: "Control" | "Escort" | "Hybrid" | "Push" | "Flashpoint" | "Clash"; // Map type
  properties: NewMapProperty[]; // Can include any number of properties from our list
}

export const maps: IMapData[] = [
  //DONE
  {
    name: "Antarctic Peninsula",
    type: "Control",
    properties: [
      "Choke-Heavy Maps",
      "Flank Routes",
      "Close-Quarters Combat",
      "Open Skybox",
      "Vertical Engagements",
      "Flank Routes",
      "Flank Routes",
      "Open Skybox",
      "High Mobility Paths",
      "Choke-Heavy Maps",
      "Close-Quarters Combat",
    ],
  },
  //DONE
  {
    name: "Busan",
    type: "Control",
    properties: [
      "Open Skybox",
      "High Mobility Paths",
      "Choke-Heavy Maps",
      "Flank Routes",
      "Environmental Hazards",
      "Open Skybox",
      "High Mobility Paths",
      "Open Skybox",
      "High Mobility Paths",
      "Close-Quarters Combat",
      "Enclosed Spaces",
      "Flank Routes",
      "High Mobility Paths",
      "Flank Routes",
      "Close-Quarters Combat",
    ],
  },
  //DONE
  {
    name: "Ilios",
    type: "Control",
    properties: [
      "High Mobility Paths",
      "Open Skybox",
      "Environmental Hazards",
      "Close-Quarters Combat",

      "Vertical Engagements",
      "Long Sightlines",
      "Open Skybox",
      "Flank Routes",
      "Environmental Hazards",
      "Choke-Heavy Maps",
      "Open Skybox",
      "Environmental Hazards",
      "Choke-Heavy Maps",
      "Long Sightlines",
    ],
  },
  // DONE
  {
    name: "Lijiang Tower",
    type: "Control",
    properties: [
      "Enclosed Spaces",
      "Long Sightlines",
      "Choke-Heavy Maps",
      "Flank Routes",
      "High Mobility Paths",
      "Environmental Hazards",
      "Flank Routes",
      "Open Skybox",
      "Enclosed Spaces",
      "Choke-Heavy Maps",
      "Close-Quarters Combat",

      "Flank Routes",
      "Enclosed Spaces",
      "Choke-Heavy Maps",
    ],
  },
  // DONE
  {
    name: "Nepal",
    type: "Control",
    properties: [
      "Environmental Hazards",
      "Choke-Heavy Maps",
      "Close-Quarters Combat",

      "Enclosed Spaces",
      "Choke-Heavy Maps",
      "Open Skybox",
      "Vertical Engagements",
      "Enclosed Spaces",
      "Choke-Heavy Maps",
      "Close-Quarters Combat",

      "Long Sightlines",
      "Open Skybox",
    ],
  },
  // DONE
  {
    name: "Samoa",
    type: "Control",
    properties: [
      "Choke-Heavy Maps",
      "Vertical Engagements",
      "Flank Routes",
      "Open Skybox",
      "Open Skybox",
      "Vertical Engagements",
      "Flank Routes",
      "Environmental Hazards",
      "Flank Routes",
      "Open Skybox",
    ],
  },
  // DONE
  {
    name: "Oasis",
    type: "Control",
    properties: [
      "Open Skybox", // Some areas allow for aerial play and vertical movement.
      "Vertical Engagements",
      "Choke-Heavy Maps", // Some entrances to objectives have constrained pathways.
      "Flank Routes", // The city layout and multiple buildings provide various flanking options.
      "Vertical Engagements",
      "Flank Routes",
      "Open Skybox",
      "Enclosed Spaces",
      "Environmental Hazards",
      "Enclosed Spaces",
      "Close-Quarters Combat",

      "Choke-Heavy Maps",
    ],
  },
  // DONE
  {
    name: "Circuit Royal",
    type: "Escort",
    properties: [
      "Long Sightlines", // The long, open streets favor snipers and poke heroes.
      "Open Skybox",
      "High Mobility Paths",
      "Long Sightlines", // The long, open streets favor snipers and poke heroes.
      "Vertical Engagements",
      "Open Skybox",
      "High Mobility Paths",
      "Enclosed Spaces",
      "Long Sightlines",
      "Choke-Heavy Maps", // Several narrow bends make for difficult engagements.
    ],
  },
  // DONE
  {
    name: "Dorado",
    type: "Escort",
    properties: [
      "Open Skybox",
      "Vertical Engagements",
      "Flank Routes",
      "Long Sightlines",
      "Vertical Engagements",
      "High Mobility Paths",
      "Open Skybox",
      "High Mobility Paths",
      "Vertical Engagements",
      "Enclosed Spaces",
      "Flank Routes",
    ],
  },
  {
    //DONE
    name: "Havana",
    type: "Escort",
    properties: [
      "Long Sightlines", // The map features open streets that favor snipers.
      "High Mobility Paths", // The rooftops provide strong defensive positions
      "Open Skybox", // The open areas allow for aerial play.
      "Flank Routes",
      "Choke-Heavy Maps", // Some sections have difficult chokes to push through.
      "Enclosed Spaces", // The final section is a tight, enclosed area.
      "Vertical Engagements",
      "Long Sightlines",
      "Flank Routes", // Various alleyways allow for alternative approaches.
      "Long Sightlines",
      "Open Skybox", // The open areas allow for aerial play.
      "Environmental Hazards",
      "High Mobility Paths",
    ],
  },
  // DONE
  {
    name: "Junkertown",
    type: "Escort",
    properties: [
      "Open Skybox", // The wide-open areas allow for aerial play.
      "Long Sightlines", // Some sections favor long-range engagements.
      "Long Sightlines", // Some sections favor long-range engagements.
      "High Mobility Paths", // The rooftops provide strong defensive positions
      "Vertical Engagements",
      "Long Sightlines",
      "Enclosed Spaces",
      "Flank Routes",
      "Long Sightlines",
      "High Mobility Paths",
    ],
  },
  // DONE
  {
    name: "Rialto",
    type: "Escort",
    properties: [
      "Open Skybox",
      "Environmental Hazards",
      "High Mobility Paths",
      "Long Sightlines",
      "Long Sightlines",
      "Open Skybox",
      "High Mobility Paths",
      "Environmental Hazards",
      "Enclosed Spaces",
      "Open Skybox",
      "Long Sightlines",
      "Long Sightlines", // The canal sections create good angles for snipers.
      "Choke-Heavy Maps", // Some streets and bridge areas force close engagements.
      "High Mobility Paths",
      "Flank Routes",
      "Close-Quarters Combat",
      "Enclosed Spaces",
    ],
  },
  {
    name: "Route 66",
    type: "Escort",
    properties: [
      "High Mobility Paths", // The gas station and final section offer key elevated positions.
      "Open Skybox", // The outdoor sections allow for aerial play.
      "Flank Routes", // Various side routes offer alternative attack paths.
      "Long Sightlines", // The long stretches between points favor poke and sniper heroes.
      "Vertical Engagements", // The gas station and final section offer key elevated positions.
      "Long Sightlines", // The long stretches between points favor poke and sniper heroes.
      "Vertical Engagements", // The gas station and final section offer key elevated positions.
      "Long Sightlines",
      "Flank Routes",
      "Choke-Heavy Maps", // Some areas force engagements through narrow pathways.
      "Close-Quarters Combat",
      "Flank Routes",
      "Vertical Engagements", // The gas station and final section offer key elevated positions.
      "Long Sightlines",
    ],
  },
  {
    name: "Shambali Monastery",
    type: "Escort",
    properties: [
      "Long Sightlines", // Open areas allow for long-range fights.
      "High Mobility Paths", // The elevation changes enable aerial play.
      "Open Skybox", // The map allows for aerial movement.
      "Flank Routes",
      "Long Sightlines",
      "High Mobility Paths",
      "Long Sightlines",
      "Vertical Engagements",
      "Open Skybox",
      "Long Sightlines",
      "Choke-Heavy Maps", // Some pathways force close-quarters engagements.
      "Vertical Engagements",
      "Long Sightlines",
      "High Mobility Paths",
      "Enclosed Spaces",
    ],
  },
  {
    name: "Watchpoint: Gibraltar",
    type: "Escort",
    properties: [
      "High Mobility Paths", // The map's structure heavily favors high ground dominance.
      "Open Skybox", // The map allows for extensive aerial movement.
      "Long Sightlines", // Some stretches favor poke and sniper play.
      "Vertical Engagements", // The map's structure heavily favors high ground dominance.
      "Vertical Engagements", // The map's structure heavily favors high ground dominance.
      "Long Sightlines", // Some stretches favor poke and sniper play.
      "Flank Routes", // Pathways through buildings and side routes allow for repositioning.
      "Choke-Heavy Maps", // Some areas force engagements through narrow pathways.
      "Open Skybox", // The map allows for extensive aerial movement.
      "Long Sightlines", // Some stretches favor poke and sniper play.
      "High Mobility Paths", // The map's structure heavily favors high ground dominance.
    ],
  },
  {
    name: "New Junk City",
    type: "Flashpoint",
    properties: [
      "High Mobility Paths", // Elevated walkways and rooftops provide strategic advantages.
      "Flank Routes", // Numerous side paths allow for flanking opportunities.
      "Enclosed Spaces", // Some control points are within tight, enclosed buildings.
      "Choke-Heavy Maps", // Some narrow corridors and doorways force close-range combat.
      "High Mobility Paths", // Elevated walkways and rooftops provide strategic advantages.
      "Flank Routes", // Numerous side paths allow for flanking opportunities.
      "Enclosed Spaces", // Some control points are within tight, enclosed buildings.
      "Choke-Heavy Maps", // Some narrow corridors and doorways force close-range combat.
      "Open Skybox", // Some areas allow for aerial movement.
      "Long Sightlines", // Some areas provide strong long-range engagement opportunities.
      "Open Skybox", // Some areas allow for aerial movement.
      "Long Sightlines", // Some areas provide strong long-range engagement opportunities.
    ],
  },
  {
    name: "Suravasa",
    type: "Flashpoint",
    properties: [
      "Flank Routes", // Pathways around buildings provide various flanking opportunities.
      "High Mobility Paths", // Elevation shifts create opportunities for high-ground play.
      "Enclosed Spaces", // Some control points and areas are inside buildings.
      "Long Sightlines", // Certain areas provide strong long-range engagement opportunities.
      "Choke-Heavy Maps", // Some pathways force teams through narrow entrances.
      "Open Skybox", // Some areas allow for aerial movement.
      "Vertical Engagements", // Elevation shifts create opportunities for high-ground play.
      "Flank Routes", // Pathways around buildings provide various flanking opportunities.
      "Open Skybox", // Some areas allow for aerial movement.
      "Flank Routes", // Pathways around buildings provide various flanking opportunities.
      "Long Sightlines", // Certain areas provide strong long-range engagement opportunities.
    ],
  },
  {
    name: "Blizzard World",
    type: "Hybrid",
    properties: [
      "Open Skybox", // Certain sections allow for aerial movement.
      "High Mobility Paths", // Key fights take place at different elevations.
      "Flank Routes", // Various pathways offer alternative attack angles.
      "Choke-Heavy Maps", // The first choke before Point A is a strong defensive hold.
      "Long Sightlines", // Some areas, like Main Street and after Point A, offer strong sightlines.
      "Environmental Hazards",
      "Vertical Engagements",
      "Open Skybox",
      "Flank Routes",
      "Choke-Heavy Maps",
      "Long Sightlines",
      "High Mobility Paths",
      "Close-Quarters Combat",
    ],
  },
  {
    name: "Eichenwalde",
    type: "Hybrid",
    properties: [
      "Choke-Heavy Maps", // The initial gate and castle entrance are hard to push through.
      "Open Skybox", // Some areas allow for aerial movement.
      "Long Sightlines", // The streets and castle provide long-range opportunities.
      "Choke-Heavy Maps", // The initial gate and castle entrance are hard to push through.
      "Vertical Engagements", // The castle's multiple levels create strong vertical play.
      "Flank Routes", // Several side paths allow alternative approaches.
      "Open Skybox", // Some areas allow for aerial movement.
      "Long Sightlines", // The streets and castle provide long-range opportunities.
      "Environmental Hazards",
      "High Mobility Paths",
      "Enclosed Spaces",
      "Long Sightlines",
      "Flank Routes",
      "Close-Quarters Combat",
    ],
  },
  {
    name: "Hollywood",
    type: "Hybrid",
    properties: [
      "High Mobility Paths", // Many rooftops and balconies offer strong positioning.
      "Flank Routes", // Studio buildings provide many attack paths.
      "Choke-Heavy Maps", // The first point entrance is heavily defensible.
      "Long Sightlines", // Open areas between sets create sniper-friendly zones.
      "Vertical Engagements",
      "Long Sightlines",
      "Flank Routes",
      "Enclosed Spaces",
      "Choke-Heavy Maps",
      "Long Sightlines",
      "Close-Quarters Combat",
    ],
  },
  //DONE
  {
    name: "King’s Row",
    type: "Hybrid",
    properties: [
      "Choke-Heavy Maps", // The first point archway is a notorious choke.
      "Long Sightlines", // Some streets allow for extended poke battles.
      "Vertical Engagements", // The rooftops provide strong defensive positions
      "Flank Routes", // The alleyways and side streets allow for sneaky plays.
      "Open Skybox", // Some areas allow for aerial movement.
      "Long Sightlines",
      "Choke-Heavy Maps",
      "Flank Routes",
      "Choke-Heavy Maps",
      "Long Sightlines",
      "Enclosed Spaces",
      "Environmental Hazards",
      "Close-Quarters Combat",
    ],
  },
  {
    name: "Midtown",
    type: "Hybrid",
    properties: [
      "Flank Routes", // Several side alleys and underground paths exist.
      "Choke-Heavy Maps", // The first point entrance is difficult to break.
      "Long Sightlines",
      "Open Skybox",
      "High Mobility Paths",
      "Open Skybox",
      "Long Sightlines",
      "Flank Routes",
      "Vertical Engagements",
      "Long Sightlines",
      "Choke-Heavy Maps",
      "Long Sightlines", // The streets provide long-range engagement opportunities.
      "Close-Quarters Combat",
    ],
  },
  {
    name: "Numbani",
    type: "Hybrid",
    properties: [
      "Flank Routes", // Various elevated paths give attackers options.
      "Open Skybox", // Allows for aerial heroes to thrive.
      "High Mobility Paths", // Several sections encourage vertical play.
      "Choke-Heavy Maps", // The first point entrance is a major defensive hold.
      "Long Sightlines", // Some streets provide strong poke opportunities.
      "Vertical Engagements",
      "Long Sightlines",
      "Vertical Engagements",
      "Flank Routes",
      "Open Skybox",
      "Long Sightlines",
      "Open Skybox",
      "Vertical Engagements",
    ],
  },
  {
    name: "Paraíso",
    type: "Hybrid",
    properties: [
      "Choke-Heavy Maps", // The first point entrance is narrow and defensible.
      "Vertical Engagements", // The rooftops provide strong defensive positions
      "Open Skybox", // Some areas allow for aerial movement.
      "Long Sightlines", // The streets and buildings offer long-range engagements.
      "Open Skybox",
      "Vertical Engagements",
      "High Mobility Paths",
      "Flank Routes",
      "Long Sightlines",
      "Choke-Heavy Maps",
      "Vertical Engagements",
      "Choke-Heavy Maps",
      "Vertical Engagements",
      "Flank Routes",
      "Long Sightlines",
      "Enclosed Spaces",
      "High Mobility Paths",
    ],
  },
  {
    name: "Colosseo",
    type: "Push",
    properties: [
      "High Mobility Paths", // The bridges and elevated walkways provide strategic advantages.
      "Choke-Heavy Maps", // Certain pathways force engagements through narrow spaces.
      "Flank Routes", // Many side paths and buildings allow for creative rotations.
      "Long Sightlines", // Open streets provide good positions for poke and snipers.
      "High Mobility Paths", // The bridges and elevated walkways provide strategic advantages.
      "Choke-Heavy Maps", // Certain pathways force engagements through narrow spaces.
      "Flank Routes", // Many side paths and buildings allow for creative rotations.
      "Long Sightlines", // Open streets provide good positions for poke and snipers.
      "Close-Quarters Combat",
      "Enclosed Spaces",
    ],
  },
  {
    name: "Esperança",
    type: "Push",
    properties: [
      "High Mobility Paths", // The bridges and elevated walkways provide strategic advantages.
      "Choke-Heavy Maps", // Certain pathways force engagements through narrow spaces.
      "Flank Routes", // Many side paths and buildings allow for creative rotations.
      "Long Sightlines", // Open streets provide good positions for poke and snipers.
      "High Mobility Paths", // The bridges and elevated walkways provide strategic advantages.
      "Choke-Heavy Maps", // Certain pathways force engagements through narrow spaces.
      "Flank Routes", // Many side paths and buildings allow for creative rotations.
      "Long Sightlines", // Open streets provide good positions for poke and snipers.
      "Close-Quarters Combat",
      "Enclosed Spaces",
    ],
  },
  {
    name: "New Queen Street",
    type: "Push",
    properties: [
      "High Mobility Paths", // The bridges and elevated walkways provide strategic advantages.
      "Choke-Heavy Maps", // Certain pathways force engagements through narrow spaces.
      "Flank Routes", // Many side paths and buildings allow for creative rotations.
      "Long Sightlines", // Open streets provide good positions for poke and snipers.
      "Vertical Engagements",
      "High Mobility Paths", // The bridges and elevated walkways provide strategic advantages.
      "Choke-Heavy Maps", // Certain pathways force engagements through narrow spaces.
      "Flank Routes", // Many side paths and buildings allow for creative rotations.
      "Long Sightlines", // Open streets provide good positions for poke and snipers.
      "Close-Quarters Combat",
      "Enclosed Spaces",
    ],
  },
  {
    name: "Runasapi",
    type: "Push",
    properties: [
      "High Mobility Paths", // The bridges and elevated walkways provide strategic advantages.
      "Choke-Heavy Maps", // Certain pathways force engagements through narrow spaces.
      "Flank Routes", // Many side paths and buildings allow for creative rotations.
      "Long Sightlines", // Open streets provide good positions for poke and snipers.
      "Vertical Engagements",
      "Flank Routes",
      "Vertical Engagements",
      "High Mobility Paths", // The bridges and elevated walkways provide strategic advantages.
      "Choke-Heavy Maps", // Certain pathways force engagements through narrow spaces.
      "Flank Routes", // Many side paths and buildings allow for creative rotations.
      "Long Sightlines", // Open streets provide good positions for poke and snipers.
      "Close-Quarters Combat",
      "Enclosed Spaces",
    ],
  },
  {
    name: "Hanaoka",
    type: "Clash",
    properties: [
      "Choke-Heavy Maps", // Natural bottlenecks around objectives create close fights.
      "Flank Routes", // Many side paths enable strong flanking opportunities.
      "Enclosed Spaces", // Interior spaces and narrow roads force tight combat.
      "Close-Quarters Combat",
      "Choke-Heavy Maps", // Natural bottlenecks around objectives create close fights.
      "Flank Routes", // Many side paths enable strong flanking opportunities.
      "Enclosed Spaces", // Interior spaces and narrow roads force tight combat.
      "Close-Quarters Combat",
      "Open Skybox",
      "Vertical Engagements",
      "Long Sightlines",
    ],
  },
  {
    name: "Throne of Anubis",
    type: "Clash",
    properties: [
      "Choke-Heavy Maps", // Natural bottlenecks around objectives create close fights.
      "Flank Routes", // Many side paths enable strong flanking opportunities.
      "Enclosed Spaces", // Interior spaces and narrow roads force tight combat.
      "Close-Quarters Combat",
      "Choke-Heavy Maps", // Natural bottlenecks around objectives create close fights.
      "Environmental Hazards",
      "Flank Routes", // Many side paths enable strong flanking opportunities.
      "Enclosed Spaces", // Interior spaces and narrow roads force tight combat.
      "Close-Quarters Combat",
      "Open Skybox",
      "Vertical Engagements",
      "Vertical Engagements",
    ],
  },
];
