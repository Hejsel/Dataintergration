-- Find den yngste lektor.
SELECT * 
FROM medarbejdere
WHERE Stillingsbetegnelse = 'lektor'
AND Alder = (
    SELECT MIN(Alder)
    FROM medarbejdere
    WHERE Stillingsbetegnelse = 'lektor'
);

-- Find den ældste mandlige leder.
SELECT * 
FROM medarbejdere
WHERE Stillingsbetegnelse = 'leder'
AND Køn = 'mand'
AND Alder = (
    SELECT MAX(Alder)
    FROM medarbejdere
    WHERE Stillingsbetegnelse = 'leder'
    AND Køn = 'mand'
);