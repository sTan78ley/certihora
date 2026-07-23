export type LocalTime = `${number}:${number}`;
export type PauseMode = { kind: "NONE" } | { kind: "FIXED"; minutes: number };
export interface ShiftSegment { start: LocalTime; end: LocalTime; }
export interface ShiftTemplate { id: string; code: string; name: string; segments: ShiftSegment[]; pause: PauseMode; }
