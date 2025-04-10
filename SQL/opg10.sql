-- Adspørg hvor mange fag en bestemt underviser, fx Anders Jensen, uderviser i.
SELECT COUNT(*)
FROM underviser_fag
JOIN medarbejdere ON underviser_fag.MedarbejderID = medarbejdere.MedarbejderID
WHERE medarbejdere.Fornavn = 'Anders' AND medarbejdere.Efternavn = 'Jensen';

-- Adspørg hvem der underviser i en bestemt fag, fx JavaScript.
SELECT 
    medarbejdere.Fornavn, 
    medarbejdere.Efternavn, 
    fag.FagNavn
FROM underviser_fag
JOIN medarbejdere ON medarbejdere.MedarbejderID = underviser_fag.MedarbejderID
JOIN fag ON fag.FagID = underviser_fag.FagID
WHERE fag.FagNavn = 'Javascript';

-- Vis alle fag som der undervises i, sammen med underviserens navn og stilling ordnet alfabetisk efter undervisernes navn
SELECT 
    fag.FagNavn,
    medarbejdere.Fornavn, 
    medarbejdere.Efternavn, 
    medarbejdere.Stillingsbetegnelse
FROM underviser_fag
JOIN medarbejdere ON medarbejdere.MedarbejderID = underviser_fag.MedarbejderID
JOIN fag ON fag.FagID = underviser_fag.FagID
ORDER BY fag.FagNavn, medarbejdere.Fornavn, medarbejdere.Efternavn;
