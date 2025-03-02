// General synergy properties that can apply to multiple roles.
// IE any role can provide these and heroes who want them tend to want them from any role at all
// generally if they fill a need on one role they should fill a need on all roles.
export type GenericSynergy =
  | "Shields" // shields
  | "Zone Control" // Controls or requires control over an area.
  | "Mobility Support" // Provides or requires movement abilities.
  | "Poke Playstyle" // Thrives on poking from a distance.
  | "Burst Damage" // Deals or requires burst damage.
  | "Sustain Pressure" // Provides or requires sustained pressure.
  | "Engage Initiation" // Engages or requires engagement.
  | "Peel & Protection" // Protects allies from threats.
  | "Disruption"
  | "Utility/CC Support"; // Provides or requires crowd control or general utility.

// What Tanks provide to the team.
export type TankProvides =
  | "Damage Mitigation" // Reduces incoming damage.
  | "Disruption" // Disrupts enemy formations or abilities.
  | GenericSynergy; // Tanks can provide anything from the generic synergy list.

// What Tanks need from the team.
export type TankNeeds = TankProvides; // Tanks can only need things that exist in "Provides".

// What Supports provide to the team.
export type SupportProvides =
  | "Sustained Healing"
  | "Damage Support"
  | "Burst Healing"
  | "Long-Ranged Healing"
  | GenericSynergy; // Supports can provide anything from the generic synergy list.

export type SupportNeeds = SupportProvides; // Supports can only need things that exist in "Provides".
// What Damage heroes provide to the team.
export type DamageProvides =
  | "Burst Damage"
  | "Follow-Up Damage"
  | GenericSynergy; // Damage heroes can provide anything from the generic synergy list.

// What Damage heroes need from the team.
export type DamageNeeds = DamageProvides; // Damage heroes can only need things that exist in "Provides".

// Things a Hero does thgat others may hate, or things a hero may hate that others do
export type Drawbacks =
  | "Unstable Frontline" // Causes Bad Front Line play, does not work well without a unstable frontline.
  | "Passive Play" // Prefers waiting over engaging. Hates passive playstyle.
  | "Stationary Healing" // Heals best when still // needs mobile supports that can follow.
  | "Split Engagement" // Fights away from the team. // needs a team around them
  | "Forces Fast Engagements" // Rushes fights before others are ready. // Hates fast engagements.
  | "Peel" // Drawback: Can't peel. Hate: Needs peel.
  | "Inconsistent Damage" // Unreliable output. // needs constant poressure output
  | "High Resource Demand" // Requires lots of healing/support. // hates babysitting
  | "Stationary Playstyle" // Prefers staying in one place. // needs all members of team to be mobile
  | "Set-Up Dependent" // Needs time/positioning to be useful.
  | "Cooldown Dependent" // Relies on cooldowns to be effective. needs teammates to have constant up time
  | "Lacks Utility" // No utility or CC. // hates heroies without utility
  | "Limited Mobility"; // Slow or immobile.

// Defines what a hero might struggle with.
export type Hates = Drawbacks;
