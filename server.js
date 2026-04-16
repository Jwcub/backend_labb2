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

// Routing - lista alla jobb
app.get("/jobs", async(req, res) => {
    try {
        const jobs = await client.execute("SELECT * FROM workexperience");
        res.json(jobs.rows)
    } catch (e) {
        console.error("Något gick fel:", e);
         res.status(500).send("Internt serverfel");
    }
});

// Routing - lista jobb med id
app.get("/jobs/:id", async(req, res) => {
    try {
        const jobId = req.params.id;

        const job = await client.execute({
            sql: "SELECT * FROM workexperience WHERE id = :id",
            args: { id: jobId }
        });
        if(!job) return res.status(404).json({ error: "Inget jobb hittades" });
        res.json(job.rows);

    } catch (e) {
        console.error("Något gick fel:", e);
         res.status(500).send("Internt serverfel");
    }
});

// Routing - lägga till nya jobb
app.post("/jobs", async(req, res) => {
    const { companyname, jobtitle, joblocation, startdate, enddate, description } = req.body;

    if(!companyname || !jobtitle || !joblocation || !startdate) {
        return res.status(400).json({ messsage: "Företagsnamnn, jobbtitel, plats samt  anställnings startdatum krävs" })
    }

    try {
        const results = await client.execute({
            sql: "INSERT INTO workexperience(companyname, jobtitle, joblocation, startdate, enddate, description) VALUES (?, ?, ?, ?, ?, ?)",
            args: [companyname, jobtitle, joblocation, startdate, enddate || null, description || null]
        });
        res.status(201).json({ id: results.lastInsertRowid?.toString(), ...req.body });
    } catch(error) {
        console.error("Åtgärd misslyckaded:", error);
        res.status(500).json({ message: "Kunde inte lägga till tjänst" });
    }
});


//Starta applikation
app.listen(3000, () => {
    console.log("Server startad")
});

