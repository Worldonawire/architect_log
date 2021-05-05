import {gql} from "@apollo/client";


const getBuildingsQuery = gql`
  query {
    buildings{
      name
      id
    }
  }

`

 const getArchitectsQuery = gql`
  query {
    architects{
      name
      id
    }
  }
`

const getBuildingQuery = gql`
  query($id: ID) {
    building(id: $id) {
      id
      name
      location
      architect {
        id
        name
        nationality
        buildings{
          name
          id
        }
      }
    }
  }
`

export {getBuildingsQuery, getArchitectsQuery, getBuildingQuery};