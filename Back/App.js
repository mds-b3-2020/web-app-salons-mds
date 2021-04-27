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
const excel = require('node-excel-export');
const path = __dirname + '/../Front/dist/';

app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use(express.static(path));

const connectionString = process.env.DATABASE_URL;
const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } })
client.connect()

app.get("/", (req, res) => {
  res.sendFile(path + "index.html")
})

app.get("/responses", (req, res) => {
  client.query(`SELECT * FROM response`, (err, result) => {
    const responseFound = result.rows;
    return res.json(responseFound);
  });
})

//route qui permet de modifier les evenements
app.put("/events/:id", (req, res) => {
  const body = req.body;
  //on modifie l'event en base
  client.query("UPDATE event SET libelle_event = '" + body.libelle + "' AND date_event = '" + body.date + "' WHERE id = " + req.params.id, (err) => {
    if (err) {
      return res.json({ error: "Problème lors de la modification de l'évènement" });
    } else {
      return res.json({ message: "Evènement modifié" });
    }
  });
});

//route qui permet de supprimer un évènement
app.delete("/events/:id", (req, res) => {
  client.query("DELETE FROM event WHERE id = " + req.params.id, (err) => {
    console.log(err);
    if (err) {
      return res.json({ error: "Problème lors de la suppression de l'évènement" });
    } else {
      return res.json({ message: "Evènement supprimé" });
    }
  });
});

//route qui permet de modifier les évènements
app.post("/events", (req, res) => {
  const body = req.body;
  //on enregistre l'event en base
  client.query("INSERT INTO event (libelle_event, date_event, is_visible) VALUES ($1, $2, $3)", [body.libelle, body.date, 1], (err) => {
    if (err) {
      console.log(err);
      return res.json({ error: "Problème lors de l'ajout de l'évènement" });
    } else {
      return res.json({ message: "Evénement enregistré" });
    }
  });
});

app.post("/response", (req, res) => {
  const body = req.body;
  //on fait un test d'unicité sur l'email avec une requête WHERE
  client.query(`SELECT email FROM response WHERE email = '` + body.email + `'`, (err, result) => {
    if (result.rows[0]) {
      //si on a un résultat on retourne un message : l'email est déjà utilisé
      return res.json({ errmessage: "Cet email est déjà utilisé" });
    } else {
      //on fait les vérifications sur les informations récupérées
      const reponses = joi.object({
        email: joi.string().email().required()
      });
      const mail = { email: body.email }
      //on vérifie l'email
      const { error } = reponses.validate(mail);

      if (error) {
        //si il y a une erreur, on la retourne
        return res.json({ error: error.details });
      } else {
        //on vérifie le numéro de téléphone
        https.get('https://numvalidate.com/api/validate?number=' + body.phone, (response) => {
          response.setEncoding("utf8");
          response.on('data', () => {
            //on enregistre les données en base
            const { nom, prenom, naissance, civilite, tel, fixe, email, cp, ville, niveau_actuel, code_annee, souhait_contact, souhait_autre, is_initial, is_alternance, code_formation, creneau_journalier, crenaeu_horaire, note_echange, etudiant_spe, ville_etude, lieu_reunion_information } = req.body;
            client.query(
              'INSERT INTO response (nom, prenom, naissance, civilite, tel, fixe, email, cp, ville, niveau_actuel, code_annee, souhait_contact, souhait_autre, is_initial, is_alternance, code_formation, creneau_journalier, creneau_horaire, note_echange, etudiant_spe, ville_etude, lieu_reunion_information) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22)',
              [nom, prenom, naissance, civilite, tel, fixe, email, cp, ville, niveau_actuel, code_annee, souhait_contact, souhait_autre, is_initial, is_alternance, code_formation, creneau_journalier, crenaeu_horaire, note_echange, etudiant_spe, ville_etude, lieu_reunion_information],
              (err) => {
                console.log(err);
                if (err) {
                  return res.json({ errmessage: "Problème lors de l'ajout des réponses de l'utilisateur" });

                } else {
                  return res.json({ message: "Réponse enregistée" });
                }
              }
            );
          });
          response.on('error', (error) => {
            return res.json({ errmessage: "Ce numéro de téléphone n'est pas valide" });
          });
        }).on('error', console.error);
      }
    }
  });
});

