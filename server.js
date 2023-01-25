const express = require('express');
const path = require('path');
const fs = require('fs');


const PORT = process.env.PORT || 3001;
const publicDir = path.join(__dirname, "/public");

const app = express();


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));

// GET Route for homepage
app.get('/notes', (req, res) =>
  res.sendFile(path.join(publicDir, 'notes.html'))
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
  res.sendFile(path.join(publicDir, "index.html"))
);

app.post("/api/notes", function (req, res) {
  console.log("req.body= ",req.body);
    var notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let note = req.body;
    let newID = notes.length.toString();
    note.id = newID;
    notes.push(note);
  
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    console.log("Note saved to db.json. Content: ", note);
    res.json(notes);
  });
  

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

