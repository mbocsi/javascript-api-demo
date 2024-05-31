const express = require("express");
const app = express();
const PORT = 8080;
const { data } = require("./data");

app.use(express.json()); // Middleware that parses json

// Temporary middleware for allowing cross origin requests
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/api/listings", (req, res) => {
  res.status(200).send({
    success: true,
    listings: data,
  });
});

app.post("/api/listings", (req, res) => {
  const listing = req.body;
  const keys = ["name", "userId", "askingPrice"];
  if (keys.every((key) => listing.hasOwnProperty(key))) {
    const id = Math.floor(Math.random() * 10000);
    data.push({ ...listing, id: id });
    res.status(201).send({ ...listing, id: id });
  } else {
    res.status(415).send();
  }
});

app.get("/api/listings/:id", (req, res) => {
  const { id } = req.params;
  const listing = data.find((listing) => listing.id == id);
  if (listing) {
    res.status(200).send({ success: true, listing: listing });
  } else {
    res.status(404).send();
  }
});

app.listen(PORT, () =>
  console.log(`The server is alive on http://localhost:${PORT}`),
);
