const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User}= require('./models/user');

var app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());

app.post('/todos',(req,res,next)=>{
  var todo = new Todo({
      text:req.body.text
  });

  todo.save().then((doc)=>{
      res.send(doc);
      },(e)=>{
         res.status(400).send(e); 
      });
    });

    app.get('/todos',(req,res,next)=>{
        Todo.find().then((todos)=>{
            res.send({
                todos});
        },(e)=>{
        res.status(400).send(e);
        });   
      
    });

    app.get('/todos/:id',(req,res)=>{
        var id =req.params.id;
        if(!ObjectID.isValid(id)){
          return  res.status(404).send();
        }
    
        Todo.findById(id).then((todo)=>{
            if(!todo)
            {
                return  res.status(404).send(); 
            }
            res.send({todo});
        }).catch((e)=>{
            res.status(400).send();
        });

    });

    app.delete('/todos/:id',(req,res)=>{
        var id = req.params.id;
        if(!ObjectID.isValid(id)){
            return  res.status(404).send();
          }
     Todo.findByIdAndRemove(id).then((todo)=>{
        if(!todo)
        {
            return  res.status(404).send(); 
        }
        res.send(todo);
     }).catch((e)=>{
         res.status(400).send();
     });
    });

    app.patch('/todos/:id',(req,res)=>{
        var id =req.params.id;
        var body =_.pick(req.body,['text']);
        if(!ObjectID.isValid(id)){
            return  res.status(404).send();
          }
      Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
            if(!todo){
                return res.status(404).send();
            }
            res.send({todo});
      }).catch((e)=>{
          res.status(400).send();
      })

    });

    app.delete('/todos',(req,res)=>{
        Todo.deleteMany({}).then((result)=>{
            res.status(200).send({todo});
        }).catch((e)=>{
            res.status(400).send();
        })

    })

app.listen(port,()=>{
console.log(`server started at ${port}`);
});

module.exports ={app};