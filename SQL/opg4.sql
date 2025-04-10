SELECT * FROM medarbejdere
WHERE Køn = 'kvinde' AND Stillingsbetegnelse = 'adjunkt';

SELECT * FROM medarbejdere
WHERE Stillingsbetegnelse IN ('leder', 'TAP');

SELECT * FROM medarbejdere
WHERE Stillingsbetegnelse IN ('adjunkt', 'lektor')
AND Alder BETWEEN 30 AND 50;

SELECT * FROM medarbejdere
WHERE Køn = 'mand' AND Anciennitet > 7;
