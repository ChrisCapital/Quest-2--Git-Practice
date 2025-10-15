const express = require('express');
const fs = require('fs');
const path = require('path');
const server = express();
const port = 3000;

//load public folder statically
server.use(express.static('public'));


function updateHitcounter() {
const filePath = 'hits.txt';
  let hits = 0;
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf8');
    hits = parseInt(data);
  }
  hits ++;

  fs.writeFileSync(filePath, hits.toString());
  return hits;
}

//endpoint for hits
server.get('/hits', function (req, res) {
  const hits = updateHitcounter();
  res.json({hits: hits});
});

function getRandomWord() {
  //read the file
  const filePath = 'allwords.txt';
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf8');
    //break up lines
    const lines = data.split('\n');
    //get random word
    const randomLine = lines[Math.floor(Math.random() * lines.length)];
    //separate the parts
    const [word,part,defn] = randomLine.split(' \t');
    return { word : word, part : part, definition : defn };
  }
  //return the data
}





server.get('/word',(req, res) => {
  const wordInfo = getRandomWord();
  //response
  res.json(wordInfo);
});




server.listen(port, function () {
  console.log(`Listening at http://localhost:${port}`);
});

server.get('/hello', function (req, res) {
  res.send('Hello World!');
});