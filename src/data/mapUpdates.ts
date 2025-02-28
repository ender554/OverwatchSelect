import { NewMapProperty } from "./types";
// Create a union type of all valid property keys for validation

export interface IMapData {
  name: string;
  type: "Control" | "Escort" | "Hybrid" | "Push" | "Flashpoint" | "Clash"; // Map type
  properties: NewMapProperty[]; // Can include any number of properties from our list
}

export const maps: IMapData[] = [
  {
    name: "Antarctic Peninsula",
    type: "Control",
    properties: [
      "High Mobility Paths",
      "Choke-Heavy Maps",
      "Enclosed Spaces",
      "Flank Routes",
    ],
  },
  {
    name: "Ilios",
    type: "Control",
    properties: [
      "High Mobility Paths",
      "Open Skybox",
      "Choke-Heavy Maps",
      "Flank Routes",
      "Environmental Hazards",
      "Vertical Engagements",
      "Long Sightlines",
    ],
  },
  {
    name: "Lijiang Tower",
    type: "Control",
    properties: [
      "High Mobility Paths",
      "Enclosed Spaces",
      "Choke-Heavy Maps",
      "Flank Routes",
      "Environmental Hazards",
    ],
  },
  {
    name: "Nepal",
    type: "Control",
    properties: [
      "High Mobility Paths",
      "Long Sightlines",
      "Choke-Heavy Maps",
      "Enclosed Spaces",
      "Environmental Hazards",
    ],
  },
  {
    name: "Samoa",
    type: "Control",
    properties: [
      "High Mobility Paths",
      "Choke-Heavy Maps",
      "Enclosed Spaces",
      "Flank Routes",
      "Close-Quarters Combat",
    ],
  },
  {
    name: "Oasis",
    type: "Control",
    properties: [
      "Open Skybox", // Some areas allow for aerial play and vertical movement.
      "High Mobility Paths", // The jump pads and buildings provide strong vertical opportunities.
      "Choke-Heavy Maps", // Some entrances to objectives have constrained pathways.
      "Long Sightlines", // Certain sections favor long-range engagements.
      "Flank Routes", // The city layout and multiple buildings provide various flanking options.
      "Environmental Hazards",
    ],
  },
  {
    name: "Circuit Royal",
    type: "Escort",
    properties: [
      "High Mobility Paths", // The map features strong high ground positions, especially on defense.
      "Long Sightlines", // The long, open streets favor snipers and poke heroes.
      "Choke-Heavy Maps", // Several narrow bends make for difficult engagements.
      "Flank Routes", // Alternative routes allow for repositioning and flanks.
    ],
  },
  {
    name: "Dorado",
    type: "Escort",
    properties: [
      "High Mobility Paths", // Several areas have dominant high ground positions.
      "Open Skybox", // Some portions allow for aerial play.
      "Long Sightlines", // Certain stretches favor long-range fights.
      "Flank Routes", // The winding paths allow for numerous flanks.
      "Environmental Hazards",
    ],
  },

  {
    name: "Junkertown",
    type: "Escort",
    properties: [
      "High Mobility Paths", // The buildings provide strong elevated positions.
      "Open Skybox", // The wide-open areas allow for aerial play.
      "Long Sightlines", // Some sections favor long-range engagements.
      "Flank Routes", // The open layout allows for different attack routes.
      "Environmental Hazards",
    ],
  },
  {
    name: "Rialto",
    type: "Escort",
    properties: [
      "Choke-Heavy Maps", // Some streets and bridge areas force close engagements.
      "Long Sightlines", // The canal sections create good angles for snipers.
      "High Mobility Paths", // Rooftops and bridges allow for dynamic vertical play.
      "Flank Routes", // Pathways through buildings provide flanking opportunities.
      "Environmental Hazards",
      "Close-Quarters Combat",
    ],
  },
  {
    name: "Route 66",
    type: "Escort",
    properties: [
      "High Mobility Paths", // The gas station and final section offer key elevated positions.
      "Open Skybox", // The outdoor sections allow for aerial play.
      "Long Sightlines", // The long stretches between points favor poke and sniper heroes.
      "Choke-Heavy Maps", // Some areas force engagements through narrow pathways.
      "Flank Routes", // Various side routes offer alternative attack paths.
      "Environmental Hazards",
      "Close-Quarters Combat",
    ],
  },
  {
    name: "Shambali Monastery",
    type: "Escort",
    properties: [
      "Choke-Heavy Maps", // Some pathways force close-quarters engagements.
      "Long Sightlines", // Open areas allow for long-range fights.
      "High Mobility Paths", // The elevation changes enable aerial play.
      "Flank Routes", // Several pathways lead to alternative engagements.
    ],
  },
  {
    name: "Watchpoint: Gibraltar",
    type: "Escort",
    properties: [
      "High Mobility Paths", // The map's structure heavily favors high ground dominance.
      "Open Skybox", // The map allows for extensive aerial movement.
      "Long Sightlines", // Some stretches favor poke and sniper play.
      "Flank Routes", // Pathways through buildings and side routes allow for repositioning.
      "Environmental Hazards",
    ],
  },
  {
    name: "New Junk City",
    type: "Flashpoint",
    properties: [
      "High Mobility Paths", // Elevated walkways and rooftops provide strategic advantages.
      "Open Skybox", // Open areas allow for aerial movement and engagements.
      "Flank Routes", // Numerous side paths allow for flanking opportunities.
      "Enclosed Spaces", // Some control points are within tight, enclosed buildings.
      "Choke-Heavy Maps", // Some narrow corridors and doorways force close-range combat.
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
    ],
  },
  {
    name: "Eichenwalde",
    type: "Hybrid",
    properties: [
      "Choke-Heavy Maps", // The initial gate and castle entrance are hard to push through.
      "High Mobility Paths", // The castle's multiple levels create strong vertical play.
      "Long Sightlines", // The bridge and open streets before the castle favor snipers.
      "Flank Routes", // Several side paths allow alternative approaches.
      "Environmental Hazards",
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
      "Close-Quarters Combat",
      "Vertical Engagements",
    ],
  },
  {
    name: "King’s Row",
    type: "Hybrid",
    properties: [
      "Choke-Heavy Maps", // The first point archway is a notorious choke.
      "Enclosed Spaces", // The streets and last point are fairly confined.
      "Long Sightlines", // Some streets allow for extended poke battles.
      "High Mobility Paths", // Key buildings provide strong defensive positions.
      "Flank Routes", // Underground passage and side alleys allow sneaky plays.
      "Close-Quarters Combat",
      "Environmental Hazards",
    ],
  },
  {
    name: "Midtown",
    type: "Hybrid",
    properties: [
      "High Mobility Paths", // The train platform and buildings give defensive advantages.
      "Flank Routes", // Several side alleys and underground paths exist.
      "Choke-Heavy Maps", // The first point entrance is difficult to break.
      "Enclosed Spaces", // The second phase features compact interior fights.
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
      "Environmental Hazards",
    ],
  },
  {
    name: "Paraíso",
    type: "Hybrid",
    properties: [
      "Flank Routes", // Various side alleys and paths exist.
      "Choke-Heavy Maps", // The first point entrance is narrow and defensible.
      "High Mobility Paths", // Second point especially has strong vertical fights.
      "Enclosed Spaces", // The final area forces close-range fights.
      "Long Sightlines", // Some streets allow snipers to excel.
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
    ],
  },
  {
    name: "Esperança",
    type: "Push",
    properties: [
      "Flank Routes", // Various alleyways and buildings allow for alternative routes.
      "Long Sightlines", // Wide open streets allow for effective poke damage.
      "High Mobility Paths", // Key fights occur at different elevations across the map.
    ],
  },
  {
    name: "New Queen Street",
    type: "Push",
    properties: [
      "Flank Routes", // Multiple buildings and side streets allow for sneaky plays.
      "High Mobility Paths", // The design encourages fights at different elevations.
      "Choke-Heavy Maps", // Some areas force close-quarters engagements.
    ],
  },
  {
    name: "Runasapi",
    type: "Push",
    properties: [
      "Choke-Heavy Maps", // Certain areas create natural bottlenecks, forcing close fights.
      "Flank Routes", // Many alternative paths allow for effective flanking.
      "High Mobility Paths", // Significant height variations due to the mountainous setting.
      "Long Sightlines", // Some streets and elevated positions offer long-range opportunities.
      "Enclosed Spaces", // Market alleys and small rooms create intense close-quarters combat.
      "Close-Quarters Combat",
    ],
  },
  {
    name: "Hanaoka",
    type: "Clash",
    properties: [
      "High Mobility Paths", // Rooftops and upper walkways provide strategic elevation.
      "Choke-Heavy Maps", // Natural bottlenecks around objectives create close fights.
      "Flank Routes", // Many side paths enable strong flanking opportunities.
      "Enclosed Spaces", // Interior spaces and narrow roads force tight combat.
    ],
  },
  {
    name: "Throne of Anubis",
    type: "Clash",
    properties: [
      "Choke-Heavy Maps", // Chokepoints near objectives create intense combat.
      "Flank Routes", // Pathways and burrowed areas allow for flanking.
      "High Mobility Paths", // Platforms and destructible terrain add height variation.
      "Long Sightlines", // Open sections provide opportunities for snipers.
      "Enclosed Spaces", // Tight hallways and temple structures promote close-range fights.
      "Close-Quarters Combat",
    ],
  },
];
