import type { LocalTime, PauseMode, ShiftSegment } from "@/domain/types";
const DAY = 24 * 60;
export function parseLocalTime(value: LocalTime): number { const [h,m] = value.split(":").map(Number); if (!Number.isInteger(h)||!Number.isInteger(m)||h<0||h>23||m<0||m>59) throw new Error(`Ungültige Uhrzeit: ${value}`); return h*60+m; }
export function segmentDurationMinutes(segment: ShiftSegment): number { const start=parseLocalTime(segment.start); let end=parseLocalTime(segment.end); if(end<=start) end+=DAY; return end-start; }
export function creditedShiftMinutes(segments: ShiftSegment[], pause: PauseMode): number { const gross=segments.reduce((sum,s)=>sum+segmentDurationMinutes(s),0); const deduction=pause.kind==="FIXED"?pause.minutes:0; if(deduction>gross) throw new Error("Pausenzeit überschreitet die Dienstdauer."); return gross-deduction; }
export function formatMinutes(total: number): string { const sign=total<0?"-":""; const abs=Math.abs(total); return `${sign}${Math.floor(abs/60)}:${String(abs%60).padStart(2,"0")} h`; }
