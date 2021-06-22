const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const path = require('path')
// Serve static files from the React frontend app


const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'client/build')))
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

// connect to mondgoDB database

mongoose.connect(process.env.MONGODB_URI, {useUnifiedTopology: true, useNewUrlParser: true});

mongoose.connection.once('open', ()=>{
    console.log('connected to database')
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true

}));

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})