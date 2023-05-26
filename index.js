const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.uqseuad.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
  try{
    const categoriesCollections = client.db('italy-food').collection('categories');
    const menuCardCollections = client.db('italy-food').collection('menuCard');
    const blogCollections = client.db('italy-food').collection('blog');
    const foodsCollections = client.db('italy-food').collection('foods');
    const reviewCollections = client.db('italy-food').collection('reviews');

    app.get('/categories', async(req, res) =>{
      const query = {};
      const categories = await categoriesCollections.find(query).toArray();
      res.send(categories);
    });

    // get blog
    app.get('/blog', async(req, res) =>{
      const blog = {};
      const result = await blogCollections.find(blog).toArray();
      res.send(result);
    });

    // get single blog
    app.get('/blogDetails/:id', async(req, res) =>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await blogCollections.findOne(query);
      res.send(result);
    });

    // get 4 foods
    app.get('/foods', async(req, res) =>{
      const food = {};
      const result = (await foodsCollections.find(food).toArray()).slice(0, 4);
      res.send(result);
    });

    // all foods
    app.get('/allFoods', async(req, res) =>{
      const foods = {};
      const result = await foodsCollections.find(foods).toArray();
      res.send(result);
    })

    // get single food by id
    app.get('/foodDetails/:id', async(req, res) =>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await foodsCollections.findOne(query);
      res.send(result);
    });

    // add review
    app.post('/review', async(req, res) =>{
      const review = req.body;
      const result = await reviewCollections.insertOne(review);
      res.send(result);
    });

    // get review and query by id
    app.get('/review/:id', async(req, res) =>{
      const id = req.params.id;
      const query = {id};
      const result = await reviewCollections.find(query).toArray();
      res.send(result);
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