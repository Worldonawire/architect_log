import './App.css';
import React from "react";

// components
import BuildingList from './components/BuildingList'
import AddBuilding from './components/AddBuilding'


// net ninja version
// apollo client setup
// import ApolloClient from '@apollo/client';
// import { ApolloProvider} from 'react-apollo';

// const client = new ApolloClient({
//   uri: 'http://localhost:5000/graphql'
// })


// some other guy's version
import {
  ApolloClient, 
  InMemoryCache, 
  ApolloProvider,
  HttpLink,
  from,
  // gql

  } from "@apollo/client";
import { onError } from '@apollo/client/link/error'

const errorLink = onError(({ graphqlErrors, networkError}) => {
  if (graphqlErrors) {
    // eslint-disable-next-line array-callback-return
    graphqlErrors.map(({message, location, path}) => {
      alert(`Graphql error ${message}`)
    })
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: 'http://localhost:5000/graphql' })
])
// const link = new HttpLink({ uri: 'http://localhost:5000/graphql' })


const client = new ApolloClient({
  // uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
  link: link
});


function App() {
 



  return (
    <ApolloProvider client={client}>
      <div className="main">
        <h1>Architect's Log</h1>
        <BuildingList />
        <AddBuilding />
      </div>
     
    </ApolloProvider>
  );
}

export default App;
