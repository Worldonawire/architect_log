const graphql = require('graphql');
const _ = require('lodash');
const Building = require('../models/building');
const Architect = require('../models/architect');
const mongoose = require('mongoose');

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLID, 
    GraphQLList,
    GraphQLNonNull
 } = graphql;

// dummy data
// let buildings = [
//     {name: "St Mary's Cathedral", location: "Tokyo", id: "1", architectId: "1"},
//     {name: "Tokyo Tower", location: "Tokyo", id: "2", architectId: "2"},
//     {name: "Tokyo Skytree", location: "Tokyo", id: "3", architectId: "3"},
//     {name: "Tokyo Metropolitan Government Building", location: "Tokyo", id: "4", architectId: "1"},
//     {name: "Nagoya TV Tower", location: "Nagoya", id: "5", architectId: "2"}
// ]

// let architects = [
//     {name: "Tange", nationality: "Japanese", id: "1"},
//     {name: "Naitou", nationality: "Japanese", id: "2"},
//     {name: "Sekkei", nationality: "Japanese", id: "3"},
// ]
/*
{
    "errors": [
      {
        "message": "ID cannot represent value: { _bsontype: \"ObjectID\", id: <Buffer 60 e9 20 ee 02 36 38 23 d4 02 fd f2> }",
        "locations": [
          {
            "line": 10,
            "column": 5
          }
        ],
        "path": [
          "events",
          0,
          "_id"
        ]
      }
    ],
    "data": null
  }
*/
const BuildingType = new GraphQLObjectType({
    name: 'Building',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        location: { type: GraphQLString },
        architect: {
            type: ArchitectType,
            resolve(parent, args) {
                // console.log(parent);
                // return _.find(architects, {id: parent.architectId})
                // return Architect.find(parent.architectId)
                //return Architect.find({ id: parent.architectId })
                return Architect.findById(parent.architectId)
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
                // return _.filter(buildings, {architectId: parent.id});
                return Building.find({ architectId: parent.id })
                
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
                if(!args.id) return false;
                //if( !mongoose.Types.ObjectId.isValid(id) ) return false;
                // code to get data from db / other source
                // return _.find(buildings, {id: args.id })
                return Building.findById(args.id)
            }
        },
        architect: {
            type: ArchitectType,
            args: { id: {type: GraphQLID}},
            resolve(parent, args) {
                // code to get data from db / other source
                // return _.find(architects, {id: args.id })
                return Architect.findById(args.id)
            }
        },
        buildings: {
            type: new GraphQLList(BuildingType),
            resolve(parent, args) { // we don't really care what books, we just want all books
                // return buildings
                return Building.find({})
            }
        },
        architects: {
            type: new GraphQLList(ArchitectType),
            resolve(parent, args) {
                // return architects
                return Architect.find({})
            }
        }
    }

});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addArchitect: {
            type: ArchitectType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                nationality: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
                let architect = new Architect({
                    name: args.name,
                    nationality: args.nationality
                });
                return architect.save();
            }
        },
        addBuilding: {
            type: BuildingType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                location: {type: new GraphQLNonNull(GraphQLString)},
                architectId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args) {
                let building = new Building({
                        name: args.name,
                        location: args.location,
                        architectId: args.architectId
                    })
                return building.save();
            }
        }
    }

})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});