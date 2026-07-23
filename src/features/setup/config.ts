export type ShiftTemplateDraft = {
  code: string;
  name: string;
  start: string;
  end: string;
  pauseMinutes: number;
};

export const DEFAULT_SHIFTS: ShiftTemplateDraft[] = [
  { code: "F", name: "Frühdienst kurz", start: "05:45", end: "11:30", pauseMinutes: 0 },
  { code: "F1", name: "Frühdienst", start: "05:45", end: "15:15", pauseMinutes: 0 },
  { code: "M", name: "Mitteldienst", start: "11:15", end: "21:00", pauseMinutes: 0 },
  { code: "N", name: "Nachtdienst", start: "20:45", end: "06:00", pauseMinutes: 0 },
];

export const SPECIAL_RULES = [
  { id: "rb", label: "Rufbereitschaft (RB)", description: "Standardmäßig 1/8 der RB-Zeit anrechnen.", defaultFactor: 0.125 },
  { id: "ahz", label: "Arbeitszeit-Hinterlegung (AHZ)", description: "Standardmäßig 1/4 der AHZ-Zeit anrechnen.", defaultFactor: 0.25 },
  { id: "training", label: "Schulungstag", description: "Wird standardmäßig mit 8 Stunden bewertet.", defaultFactor: 1 },
  { id: "education", label: "Fortbildung", description: "Individuelle Beginn- und Endzeit erfassen.", defaultFactor: 1 },
  { id: "sick", label: "Krank", description: "Wird standardmäßig mit 8 Stunden bewertet.", defaultFactor: 1 },
  { id: "child_sick", label: "Kind krank", description: "Wird standardmäßig mit 8 Stunden bewertet.", defaultFactor: 1 },
] as const;

export const DEFAULT_RHYTHM = ["F/N", "N", "FREI", "FREI", "F1", "M", "M", "FREI", "FREI", "F/N"];
