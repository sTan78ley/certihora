# Sprint 1 – Paket 2: Authentifizierung

## Umgesetzt

- Registrierung mit E-Mail und Passwort
- E-Mail-Bestätigung über PKCE-Callback
- Login und Logout
- Passwort-Reset
- sichere serverseitige Benutzerprüfung
- Session-Erneuerung über Next.js `proxy.ts`
- geschützte Produktrouten
- automatische Profilerstellung per Datenbank-Trigger
- Weiterleitung in den Einrichtungsassistenten
- generische Fehlermeldungen beim Passwort-Reset gegen Account Enumeration

## Supabase-Einrichtung

1. Migrationen `0001_core.sql` und `0002_auth_profiles.sql` ausführen.
2. Site URL lokal auf `http://localhost:3000` setzen.
3. Redirect URLs ergänzen:
   - `http://localhost:3000/auth/callback`
   - spätere Produktionsdomain `/auth/callback`
4. `.env.example` nach `.env.local` kopieren und Werte einsetzen.

## Abnahmekriterien

- Nicht angemeldete Nutzer werden von `/dashboard` nach `/login` geleitet.
- Registrierte Nutzer erhalten ein Profil.
- Bestätigte Nutzer gelangen nach Registrierung nach `/setup`.
- Login bleibt nach Neuladen bestehen.
- Logout entfernt die Session.
- Passwort-Reset führt über den sicheren Callback zur Passwortänderung.
