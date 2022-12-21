const express = require('express');
const path = require('path');
const fs = require('fs');


const PORT = process.env.PORT || 3001;

const app = express();


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));

// GET Route for homepage
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Route for homepage
app.get('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/db/db.json'))
);


// GET Route for homepage
app.get('/api/notes/:id', (req, res) => {
    var notes = JSON.parse(fs. readFileSync("./db/db.json", "utf-8"));
    res.json(notes[Number(req.params.id)]); 
}
);


// Wildcard route to direct users to a 404 page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

