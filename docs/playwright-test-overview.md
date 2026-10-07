# Playwright-Testübersicht

Diese Übersicht dient der gemeinsamen Koordination der Playwright-Tests für die drei AdeLe-Plugins. Sie zeigt, welche fachlichen Szenarien bereits automatisiert sind, welche sich in Bearbeitung oder Review befinden und wer den jeweiligen Test bearbeitet. Ziel ist insbesondere, Doppelarbeit bei der weiteren Testautomatisierung zu vermeiden.

**Status:** ⬜ Offen · 🔵 In Arbeit · 🟡 Im Review · ✅ Automatisiert

## local_adele

| User Story / Testszenario | Issue | Playwright-Test / Test-ID | Status | Bearbeitet von | PR |
| --- | --- | --- | --- | --- | --- |
| Teacher mit Bearbeitungsrechten sieht keinen Eintrag „Lernpfade“ in der primären Kursnavigation | #458 | ADELE-PW-458-A | ✅ Automatisiert | Ralf | – |
| Teacher ohne Bearbeitungsrechte sieht keinen Eintrag „Lernpfade“ in der primären Kursnavigation | #458 | ADELE-PW-458-B | ✅ Automatisiert | Ralf | – |
| Adele-Assistant sieht sichtbare, aber keine unsichtbaren Lernpfade, ohne zusätzliche Editor-Zuordnung | #472 | ADELE-PW-472-A | ✅ Automatisiert | Ralf | – |
| Adele-Assistant sieht sichtbare, aber keine unsichtbaren Lernpfade, auch mit Editor-Zuordnung | #472 | ADELE-PW-472-B | ✅ Automatisiert | Ralf | – |
| Lernpfade und Bedienelemente besitzen stabile, maschinenlesbare Identitäten und Zustände | #574 | ADELE-PW-574 | ✅ Automatisiert | Ralf | – |
| Lernpfad-Editor ist per Tastatur bedienbar und unterstützt Fokus, Live-Region und Accessibility-Prüfung | #575 | ADELE-PW-575 | ✅ Automatisiert | Ralf | – |
| Lernpfadübersicht rendert korrekt: Vue-App, Seed-Lernpfad und keine PHP-/JavaScript-Fehler | – | learningpaths.spec.ts | ✅ Automatisiert | Ralf | – |
| Student hat keinen Zugriff auf die Lernpfadverwaltung; Direktzugriff wird verweigert; in der AdeLe-Aktivität ist der Lernpfad nur ohne Bearbeitungsoption nutzbar | #470 B4 | Student Access (3 Tests) | 🟡 Im Review | Azadeh | #8 |

## mod_adele

| User Story / Testszenario | Issue | Playwright-Test / Test-ID | Status | Bearbeitet von | PR |
| --- | --- | --- | --- | --- | --- |
| AdeLe-Aktivität wird im Kurs angezeigt, rendert korrekt und erzeugt keine PHP-/JavaScript-Fehler | – | activity.spec.ts | ✅ Automatisiert | Ralf | – |
| Erstellen einer AdeLe-Aktivität schreibt Teilnehmende des Startknotens in den Host-Kurs ein und schließt einen Kontrollnutzer aus | – | ADELE-PW-MOD-01 | ✅ Automatisiert | Ralf | – |
| Löschen der AdeLe-Aktivität beendet/suspendiert den Host-Zugriff gemäß Retention-Semantik; Quell-Einschreibungen und Lernpfad bleiben erhalten | enrol_adele #7* | ADELE-PW-MOD-01 | ✅ Automatisiert | Ralf | – |

\* Im Test wird auf enrol_adele Issue #7 zur Retention-Semantik verwiesen; eine direkte Zuordnung des gesamten Tests zu diesem Issue ist damit nicht behauptet.

## enrol_adele

| User Story / Testszenario | Issue | Playwright-Test / Test-ID | Status | Bearbeitet von | PR |
| --- | --- | --- | --- | --- | --- |
| Management-Seite listet den vorbereiteten Lernpfad mit Kurs und Typ | – | manage.spec.ts | ✅ Automatisiert | Ralf | – |
| Vor Ausführung der geplanten Reconciliation ist der erwartete Ausgangszustand sichtbar | – | manage.spec.ts | ✅ Automatisiert | Ralf | – |
| Filterung nach Host-Kurs entfernt den eigenen Fixture-Eintrag aus der Ergebnisliste | – | manage.spec.ts | ✅ Automatisiert | Ralf | – |
| Hard Delete wird nur angeboten, wenn genau ein Lernpfad ausgewählt ist | – | manage.spec.ts | ✅ Automatisiert | Ralf | – |

## Pflege der Übersicht

Die Übersicht wird aktualisiert, wenn ein neuer Playwright-Test begonnen, zum Review eingereicht oder abgeschlossen wird. Neue Zuordnungen zu Issues werden nur eingetragen, wenn sie im Test, Issue oder Pull Request nachvollziehbar belegt sind.
