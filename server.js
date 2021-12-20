const mongoose = require('mongoose');
const dotenv = require('dotenv'); //This npm package is used to connect our config.env file to node app
//specifying the path to our configuration file
//now this will read our variables from the env file and save them to nodeJS environment variables
dotenv.config({ path: './config.env' });
// console.log(process.env);

const app = require('./app');

//OUr DATABASE STRING
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {//this will result a promise
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(con => {
    // console.log(con.connection);
    console.log('DB connection successful!');
  });



/*
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Piyush:<password>@cluster0.lbtol.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});*/




const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
