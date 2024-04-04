const { buildSchema } = require('graphql');

const graphQLschema = buildSchema(`
  type Career {
    id: ID
    name: String
    id_code: String
    description: String
  }

  input CareerInput {
    name: String
    id_code: String
    description: String
  }

  type Query {
    getCareer(id: ID!): Career
    getAllCareers: [Career]
  }

  type Mutation {
    addCareer(input: CareerInput): Career
    updateCareer(id: ID!, input: CareerInput): Career
    deleteCareer(id: ID!): String
  }
`);

module.exports = graphQLschema;