ALTER TABLE undervisere RENAME TO medarbejdere;

ALTER TABLE medarbejdere ADD COLUMN Stillingsbetegnelse TEXT CHECK (Stillingsbetegnelse IN ('adjunkt', 'lektor', 'leder', 'TAP')) NOT NULL DEFAULT 'adjunkt';

UPDATE medarbejdere SET Stillingsbetegnelse = 'lektor' WHERE Fornavn = 'Anders' AND Efternavn = 'Jensen';
UPDATE medarbejdere SET Stillingsbetegnelse = 'adjunkt' WHERE Fornavn = 'Mette' AND Efternavn = 'Hansen';
UPDATE medarbejdere SET Stillingsbetegnelse = 'lektor' WHERE Fornavn = 'Lars' AND Efternavn = 'Petersen';
UPDATE medarbejdere SET Stillingsbetegnelse = 'adjunkt' WHERE Fornavn = 'Sofie' AND Efternavn = 'Nielsen';
UPDATE medarbejdere SET Stillingsbetegnelse = 'lektor' WHERE Fornavn = 'Jonas' AND Efternavn = 'Christiansen';
UPDATE medarbejdere SET Stillingsbetegnelse = 'adjunkt' WHERE Fornavn = 'Emma' AND Efternavn = 'Larsen';
