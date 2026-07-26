import type { Game } from "./game";

export type SlotId =
  | "slot1"
  | "slot2"
  | "slot3"
  | "slot4"
  | "slot5";

export type RecommendationSlots = Record<
  SlotId,
  Game | null
>;