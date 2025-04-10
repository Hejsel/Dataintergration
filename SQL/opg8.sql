-- Adspørg hvor mange fag der er på de enkelte studieretninger
SELECT Studieretning, COUNT(*) AS AntalFag
FROM fag
GROUP BY Studieretning;

-- Sorter fagene alfabetisk således at studieretningerne sorteres i faldende rækkefølge, mens fagnavnene sorteres i stigende rækkefølge
SELECT Studieretning, Fagnavn
FROM fag
ORDER BY Studieretning DESC, Fagnavn ASC;

-- Adspørg hvor mange fag der er på de enkelte semestre på de enkelte studieretninger
SELECT Studieretning, Semester, COUNT(*) AS AntalFag
FROM fag
GROUP BY Studieretning, Semester;