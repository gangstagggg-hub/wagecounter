# Wage Counter — Android (TWA, uten PWABuilder)

Dette er et ekte, minimalt Android-prosjekt som bruker Googles eget
`androidbrowserhelper`-bibliotek (samme bibliotek PWABuilder/Bubblewrap bruker
under panseret) — men skrevet for hånd med riktig API-nivå fra start, siden
PWABuilder sitt eget verktøy foreløpig er fastlåst på API 35.

- **Target/compile SDK:** 36 (Android 16) — oppfyller Google sitt krav fra
  31. august 2026
- **Package ID:** `no.wagecounter.app3` (samme som allerede er registrert i
  Play Console og i `assetlinks.json`)
- **Android Gradle Plugin:** 8.13.2, **Gradle:** 8.13
- Appen har ingen egen kode — den peker bare til
  `https://gangstagggg-hub.github.io/wagecounter/` og vises i fullskjerm uten
  adressefelt, akkurat som TWA-appen du allerede har, bare bygget riktig.

**Viktig:** Jeg har ikke kunnet teste selve kompileringen (dette miljøet har
ikke tilgang til Android sine byggeservere). Første kjøring i GitHub Actions
er den reelle testen — send meg feilmeldingen hvis noe feiler, så retter vi
det sammen.

## 1. Last opp til GitHub

Legg hele denne `android`-mappen (og `.github`-mappen) inn i **samme repo**
som resten av nettsiden din (`wagecounter`), ved siden av `index.html` —
ikke inni noen undermappe der.

Repoet ditt skal etter dette se slik ut:
```
wagecounter/
├── index.html
├── manifest.json
├── sw.js
├── icon-192.png
├── icon-512.png
├── privacy.html
├── _redirects
├── wellknown/
│   └── assetlinks.json
├── android/                    ← ny
│   ├── build.gradle.kts
│   ├── settings.gradle.kts
│   ├── gradle.properties
│   ├── app/
│   └── ...
└── .github/
    └── workflows/
        └── android.yml         ← ny
```

## 2. Legg til signeringsnøkkelen som hemmeligheter på GitHub

Du bruker **samme `signing.keystore`** du allerede har fra PWABuilder (den
som er godkjent for `no.wagecounter.app3`) — ikke lag en ny.

**Gjør om nøkkelfilen til tekst** (PowerShell på Windows):
```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("signing.keystore")) | Set-Clipboard
```
Dette kopierer en lang tekststreng til utklippstavlen.

**Legg inn 4 hemmeligheter i repoet:**
Gå til **Settings → Secrets and variables → Actions → New repository secret**,
og opprett disse fire (verdiene finner du i `signing-key-info.txt` fra
PWABuilder):

| Navn | Innhold |
|---|---|
| `UPLOAD_KEYSTORE_BASE64` | Teksten du nettopp kopierte |
| `UPLOAD_KEYSTORE_PASSWORD` | Passordet til keystore-filen |
| `UPLOAD_KEY_ALIAS` | Alias-navnet (fra `signing-key-info.txt`) |
| `UPLOAD_KEY_PASSWORD` | Passordet til selve nøkkelen |

## 3. Kjør bygget

Gå til **Actions**-fanen i repoet → velg **"Android Build"** i listen til
venstre → **"Run workflow"** → **Run workflow**.

Den kjører automatisk på nytt hver gang du endrer noe i `android/`-mappen
også, men du kan alltid trigge den manuelt slik.

## 4. Last ned den ferdige filen

Når kjøringen er ferdig (grønn hake, tar et par minutter): åpne kjøringen →
scroll ned til **Artifacts** → last ned **`wagecounter-release-aab`** →
pakk ut zip-filen → du finner `app-release.aab` der inne.

Dette er filen du laster opp i Play Console — versjonskoden økes automatisk
for hver kjøring, så du slipper "feil versjonskode"-feilen fra sist.

## Hvis bygget feiler

Åpne den feilende kjøringen i Actions-fanen, finn det røde steget, og send
meg feilmeldingen — da retter vi det sammen.
