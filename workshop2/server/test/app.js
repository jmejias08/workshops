const express = require('express');
const bodyParser = require("body-parser");

const app = express();
//middlewares
app.use(bodyParser.json());

//routes
app.get('/tipocambio', function (req, res) {
  if(req.query.tipo == 'euro') {
    res.json({
      "TipoCompraEuros" : "73a1.85",
      "TipoVentaEuros" : "761.9"
    });
  } else {
    res.json({
      "TipoCompraDolares" : "6a21",
      "TipoVentaDolares" : "621"
    });
  }
});

//start the app
app.listen(3001, () => console.log(`BBCR Exchange type service listening on port 3001!`))