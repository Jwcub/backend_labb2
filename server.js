// Importera paket
const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();


//Anslut till databas
const { createClient } = require("@libsql/client");

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

//Middlewares
app.use(cors()); // Tillåter cross-origin
app.use(express.json()); //Parsa JSON-body


async function run() {
  try {
    const rs = await client.execute("SELECT * FROM workexperience");
    console.log(rs.rows);
  } catch (e) {
    console.error("Något gick fel:", e);
  }
}

run();

//Starta applikation
app.listen(3000, () => {
    console.log("Server startad")
});

