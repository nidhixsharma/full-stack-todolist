//const MongoClient = require('mongodb').MongoClient;
 const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{useNewUrlParser: true },(err,client)=>{
if(err) {
     return console.log(`unable to connect MongoDB server`);
}
console.log('Connected to MongoDB server');
const db = client.db('TodoApp')
db.collection('Todos').insertOne({

},(err,result)=>{
     if(err) {
          return console.log('Unable to insert Todos');
     }
     console.log(JSON.stringify(result.ops,undefined , 2));
});


client.close();
});
