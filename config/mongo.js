const {MongoClient} = require("mongodb")

const url = "mongodb://localhost:27017"
const client =new MongoClient(url,{useUnifiedTopology: true})
const database = 'yummyfood'
client.connect()

const db = client.db(database)

module.exports = db
