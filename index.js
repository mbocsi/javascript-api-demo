const express = require("express");
const app = express();
const PORT = 8080;
const { data } = require("./data");

app.use(express.json()); // Middleware that parses json

// Temporary middleware for allowing cross origin requests
if (process.env.NODE_ENV != "PROD") {
  app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    next();
  });
}

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

app.options("/api/listings", (req, res) => {
  res.setHeader("Allow", "GET, POST");
  if (process.env.NODE_ENV != "PROD") {
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept");
  }
  res.status(204).send();
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

app.put("/api/listings/:id", (req, res) => {
  const { id } = req.params;
  const newListing = req.body;
  const listing = data.find((listing) => listing.id == id);
  const keys = ["name", "userId", "askingPrice"];
  if (!keys.every((key) => newListing.hasOwnProperty(key))) {
    console.log("invalid format");
    res.status(415).send();
    return;
  }
  if (listing) {
    listing.name = newListing.name;
    listing.askingPrice = newListing.askingPrice;
    listing.userId = newListing.userId;
    res.status(200).send({ success: true, listing: listing });
  } else {
    data.push({ ...newListing, id: id });
    res.status(201).send({ success: true, listing: { ...newListing, id: id } });
  }
});

app.delete("/api/listings/:id", (req, res) => {
  const { id } = req.params;
  const index = data.findIndex((listing) => listing.id == id);
  if (index > -1) {
    data.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

app.options("/api/listings/:id", (req, res) => {
  res.setHeader("Allow", "GET, PUT, DELETE");
  if (process.env.NODE_ENV != "PROD") {
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept");
  }
  res.status(204).send();
});
app.listen(PORT, () =>
  console.log(`The server is alive on http://localhost:${PORT}`),
);
