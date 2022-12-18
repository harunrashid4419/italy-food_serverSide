const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', async(req, res) =>{
    res.send('post is running');
});
app.listen(port, async() => console.log(`port is runnign on ${port}`));