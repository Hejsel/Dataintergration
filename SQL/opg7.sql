CREATE TABLE IF NOT EXISTS fag (
    FagID INTEGER PRIMARY KEY AUTOINCREMENT,
    FagNavn TEXT NOT NULL,
    Studieretning TEXT CHECK (Studieretning IN ('PBW', 'PBI', 'MMD', 'PTN')) NOT NULL,
    Semester TEXT NOT NULL,
    ECTS INTEGER CHECK (ECTS > 0) NOT NULL
);

INSERT INTO fag (FagNavn, Studieretning, Semester, ECTS)
VALUES 
('Webudvikling', 'MMD', '1. semester', 10),
('Kommunikation', 'MMD', '1. semester', 10),
('Brugeroplevelser', 'MMD', '1. semester', 10),
('Forretning', 'MMD', '1. semester', 10),
('Udviklingsmiljøer', 'PBW', '1. semester', 7),
('Dataintegration', 'PBW', '2. semester', 7),
('Javascript', 'PBW', '1. semester', 7),
('JS Frameworks', 'PBW', '1. semester', 7),
('Brugergrænsefladeudvikling', 'PBW', '1. semester', 7),
('Datasikkerhed', 'PBW', '2. semester', 7),
('Forretningsarkitektur', 'PBI', '3. semester', 5),
('Informationssystemarkitektur', 'PBI', '3. semester', 5),
('Teknologisk arkitektur', 'PBI', '3. semester', 5),
('3D Print', 'PTN', '2. semester', 5);
