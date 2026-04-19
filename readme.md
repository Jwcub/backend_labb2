# Laboration 2, del 1
Denna webbplats har utvecklats som en del av kursen Backend-baserad webbutveckling vid Mittuniversitetet. Projektets syfte är att ge praktisk erfarenhet av att arbeta med REST-baserade webbtjänster.

## Länk 
En liveversion av APIet finns tillgänglig på följande URL:
https://backend-labb2.vercel.app/ 

## Installation
API:et använder SQLite via Turso. Databasens tabeller är skapade direkt i deras online-klient. Kopiera in denna kod för att skapa en egen version av databasen.

```
CREATE TABLE `workexperience` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`companyname` text NOT NULL,
	`jobtitle` text NOT NULL,
	`joblocation` text NOT NULL,
	`startdate` text(10) NOT NULL,
	`enddate` text(10),
	`description` text NOT NULL
);
```

## Användning 
Nedan finns beskrivet hur man nå APIet på olika vis:

| Metod | Ändpunkt | Beskrivning |
|----------|----------|----------|
| GET | /jobs | Hämtar alla tillgängliga jobberfarenheter |
| GET | /jobs/:ID | Hämtar specifik arbetserfarenhet |
| POST | /jobs | Lagrar en ny arbetserfarenhet |
| PUT | /jobs/:ID | Redigera en arbetserfarnhet |
| DELETE | /jobs/:ID | Radera en arbetserfarnhet |

Ett arbetserfarenhet returneras/skickas som JSON med följande struktur:
```
{
    id: jobId 
    companyname: companyname, 
    jobtitle: jobtitle, 
    joblocation: joblocation, 
    startdate: startdate, 
    enddate: enddate, 
    description: description,
}
```