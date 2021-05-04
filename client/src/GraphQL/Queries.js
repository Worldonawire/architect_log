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

export {getBuildingsQuery, getArchitectsQuery};