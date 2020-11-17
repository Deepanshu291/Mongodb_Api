const express = require('express');
const app = express();
const Joi = require('joi');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const User = require('./model/user');
mongoose.Promise = global.Promise;

app.use(bodyParser.json())
    .use(morgan())
    .use(express.json());

mongoose.connect(
    'mongodb://localhost:27017/user',
    //'mongodb+srv://dark_time:manju221@cluster0-2gzjg.mongodb.net/test?retryWrites=true&w=majority',
    {useNewUrlParser:true},
    ()=> console.log("Db is connected ")
);

const port = process.env.PORT || 5000;

//Get Data:-

app.get('/api/u', async (req,res)=>{
 try{
     const user = await User.find({})
     res.json(user)
 }catch(err){
    res.status(500).json({ message: err.message })
 }
});

//Get Data by Id:-

app.get('/api/u/:userId', async (req,res)=>{
    try{
        const user = await User.find({_id: req.params.userId});
        res.json(user);
    }catch(err){
       res.status(500).json({ message: err.message })
    }
   });

//Add New Data:-

app.post('/api/u', async(req,res)=>{

   try {
    const user = new User({
        id:req.body.id,
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile
    });
    await user.save();
    res.send(user);
   } catch (err) {
    res.status(500).json({ message: err.message })
   }
    
});

//Update the Data:-

app.put('/api/u/:userId', async (req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(
            {_id: req.params.userId
            },req.body,{
                new: true,
                runValidators:true
            });
        res.json(user);
    }catch(err){
       res.status(500).json({ message: err.message })
    }
   });

//Delete Data:-   

   app.delete('/api/u/:userId', async (req,res)=>{
    try{
        const user = await User.findByIdAndRemove({_id: req.params.userId});
        res.json(user);
    }catch(err){
       res.status(500).json({ message: err.message })
    }
   });

app.listen(port, () => console.log(`listening on http://localhost:${port}`));


