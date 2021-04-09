const express = require("express");
const app = express();
const cors = require("cors");
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();   
}
const { Client } = require('pg')

app.use(cors());
const connectionString = process.env.DATABASE_URL;

const client = new Client({connectionString, ssl: { rejectUnauthorized: false }})
client.connect()

const ReadResponse = client.query('SELECT * FROM response', (err, res) => {
})

app.get("/responses", (req, res) => {
  res.json(ReadResponse.fields);
})

app.post("/responses", async (req, res) => {
  console.log(req);
  const { nom, prenom, naissance, civilite, tel, fixe, email, cp, ville, niveau_actuel, code_annee, souhait_contact, formation_souhaitee, is_initial, code_formation, creneau_journalier, crenaeu_horaire, canal_acquisition, note_echange, etudiant_spe, ville_etude } = req;

  await client.query(
    'INSERT INTO response (nom, prenom, naissance, civilite, tel, fixe, email, cp, ville, niveau_actuel, code_annee, souhait_contact, formation_souhaitee, is_initial, code_formation, creneau_journalier, creneau_horaire, canal_acquisition, note_echange, etudiant_spe, ville_etude) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)',
    [nom, prenom, naissance, civilite, tel, fixe, email, cp, ville, niveau_actuel, code_annee, souhait_contact, formation_souhaitee, is_initial, code_formation, creneau_journalier, crenaeu_horaire, canal_acquisition, note_echange, etudiant_spe, ville_etude],
    (err, res) => {
      if (err) {
        console.log(err);
      }
      console.log(res);
    }
  )
  res.json('all good !');
})

app.listen(8010, () => console.log("server is running"));