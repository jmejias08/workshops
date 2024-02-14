const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Variables globales con el valor del dolar y el euro
let dolarValue ; 
let eurValue ;


//middlewares
app.use(bodyParser.json());
app.use(cors({
  domains: '*',
  methods: "*"
}));



// routes
// Endpoint /paises
app.get('/paises', (req, res) => {
  const paises = [
    { name: "Costa Rica", currency: "crc" },
    { name: "Nicaragua", currency: "nio" },
    { name: "Mexico", currency: "mxn" },
    { name: "Panama", currency: "pab" },
    { name: "Colombia", currency: "cop" },
    { name: "Estados Unidos", currency: "usd"},
    { name: "España", currency: "eur"}
  ];
  // Responde con el listado de países en formato JSON
  res.json(paises);
});


// Ruta para manejar las solicitudes POST en /paises
app.post('/paises', async (req, res) => {
  const currency = req.body.selection;
  console.log("Currency selected:", currency);
  try {
    const response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`);
    const responseData = await response.json();
    dolarValue = responseData[currency].usd;
    eurValue = responseData[currency].eur;
    console.log("dolar: ", dolarValue, " euro: ", eurValue);

    res.send('Datos recibidos en el servidor.');

    resResultCurrency();
    
  } catch (error) {
    console.error("Error en la solicitud GET /paises:", error);
    res.status(500).send('Error en el servidor.');
  }
});


// Función para manejar la ejecución de la ruta GET /result
const resResultCurrency = () => {
  app.get('/result', (req, res) => {
    console.log("dolarV: ", dolarValue)
    const request = {
      dolarValue: dolarValue,
      eurValue: eurValue,
    }
    res.json(request);
  });
};


app.listen(3001, () => console.log(`BBCR Exchange type service listening on port 3001!`))
