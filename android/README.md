# Wage Counter – WebView-versjon

Nettsiden ligger pakket inne i appen (`app/src/main/assets/www/`) og vises i Androids
egen WebView. Alt lagres lokalt på telefonen, og appen trenger ikke nett
(den har ikke engang INTERNET-tillatelse).

- Pakkenavn: `no.wagecounter.app3` (uendret)
- Target/compile SDK: 36, minSdk 24
- Ingen eksterne biblioteker
- Signering og versjonskode håndteres av GitHub Actions som før

## Bruk
1. Erstatt hele `android`-mappen i repoet med denne (slett den gamle først).
2. Behold `.github/workflows/android.yml` slik den er.
3. Actions -> Android Build -> Run workflow, last ned `.aab` fra Artifacts.

## Endre innhold i appen
Endringer i nettsiden gjøres i `app/src/main/assets/www/index.html`.
Hver endring krever en ny build + ny utgave i Play Console.
