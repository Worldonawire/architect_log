const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList } = graphql;

// dummy data
let buildings = [
    {name: "St Mary's Cathedral", location: "Tokyo", id: "1", architectId: "1"},
    {name: "Tokyo Tower", location: "Tokyo", id: "2", architectId: "2"},
    {name: "Tokyo Skytree", location: "Tokyo", id: "3", architectId: "3"},
    {name: "Tokyo Metropolitan Government Building", location: "Tokyo", id: "4", architectId: "1"},
    {name: "Nagoya TV Tower", location: "Nagoya", id: "5", architectId: "2"}
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
        location: { type: GraphQLString },
        architect: {
            type: ArchitectType,
            resolve(parent, args) {
                console.log(parent);
                return _.find(architects, {id: parent.architectId})
            }
        }
    })
});

const ArchitectType = new GraphQLObjectType({
    name: 'Architect',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        nationality: { type: GraphQLString },
        buildings: {
            type: new GraphQLList(BuildingType),
            resolve(parent, args) {
                return _.filter(buildings, {architectId: parent.id});
            }
        }
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
        buildings: {
            type: new GraphQLList(BuildingType),
            resolve(parent, args) { // we don't really care what books, we just want all books
                return buildings
            }
        },
        architects: {
            type: new GraphQLList(ArchitectType),
            resolve(parent, args) {
                return architects
            }
        }
    }

});

module.exports = new GraphQLSchema({
    query: RootQuery
});