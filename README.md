# Certihora App – Sprint 1 Foundation

## Enthalten
- Next.js App Router und TypeScript
- responsive Desktop-/Mobile-Navigation
- echtes React-Dashboard
- Login-Oberfläche
- Certihora Design-Tokens
- erste Smart-Engine-Funktionen und Tests
- Supabase-Client und RLS-Migration

## Start
```bash
npm install
cp .env.example .env.local
npm run dev
```
Danach `http://localhost:3000` öffnen.

Ohne Supabase-Zugangsdaten läuft das Dashboard bereits; Auth wird im nächsten Paket vollständig verbunden.

## Qualitätsprüfung
```bash
npm run test
npm run lint
npm run build
```


## Sprint 1 – Paket 2

Die Authentifizierung ist implementiert. Vor dem Start `.env.example` nach `.env.local` kopieren und die Supabase-Werte eintragen. Danach die Migrationen in Reihenfolge ausführen.
