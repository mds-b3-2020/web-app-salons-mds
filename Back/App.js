const express = require("express");
const app = express();
const cors = require("cors");
const https = require('https');
const joi = require('joi');
const excel = require('node-excel-export');
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

app.put("/events/:id", ()=>{
  //on récupère les données à enregistrer
  const body = req.body;

  //on enregistre les events en base
  client.query("UPDATE events SET libelle = '"+body.libelle+"'  AND date = '"+body.date+"' WHERE id =req.params.id", (err,res)=>{
    if(err){
      return res.json({error: "Problème lors de la modification de l'évènement"});
    }
  });
});

//route qui permet de supprimer les evenements
app.delete("/events/:id", ()=>{
  //on récupère les données à enregistrer
  const body = req.body;

  //on enregistre les events en base
  client.query("DELETE FROM events WHERE id =req.params.id", (err,res)=>{
    if(err){
      return res.json({error: "Problème lors de la suppression de l'évènement"});
    }
  });
});

//route qui permet de modifier les evenements
app.post("/events", ()=>{
  //on récupère les données à enregistrer
  const body = req.body;

  //on enregistre les events en base
  client.query("INSERT INTO events (libelle,date) VALUES ('"+body.libelle+"','"+body.date+"')", (err,res)=>{
    if(err){
      return res.json({error: "Problème lors de l'ajout de l'évènement"});
    }
  });
});

app.post("/response", ()=>{
  //on récupère les données à enregistrer
  const body = req.body;
  
  //on fait un test d'unicité sur l'email avec une requête existe
  client.query("SELECT email FROM response WHERE EXISTS (SELECT email FROM response WHERE email ='"+body.email+"'",(err,res)=>{
    if(res){
      //si on a un résultat on retourne un message : l'email est déjà utilisé
      return res.json({error: "Cet email est déjà utilisé"});
    }
  });

  //on fait les vérifications sur les informations récupérées avec joi
  const reponses = joi.object({
    email : joi.string().email.required()
  });
  //on utilise la fonction validate pour vérifier les données
  const {error} = reponses.validate(body);
  if(error){
    return res.json({error: error.details});
  }
  //on vérifie le téléphone
  https.get('https://numvalidate.com/api/validate?number='+body.phone,(response)=>{
    response.setEncoding("utf8");
    response.on('data', (data)=>{
        console.log(data);
    });
    response.on('error',(error)=>{
      return res.json({error: "Ce numéro de téléphone n'est pas valide"});
    });
  }).on('error', console.error);

  //on enregistre les données en base
  client.query("INSERT INTO response (nom,prenom,naissance,civilite,tel,fixe,email,cp,ville,niveau_actuel,code_annee,souhait_contact,formation_souhaitee,is_initial,code_formation,creneau_journalier,creneau_horaire,canal_acquisition,note_echange,etudiant_spe,ville_etude) VALUES (,,,,,,,,,,,,,,,,,,,,study_city)", (err,res)=>{
    if(err){
      return res.json({error: "Problème lors de l'ajout des réponses de l'utilisateur"});
    }
  });
});

//fonction excel
app.get('/excel', ()=>{


  //on ajoute les données à dataset
  const dataset = ?;

  //
  const merges = [
    { start: { row: 1, column: 1 }, end: { row: 1, column: 10 } },
    { start: { row: 2, column: 1 }, end: { row: 2, column: 5 } },
    { start: { row: 2, column: 6 }, end: { row: 2, column: 10 } }
  ]

  //on créé l'export
  const report = excel.buildExport(
    [
      {
        name: 'Report',
        heading: heading,
        merges: merges,
        specification: specification,
        data: dataset
      }
    ]
  );

  //retourne le fichier
  res.attachment('.xlsx');
  return res.send(report)
});

/*app.post("/responses", async (req, res) => {
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
})*/

app.listen(8010, () => console.log("server is running"));