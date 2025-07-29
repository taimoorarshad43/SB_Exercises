
DROP DATABASE IF EXISTS medical_center;

CREATE DATABASE medical_center;

\c medical_center

CREATE TABLE doctors
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  specialty TEXT NOT NULL
);

CREATE TABLE patients
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  insurance TEXT NOT NULL,
  birthday DATE NOT NULL
);

CREATE TABLE visits
(
  id SERIAL PRIMARY KEY,
  doctor_id INTEGER NOT NULL REFERENCES doctors(id),
  patient_id INTEGER NOT NULL REFERENCES patients(id),
  date DATE NOT NULL
);

CREATE TABLE diseases
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE diagnoses
(
  id SERIAL PRIMARY KEY,
  visit_id INTEGER NOT NULL REFERENCES visits(id),
  disease_id INTEGER NOT NULL REFERENCES diseases(id),
  notes TEXT
);

INSERT INTO doctors
  (name, specialty)
VALUES
  ('Dr. Sarah Johnson', 'Cardiology'),
  ('Dr. Michael Chen', 'Pediatrics'),
  ('Dr. Emily Rodriguez', 'Neurology'),
  ('Dr. David Thompson', 'Orthopedics'),
  ('Dr. Lisa Park', 'Dermatology');

INSERT INTO patients
  (name, insurance, birthday)
VALUES
  ('John Smith', 'Blue Cross Blue Shield', '1985-03-15'),
  ('Maria Garcia', 'Aetna', '1990-07-22'),
  ('Robert Wilson', 'Cigna', '1978-11-08'),
  ('Jennifer Davis', 'UnitedHealth', '1992-04-30'),
  ('James Brown', 'Humana', '1983-09-12');

INSERT INTO visits
  (doctor_id, patient_id, date)
VALUES
  (1, 1, '2024-01-15'),
  (2, 2, '2024-01-16'),
  (1, 3, '2024-01-17'),
  (3, 1, '2024-01-18'),
  (2, 4, '2024-01-19'),
  (4, 5, '2024-01-20'),
  (1, 2, '2024-01-21'),
  (3, 4, '2024-01-22');

INSERT INTO diseases
  (name, description)
VALUES
  ('Hypertension', 'High blood pressure condition'),
  ('Diabetes Type 2', 'Chronic condition affecting blood sugar levels'),
  ('Asthma', 'Chronic respiratory condition'),
  ('Migraine', 'Severe recurring headache'),
  ('Arthritis', 'Inflammation of joints'),
  ('Eczema', 'Chronic skin condition');

INSERT INTO diagnoses
  (visit_id, disease_id, notes)
VALUES
  (1, 1, 'Patient shows elevated blood pressure, recommend lifestyle changes'),
  (2, 3, 'Child diagnosed with asthma, prescribed inhaler'),
  (3, 1, 'Follow-up visit for hypertension management'),
  (4, 4, 'Patient experiencing severe migraines, prescribed medication'),
  (5, 2, 'Initial diabetes diagnosis, starting treatment plan'),
  (6, 5, 'Joint pain confirmed as arthritis'),
  (7, 1, 'Routine check-up, blood pressure stable'),
  (8, 6, 'Skin rash diagnosed as eczema, topical treatment prescribed'); 