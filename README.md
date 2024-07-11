# Opis Projektu

## Przegląd

Ten projekt to pełnostackowa aplikacja zaprojektowana do zarządzania i monitorowania modułów z czujnikami temperatury. Wykorzystuje React do frontend'u oraz backend na Node.js z Socket.IO do aktualizacji w czasie rzeczywistym.

## Frontend (React)

### Komponenty

#### Komponent Home (Home.js)

- Wyświetla listę modułów z ich bieżącymi i docelowymi temperaturami.
- Wykorzystuje Socket.IO do aktualizacji temperatury w czasie rzeczywistym.
- Kliknięcie na moduł przekierowuje do jego szczegółów.

#### Komponent Module (Module.js)

- Pokazuje szczegółowe informacje o wybranym module.
- Umożliwia edycję szczegółów modułu, takich jak nazwa, opis i docelowa temperatura.
- Zawiera komponent wykresu historycznego (HistoricalChart.js) do wizualizacji danych - temperaturowych.

#### Komponent Historical Chart (HistoricalChart.js)

- Wyświetla historyczne dane temperaturowe dla modułu.
- Wspiera wybór zakresu dat i trybu wyświetlania (godzinowy/dzienny).

#### Komponent Modal (Modal.js)

- Dostarcza formularz do edycji szczegółów modułu.
- Wykonuje walidację po stronie klienta dla takich danych jak zakres temperatur.

## Dodatkowe Funkcje

### Potencjalne Ulepszenia

- Autoryzacja Użytkownika: Implementacja logowania użytkownika i kontroli dostępu na podstawie ról w celu zabezpieczenia tras i działań.
- Filtrowanie Danych: Pozwolenie użytkownikom na filtrowanie modułów na podstawie dostępności, zakresu temperatur itp.
- Alerty i Powiadomienia: Wysyłanie alertów, gdy przekroczone zostaną progi temperatur za pomocą emaili lub powiadomień w aplikacji.
- Eksport Danych: Możliwość eksportowania danych historycznych jako raporty CSV lub PDF.
- Lokalizacja: Wsparcie dla wielu języków dla międzynarodowych użytkowników.

## Instrukcje Instalacji

### Sklonowanie Repozytorium

```bash
git clone <repository_url>
cd <project_directory>
```

### Instalacja Zależności

```bash
npm install
```

### Uruchomienie Backend'u (Zakładając konfigurację backend'u na Node.js)

```bash
npm start
```

### Uruchomienie Frontend'u (React)

```bash
cd frontend
npm install
npm start
```

### Dostęp do Aplikacji
Otwórz http://localhost:3000 w swojej przeglądarce internetowej.

## Notatki Dotyczące Rozwoju
- Upewnij się, że Node.js i npm są zainstalowane na twoim systemie.
- Endpointy API backend'u (/modules, /modules/:id, /modules/:id/history) powinny być poprawnie zaimplementowane i dostępne.
- Konfiguracja Socket.IO (localhost:3001) powinna być skonfigurowana i uruchomiona, aby odbierać aktualizacje w czasie rzeczywistym.
