-- Antal adjunkter og lektorer.
SELECT Stillingsbetegnelse, COUNT(*) AS Antal
FROM medarbejdere
WHERE Stillingsbetegnelse IN ('adjunkt', 'lektor')
GROUP BY Stillingsbetegnelse;

-- Gennemsnitlig alder for adjunkter og lektorer.
SELECT Stillingsbetegnelse, AVG(Alder) AS GennemsnitligAlder
FROM medarbejdere
WHERE Stillingsbetegnelse IN ('adjunkt', 'lektor')
GROUP BY Stillingsbetegnelse;

-- Antal kvindelige ledere.
SELECT COUNT(*) AS KvindeligeLedere
FROM medarbejdere
WHERE Køn = 'kvinde' AND Stillingsbetegnelse = 'leder';

-- Laveste alder for ledere og TAP'ere.
SELECT Stillingsbetegnelse, MIN(Alder) AS LavesteAlder
FROM medarbejdere
WHERE Stillingsbetegnelse IN ('leder', 'TAP')
GROUP BY Stillingsbetegnelse;

-- Vis lektorerne sorteret i omvendt alfabetisk rækkefølge.
SELECT * FROM medarbejdere
WHERE Stillingsbetegnelse = 'lektor'
ORDER BY Efternavn DESC, Fornavn DESC;
