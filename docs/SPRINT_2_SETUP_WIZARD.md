# Sprint 2 – Setup Wizard

## Umgesetzt

- Mehrstufiger Einrichtungsassistent
- Polizei Sachsen als aktives MVP-Regelpaket
- Wochenarbeitszeit, Besoldungsgruppe und Stufe
- Editierbare Standarddienste F, F1, M und N
- Aktivierbare Sonderregeln RB, AHZ, Schulung, Fortbildung, Krank und Kind krank
- Startwerte für VM, RB, Urlaub und Nachtstunden
- Editierbarer 10-Tage-Rhythmus mit Startdatum
- Serverseitige Validierung mit Zod
- Speicherung in Supabase unter RLS
- Weiterleitung zum Dashboard nach erfolgreichem Abschluss

## Neue Migration

`supabase/migrations/0003_setup_wizard.sql`

Die Migration muss vor dem Testen in Supabase ausgeführt werden.

## Lokale Prüfung

```bash
npm install
npm run build
npm run lint
npm test
```

Der Build konnte in der Erstellungsumgebung nicht ausgeführt werden, weil `npm install` wegen eines Netzwerk-Timeouts nicht abgeschlossen wurde.
