const express = require('express')
const app = express()
var cors = require('cors')
const port = 5000
app.use(cors())
app.use(cors())
const { MongoClient, ServerApiVersion } = require('mongodb')

const uri = `mongodb+srv://pc_builder:pc_builder@cluster0.wy2w6g2.mongodb.net/?retryWrites=true&w=majority`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

const productCollection = client.db('pc_builder').collection('products')
const categoriesCollection = client.db('pc_builder').collection('categories')

function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    app.get('/products', async (req, res) => {
      const query = {}

      const result = await productCollection.find(query).toArray()

      const books = result.reverse()
      res.send(books)
    })
    //
    app.get('/categories', async (req, res) => {
      const query = {}

      const result = await categoriesCollection.find(query).toArray()
      res.send(result)
    })
    //
    app.get('/', (req, res) => {
      res.send('Hello World!')
    })

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run()

//
