const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;

// dummy data
let buildings = [
    {name: "St Mary's Cathedral", location: "Tokyo", id: "1"},
    {name: "Tokyo Tower", location: "Tokyo", id: "2"},
    {name: "Tokyo Skytree", location: "Tokyo", id: "3"}
]

let architects = [
    {name: "Tange", nationality: "Japanese", id: "1"},
    {name: "Naitou", nationality: "Japanese", id: "2"},
    {name: "Sekkei", nationality: "Japanese", id: "3"},
]

const BuildingType = new GraphQLObjectType({
    name: 'Building',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        location: { type: GraphQLString }
    })
});

const ArchitectType = new GraphQLObjectType({
    name: 'Architect',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        nationality: { type: GraphQLString }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        building: {
            type: BuildingType,
            args: { id: {type: GraphQLID}},
            resolve(parent, args) {
                // code to get data from db / other source
                return _.find(buildings, {id: args.id })
            }
        },
        architect: {
            type: ArchitectType,
            args: { id: {type: GraphQLID}},
            resolve(parent, args) {
                // code to get data from db / other source
                return _.find(architects, {id: args.id })
            }
        },
    }

});

module.exports = new GraphQLSchema({
    query: RootQuery
});