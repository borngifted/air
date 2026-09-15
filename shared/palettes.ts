// AiR colour palettes. Each palette fills the same token roles the brand kit
// defines (Deep Air, Paper, Go, Spark, Ink, Mist) so every page keeps the same
// hierarchy no matter which colours are chosen. The picker in the site header
// lets a person choose one; the choice is stored on their device only.

export type AirPaletteId = "air" | "ocean" | "sunset" | "galaxy" | "golden" | "electric";

export type AirPalette = {
  id: AirPaletteId;
  name: string;
  note: string;
  /** Swatches shown in the picker: ground, action, highlight. */
  swatches: [string, string, string];
};

export const AIR_PALETTES: AirPalette[] = [
  { id: "air", name: "AiR Green", note: "The original. Deep green, bright go, one lime shout.", swatches: ["#132a24", "#18c98b", "#d8ff45"] },
  { id: "ocean", name: "Ocean Depths", note: "Calm navy with teal actions.", swatches: ["#14202e", "#2fb3a6", "#a8dadc"] },
  { id: "sunset", name: "Sunset Boulevard", note: "Warm slate with orange and sand.", swatches: ["#264653", "#f4a261", "#e9c46a"] },
  { id: "galaxy", name: "Midnight Galaxy", note: "Deep purple with lavender light.", swatches: ["#2b1e3e", "#b39ddb", "#dcd2ff"] },
  { id: "golden", name: "Golden Hour", note: "Chocolate brown with mustard and cream.", swatches: ["#4a403a", "#f4a900", "#ffe08a"] },
  { id: "electric", name: "Tech Innovation", note: "Near-black with electric blue and cyan.", swatches: ["#1e1e1e", "#3d8bff", "#00e5ff"] },
];

export const DEFAULT_PALETTE: AirPaletteId = "air";
export const PALETTE_STORAGE_KEY = "air-palette-v1";

export function isAirPaletteId(value: unknown): value is AirPaletteId {
  return typeof value === "string" && AIR_PALETTES.some(palette => palette.id === value);
}

/** Pick a stored palette when it is valid, otherwise fall back to the default. */
export function resolveAirPalette(stored: string | null | undefined, fallback: AirPaletteId = DEFAULT_PALETTE): AirPaletteId {
  return isAirPaletteId(stored) ? stored : fallback;
}
