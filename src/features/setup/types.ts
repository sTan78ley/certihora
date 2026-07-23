import type { ShiftTemplateDraft } from "./config";

export type SetupDraft = {
  profession: "police";
  region: "SN";
  weeklyHours: number;
  payGrade: string;
  payStep: number;
  shifts: ShiftTemplateDraft[];
  enabledRules: string[];
  balances: {
    vmMinutes: number;
    rbMinutes: number;
    remainingLeaveDays: number;
    savedLeaveDays: number;
    nightMinutes: number;
  };
  rhythmStartDate: string;
  rhythm: string[];
};
