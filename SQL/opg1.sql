CREATE TABLE IF NOT EXISTS undervisere (
    MedarbejderID INTEGER PRIMARY KEY AUTOINCREMENT,
    Fornavn TEXT NOT NULL,
    Efternavn TEXT NOT NULL,
    Alder INTEGER CHECK (Alder > 0) NOT NULL,
    Køn TEXT CHECK (Køn IN ('mand', 'kvinde', 'andet')) NOT NULL,
    CprNr CHAR(10) UNIQUE NOT NULL,
    Anciennitet INTEGER CHECK (Anciennitet >= 0) DEFAULT 0,
    Vejnavn TEXT NOT NULL,
    Husnummer TEXT NOT NULL,
    Postnummer CHAR(4) NOT NULL,
    By TEXT NOT NULL,
    Land TEXT NOT NULL DEFAULT 'Danmark'
);
