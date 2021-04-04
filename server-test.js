const express = require("express");
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
  next();
});

app.get('/', (req, res) => res.send("Hello"));
app.get('/hi', (req, res) => res.end(JSON.stringify({ message: 'Hi' })));
app.get('/hello', (req, res) => res.send(JSON.stringify({ message: 'Hello' })));

app.listen(3000, () => console.log("Server is running!"));