require('dotenv').config();
const graphqlHTTP = require('express-graphql');
const { graphQLschema } = require('./schema.js');
const jwt = require('jsonwebtoken');


const express = require('express');
const app = express();
const schema = require('./schema.js');
const CareerModel = require('./models/careerModel.js');



// Resolvers para las operaciones GraphQL
const root = {
    getCareer: async ({ id }) => {
        return await CareerModel.findById(id);
    },
    getAllCareers: async () => {
        return await CareerModel.find();
    },
    addCareer: async ({ input }) => {
        const career = new CareerModel(input);
        return await career.save();
    },
    updateCareer: async ({ id, input }) => {
        return await CareerModel.findByIdAndUpdate(id, input, { new: true });
    },
    deleteCareer: async ({ id }) => {
        await CareerModel.findByIdAndDelete(id);
        return "Career deleted successfully";
    },
};
  

// database connection
const mongoose = require("mongoose");
const db = mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// parser for the request body (required for the POST and PUT methods)
const bodyParser = require("body-parser");
// check for cors
const cors = require("cors");
app.use(cors({
  domains: '*',
  methods: "*"
}));

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // Habilitar interfaz GraphiQL
}));



const port = 3000;
app.listen(port, () => {
  console.log(`Servidor GraphQL funcionando en http://localhost:${port}/graphql`);
});