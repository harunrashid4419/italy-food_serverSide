const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.uqseuad.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
  try{
    const categoriesCollections = client.db('italy-food').collection('categories');

    app.get('/categories', async(req, res) =>{
      const query = {};
      const categories = await categoriesCollections.find(query).toArray();
      res.send(categories);
    })


  }
  finally{

  }
}
run().catch(error => console.log(error));


app.get('/', async(req, res) =>{
    res.send('post is running');
});
app.listen(port, async() => console.log(`port is runnign on ${port}`));