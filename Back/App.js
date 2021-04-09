const express = require("express");
const app = express();
const cors = require("cors");
const https = require('https');
const joi = require('joi');
if (process.env.ENV_PROD !== true) {
    require('dotenv').config();   
}
const { Pool, Client } = require('pg')

app.use(cors());

const pool = new Pool(process.env.DATABASE_URL)
pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})
const client = new Client(process.env.DATABASE_URL)
client.connect()
client.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  client.end()
})

//route qui permet de modifier les evenements
app.put("/events/:id", ()=>{
  //on récupère les données à enregistrer
  const body = req.body;

  //on enregistre les events en base
  client.query("UPDATE events SET libelle = body.libelle  AND date = body.date WHERE id =req.params.id", (err,res)=>{
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
  client.query("INSERT INTO events (libelle,date) VALUES (body.libelle,body.date)", (err,res)=>{
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
      return res.json({errorMail: "Cet email est déjà utilisé"});
    }
  });

  //on fait les vérifications sur les informations récupérées
  const reponses = joi.object({

    email : joi.string().email.required()
  });
  //on vérifie l'email
  const {error} = reponses.validate(body.email);
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
      return res.json({errorMail: "Ce numéro de téléphone n'est pas valide"});
    });
  }).on('error', console.error);

  //on enregistre les données en base
  client.query("INSERT INTO response () VALUES ()", (err,res)=>{
    if(err){
      return res.json({errorMail: "Problème lors de l'ajout des réponses de l'utilisateur"});
    }
  });
});


app.listen(8010, () => console.log("server is running"));