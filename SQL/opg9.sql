-- Udvid databasen med en tabel om undervisernes undervisning.
CREATE TABLE IF NOT EXISTS underviser_fag (
    MedarbejderID INTEGER,
    FagID INTEGER,
    PRIMARY KEY (MedarbejderID, FagID),
    FOREIGN KEY (MedarbejderID) REFERENCES medarbejdere(MedarbejderID) ON DELETE CASCADE,
    FOREIGN KEY (FagID) REFERENCES fag(FagID) ON DELETE CASCADE
);

-- Indsæt MedarbejderID og FagID for adjunkter og lektorer uden brug af aliaser
INSERT INTO underviser_fag (MedarbejderID, FagID)
SELECT 
    medarbejdere.MedarbejderID, 
    fag.FagID
FROM medarbejdere
JOIN fag ON fag.Studieretning IN ('MMD', 'PBW', 'PBI', 'PTN')  -- Vælg relevante fag
WHERE medarbejdere.Stillingsbetegnelse IN ('adjunkt', 'lektor');
