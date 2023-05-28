const express = require('express')
const app = express()
const { MongoClient } = require('mongodb');
const PORT = 2121
require('dotenv').config()


let db,
    dbName = 'todo';

const uri = process.env.MONGO_CONNECTION_STRING;
const client = new MongoClient(uri);    

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/',async (request, response)=>{
    const todoItems = await client.db(dbName).collection('todos').find().toArray()
    const itemsLeft = await client.db(dbName).collection('todos').countDocuments({completed: false})
    response.render('index.ejs', { items: todoItems, left: itemsLeft })
    // db.collection('todos').find().toArray()
    // .then(data => {
    //     db.collection('todos').countDocuments({completed: false})
    //     .then(itemsLeft => {
    //         response.render('index.ejs', { items: data, left: itemsLeft })
    //     })
    // })
    // .catch(error => console.error(error))
})


// app.get("/items/:my_item", async (req, res) => {
//     let my_item = req.params.my_item;
//     let item = await client.db("my_db")
//                 .collection("my_collection")
//                 .findOne({my_item: my_item})

//     return res.json(item)
// })

// app.post('/addTodo', (request, response) => {
//     db.collection('todos').insertOne({thing: request.body.todoItem, completed: false})
//     .then(result => {
//         console.log('Todo Added')
//         response.redirect('/')
//     })
//     .catch(error => console.error(error))
// })

// app.put('/markComplete', (request, response) => {
//     db.collection('todos').updateOne({thing: request.body.itemFromJS},{
//         $set: {
//             completed: true
//           }
//     },{
//         sort: {_id: -1},
//         upsert: false
//     })
//     .then(result => {
//         console.log('Marked Complete')
//         response.json('Marked Complete')
//     })
//     .catch(error => console.error(error))

// })

// app.put('/markUnComplete', (request, response) => {
//     db.collection('todos').updateOne({thing: request.body.itemFromJS},{
//         $set: {
//             completed: false
//           }
//     },{
//         sort: {_id: -1},
//         upsert: false
//     })
//     .then(result => {
//         console.log('Marked Complete')
//         response.json('Marked Complete')
//     })
//     .catch(error => console.error(error))

// })

// app.delete('/deleteItem', (request, response) => {
//     db.collection('todos').deleteOne({thing: request.body.itemFromJS})
//     .then(result => {
//         console.log('Todo Deleted')
//         response.json('Todo Deleted')
//     })
//     .catch(error => console.error(error))

// })

client.connect(err => {
    if(err){ console.error(err); return false;}
    // connection to mongo is successful, listen for requests
    app.listen(process.env.PORT || PORT, () => {
        console.log("listening for requests");
    })
});