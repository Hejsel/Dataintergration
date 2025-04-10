-- Løsning med REGEXP
SELECT * 
FROM medarbejdere
WHERE Stillingsbetegnelse = 'lektor'
AND Fornavn REGEXP '^[a-zA-Z]{6}$';

-- Løsning med LIKE
SELECT * 
FROM medarbejdere
WHERE Stillingsbetegnelse = 'lektor'
AND Fornavn LIKE '______'; -- Vi skriver seks '_'