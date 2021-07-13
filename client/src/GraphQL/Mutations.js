import {gql} from "@apollo/client";


export const addBuildingMutation = gql`
  mutation($name: String!, $location: String!, $architectId: ID!){
    addBuilding(name: $name, location:$location, architectId:$architectId){
      name
      id
    }
  }

`