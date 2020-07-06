const express = require('express');
const app = express();
const connection = require('./conf');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1 Affiche la liste de tous les acteurs
app.get('/actors', (req, res) => {
  connection.query('SELECT * FROM actor', (err, results) => {
    if (err) {
      res.status(500).json({ error: `An error occurred: ${err.message}` })
    }
    res.status(200).json(results);
  });
});

// 2 Affiche les infos d'un acteur
app.get('/actors/:id', (req, res) => {
  const actorId = req.params.id;
  connection.query('SELECT * FROM actor WHERE id = ?', actorId, (err, results) => {
    if (err) {
      return res.status(500).json({ error: `An error occurred: ${err.message}` })
    }
    if (results.length == 0) {
      return res.status(404).json({ error: "actor not found" })
    }
    return res.status(200).json(results[0])
  });
});

// 3 Affiche les acteurs dont la date de naissance est supérieure au chiffre passé en paramètre
app.get('/actors/birthdate/:date', (req, res) => {
  const date = req.params.date;
  connection.query('SELECT * FROM actor WHERE birthdate > ?', date, (err, results) => {
    if (err) {
      res.status(500).json({ error: `An error occurred: ${err.message}` })
    }
    res.status(200).json(results);
  });
});

// 4 Affiche les acteurs dont le nom commence par M
app.get('/actors/name/:letter', (req, res) => {
  const letter = req.params.letter + '%'
  connection.query('SELECT * FROM actor WHERE name LIKE ?', letter, (err, results) => {
    if (err) {
      res.status(500).json({ error: `An error occurred: ${err.message}` })
    }
    res.status(200).json(results);
  });
});

// 5 Affiche les acteurs selon ordre alphabétique de noms
app.get('/actors/names/order', (req, res) => {
  connection.query('SELECT name FROM actor ORDER BY name ASC', (err, results) => {
    if (err) {
      res.status(500).json({ error: `An error occurred: ${err.message}` })
    }
    res.status(200).json(results);
  });
});

// 6 Affiche les acteurs selon ordre de date anniversaire donné en paramètre
app.get('/actors/birthdates/:order', (req, res) => {
  const order = req.params.order;
  connection.query('SELECT * FROM actor ORDER BY birthdate ', order, (err, results) => {
    if (err) {
      res.status(500).json({ error: `An error occurred: ${err.message}` })
    }
    res.status(200).json(results);
  });
});

// 7 Ajoute un acteur
app.post('/actors', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO actor SET ?', formData, (err, results) => {
    if (err) {
      return (
        res.status(500).json({ error: `An error occurred: ${err.message}` })
      )
    }
    res.status(201).json({ ...formData, id: results.insertId })
  });
});

// 8 Modifie un acteur
app.put('/actors/:id', (req, res) => {
  const formData = req.body;
  const actorId = req.params.id;
  connection.query('UPDATE actor SET ? WHERE id = ?', [formData, actorId], (err, results) => {
    if (err) {
      return (
        res.status(500).json({ error: `An error occurred: ${err.message}` })
      )
    }
    res.status(200).json({ ...formData })
  });
});

// 9 Modifie le toggle d'un acteur
app.put('/actors/:id/', (req, res) => {
  const formData = req.body;
  const actorId = req.params.id;
  connection.query('UPDATE actor SET isTheDoctor = YES WHERE id = ?', [formData, actorId], (err, results) => {
    if (err) {
      return (
        res.status(500).json({ error: `An error occurred: ${err.message}` })
      )
    }
    res.status(200).json({ ...formData })
  });
});

// 10 Supprime un acteur
app.delete('/actors/:id', (req, res) => {
  const actorId = req.params.id;
  connection.query('DELETE FROM actor WHERE id = ?', actorId, (err, results) => {
    if (err) {
      return (
        res.status(500).json({ error: `An error occurred: ${err.message}` })
      )
    }
    res.sendStatus(200);
  });
});

// 11 Supprime les acteurs dont le bool est false
app.delete('/actors/', (req, res) => {
  connection.query('DELETE FROM actor WHERE isTheDoctor = 0', (err, results) => {
    if (err) {
      return (
        res.status(500).json({ error: `An error occurred: ${err.message}` })
      )
    }
    res.sendStatus(200);
  });
});

module.exports = app;