//authentification

//fonction qui génère un Token d'accès
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3h' })
}
//route qui permet l'authentification
app.post("/login", async (req, res) => {
  const body = req.body;
  client.query(`SELECT mail, password FROM users WHERE users.mail = '` + body.mail + `'`, async (err, result) => {
    const userFound = result.rows[0];

    const mail = body.mail;
    const user = { mail: mail };
    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);

    if (!userFound) {
      //si les informations ne correspondent pas, on retourne un message d'erreur
      return res.json({ errmessage: 'Nom d\'utilisateur / mot de passe incorrect' })
    }
    try {
      const isSame = await bcrypt.compare(body.password, userFound.password);
      if (isSame) {
        //si le mot de passe correspond, on authentifie l'utilisateur
        client.query('INSERT INTO refresh_tokens (refresh_token) VALUES ($1)', [refreshToken], (err, res) => { });
        res.json({ token: accessToken, refreshToken: refreshToken, user: userFound, mail: userFound.mail });
      } else {
        //si le mot de passe ne correspond pas, on retourne un message d'erreur
        return res.json({ errmessage: 'Nom d\'utilisateur / mot de passe incorrect' })
      }
    } catch {
      res.status(500).send('Problème serveur')
    }
  });
})

//fonction excel
app.get("/excel/:id", (req, res) => {
  //on créé le style pour les titres
  const styles = {
    header: {
      font: {
        color: {
          rgb: '1f4e78'
        },
        bold: true
      }
    }
  };
  //on ajoute les cellules titre
  const heading = [
    [
      { value: 'IDIndividu', styles: styles.header },
      { value: 'Qui', style: styles.header },
      { value: 'LieuReunionInformation', style: styles.header },
      { value: 'Source', style: styles.header },
      { value: 'Datesalon', style: styles.header },
      { value: 'Initial', style: styles.header },
      { value: 'Alternance', style: styles.header },
      { value: 'FPC', style: styles.header },
      { value: 'Marques', style: styles.header },
      { value: 'Formation1', style: styles.header },
      { value: 'Formation2', style: styles.header },
      { value: 'Formation3', style: styles.header },
      { value: 'CiviliteIndividu', style: styles.header },
      { value: 'NomIndividu', style: styles.header },
      { value: 'PrenomIndividu', style: styles.header },
      { value: 'DateNaissance', style: styles.header },
      { value: 'etudePostBac', style: styles.header },
      { value: 'TelPortable', style: styles.header },
      { value: 'Email', style: styles.header },
      { value: 'Adresse1', style: styles.header },
      { value: 'Adresse2', style: styles.header },
      { value: 'Codepostal', style: styles.header },
      { value: 'Ville', style: styles.header },
      { value: 'Session', style: styles.header },
      { value: 'DernierDiplomeObtenu', style: styles.header },
      { value: 'TypeFormation', style: styles.header },
      { value: 'DateInscriptionRI', style: styles.header },
      { value: 'Commentaire', style: styles.header },
      { value: 'idmarques', style: styles.header }
    ]
  ];

  const dataset = [];
  //on récupère les données dans dataset
  client.query("SELECT a.*, b.* FROM response a LEFT JOIN event b ON a.id_event = b.id WHERE a.id_event IN ($1)", [req.params.id], (err, result) => {

    if (result.rows) {
      responses = result.rows;
      dataset.push(responses);

      //on ajoute les spcécifications
      const specification = {}

      //on ajoute les cellules fusionnées, ici il n'y en a pas
      const merges = [];

      //on créé l'export
      const report = excel.buildExport(
        [
          {
            name: 'CRM',
            heading: heading,
            merges: merges,
            specification: specification,
            data: dataset
          }
        ]
      );

      //retourne le fichier
      res.send(report);
      return res.download('/CRM.xlsx');
    }
  });



});

const port = process.env.PORT || 8010
app.listen(port, () => console.log("server is running on", port));