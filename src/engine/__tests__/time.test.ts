import { describe, expect, it } from "vitest";
import { creditedShiftMinutes, segmentDurationMinutes } from "../time";
import { nightMinutes } from "../night";
describe("Certihora Smart Engine",()=>{
 it("rechnet M ohne Pause",()=>expect(creditedShiftMinutes([{start:"11:15",end:"21:00"}],{kind:"NONE"})).toBe(585));
 it("rechnet N über Mitternacht",()=>expect(segmentDurationMinutes({start:"20:45",end:"06:00"})).toBe(555));
 it("rechnet F/N",()=>expect(creditedShiftMinutes([{start:"05:45",end:"11:30"},{start:"20:45",end:"06:00"}],{kind:"NONE"})).toBe(900));
 it("zählt Nachtstunden",()=>expect(nightMinutes([{start:"20:45",end:"06:00"}])).toBe(555));
});
