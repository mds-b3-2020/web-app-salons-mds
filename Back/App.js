const express = require("express");
const app = express();
const cors = require("cors");
const https = require('https');
const joi = require('joi');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();   
}
const { Client } = require('pg')

app.use(express.json());
app.use(cors());

const connectionString = process.env.DATABASE_URL;
const client = new Client({connectionString, ssl: { rejectUnauthorized: false }})
client.connect()

app.get("/responses", (req, res) => {
  client.query(`SELECT * FROM response`, (err, result) => {
    const responseFound = result.rows;
    return res.json(responseFound);
  });
})

//route qui permet de modifier les evenements
app.put("/events/:id", (req, res)=>{
  const body = req.body;
  //on modifie l'event en base
  client.query("UPDATE event SET libelle_event = '"+body.libelle+"' AND date_event = '"+body.date+"' WHERE id = "+req.params.id, (err)=>{
    if(err){
      return res.json({error: "Problème lors de la modification de l'évènement"});
    } else {
      return res.json({message: "Evènement modifié"});
    }
  });
});

//route qui permet de supprimer un évènement
app.delete("/events/:id", (req, res)=>{
  client.query("DELETE FROM event WHERE id = "+req.params.id, (err)=>{
    console.log(err);
    if(err){
      return res.json({error: "Problème lors de la suppression de l'évènement"});
    } else {
      return res.json({message: "Evènement supprimé"});
    }
  });
});

//route qui permet de modifier les évènements
app.post("/events", (req, res)=>{
  const body = req.body;
  //on enregistre l'event en base
  client.query("INSERT INTO event (libelle_event, date_event, is_visible) VALUES ($1, $2, $3)", [body.libelle, body.date, 1], (err)=>{
    if(err){
      console.log(err);
      return res.json({error: "Problème lors de l'ajout de l'évènement"});
    } else {
      return res.json({message: "Evénement enregistré"});
    }
  });
});

app.post("/response", (req, res)=>{
  const body = req.body;
  console.log(body);
  //on fait un test d'unicité sur l'email avec une requête WHERE
  client.query(`SELECT email FROM response WHERE email = '`+body.email+`'`, (err, result)=>{
    if(result.rows[0]){
      //si on a un résultat on retourne un message : l'email est déjà utilisé
      return res.json({errmessage: "Cet email est déjà utilisé"});
    } else {
      //on fait les vérifications sur les informations récupérées
      const reponses = joi.object({
        email : joi.string().email().required()
      });
      const mail = {email: body.email}
      //on vérifie l'email
      const {error} = reponses.validate(mail);
      
      if(error){
        //si il y a une erreur, on la retourne
        return res.json({error: error.details});
      } else {
        //on vérifie le numéro de téléphone
        https.get('https://numvalidate.com/api/validate?number='+body.phone,(response)=>{
          response.setEncoding("utf8");
          response.on('data', ()=>{
            //on enregistre les données en base
            const { nom, prenom, naissance, civilite, tel, fixe, email, cp, ville, niveau_actuel, code_annee, souhait_contact, souhait_autre, is_initial, is_alternance, code_formation, creneau_journalier, crenaeu_horaire, note_echange, etudiant_spe, ville_etude, lieu_reunion_information } = req.body;
            client.query(
              'INSERT INTO response (nom, prenom, naissance, civilite, tel, fixe, email, cp, ville, niveau_actuel, code_annee, souhait_contact, souhait_autre, is_initial, is_alternance, code_formation, creneau_journalier, creneau_horaire, note_echange, etudiant_spe, ville_etude, lieu_reunion_information) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22)',
              [nom, prenom, naissance, civilite, tel, fixe, email, cp, ville, niveau_actuel, code_annee, souhait_contact, souhait_autre, is_initial, is_alternance, code_formation, creneau_journalier, crenaeu_horaire, note_echange, etudiant_spe, ville_etude, lieu_reunion_information],
              (err) => {
                console.log(err);
                if (err) {
                  return res.json({errmessage: "Problème lors de l'ajout des réponses de l'utilisateur"});

                } else {
                  return res.json({message: "Réponse enregistée"});
                }
              }
            );
          });
          response.on('error',(error)=>{
            return res.json({errmessage: "Ce numéro de téléphone n'est pas valide"});
          });
        }).on('error', console.error);
      }
    }
  });
});

//authentification

//fonction qui génère un Token d'accès
function generateAccessToken(user){
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3h'})
}
//route qui permet l'authentification
app.post("/login", async (req, res) =>{
  const body = req.body;
  client.query(`SELECT mail, password FROM users WHERE users.mail = '`+body.mail+`'`, async (err, result) => {
    const userFound = result.rows[0];

    const mail = body.mail;
    const user = { mail: mail };
    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);

    if (!userFound) {
      //si les informations ne correspondent pas, on retourne un message d'erreur
      return res.json({errmessage: 'Nom d\'utilisateur / mot de passe incorrect'})
    }
    try {
      const isSame = await bcrypt.compare(body.password, userFound.password);
      if ( isSame ) {
        //si le mot de passe correspond, on authentifie l'utilisateur
        client.query('INSERT INTO refresh_tokens (refresh_token) VALUES ($1)', [refreshToken], (err, res) => {});
        res.json({token: accessToken, refreshToken: refreshToken, user: userFound, mail: userFound.mail});
      } else {
        //si le mot de passe ne correspond pas, on retourne un message d'erreur
        return res.json({errmessage: 'Nom d\'utilisateur / mot de passe incorrect'})
      }
    } catch {
      res.status(500).send('Problème serveur')
    } 
  });
})

app.listen(8010, () => console.log("server is running"));