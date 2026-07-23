import type { ShiftSegment } from "@/domain/types";
import { parseLocalTime } from "./time";
const DAY=1440;
const overlap=(a:number,b:number,c:number,d:number)=>Math.max(0,Math.min(b,d)-Math.max(a,c));
export function nightMinutesForSegment(segment: ShiftSegment): number { const start=parseLocalTime(segment.start); let end=parseLocalTime(segment.end); if(end<=start) end+=DAY; return overlap(start,end,0,360)+overlap(start,end,1200,1800); }
export function nightMinutes(segments: ShiftSegment[]): number { return segments.reduce((sum,s)=>sum+nightMinutesForSegment(s),0); }
