const express = require('express');

const port = 3000;

const app = express();

const path = require('path');

const mongoose = require('mongoose');

mongoose.set("strictQuery", false);

const db = require('./config/mongoose');

const Admintbl = require('./models/adminmodel');

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,"views"));

app.use(express.urlencoded());

app.get('/',(req,res)=>{
    return res.render('index');
})

app.post('/insertdata',(req,res)=>{
    let Bname = req.body.Bname;
    let Bprice = req.body.Bprice;
    let Bauthor = req.body.Bauthor;
    let pages = req.body.pages;
    
    Admintbl.create({
        Bname : Bname,
        Bprice : Bprice,
        Bauthor : Bauthor,
        pages : pages
        
    },(err,data)=>{
        if(err){
            console.log("Record not insert");
            return false;
        }
        console.log("Record successfully insert");
        return res.redirect('/');
    }); 
});

app.get('/view',(req,res)=>{
    Admintbl.find({},(err,record)=>{
        if(err){
            console.log("Record not show");
            return false;
        }
        return res.render('view',{
            allrecord : record
        });
        
    });
});

app.get('/deletedata/:id',(req,res)=>{
    let deleteid = req.params.id;
    Admintbl.findByIdAndDelete(deleteid,(err,data)=>{
        if(err){
            console.log("Record not delete");
            return false;
        }
        console.log("Record successfully delete");
        return res.redirect('back');
    });

})

app.get('/editdata/:id',(req,res)=>{
    let editid = req.params.id;
    
    Admintbl.findById(editid,(err,editrecord)=>{
        if(err){
            console.log("Record not fetch");
            return false;
        }
        return res.render('edit',{
            editR : editrecord
        })
    })
});

app.post('/updateData',(req,res)=>{
    let id = req.body.id;
    Admintbl.findByIdAndUpdate(id,{
        Bname : req.body.Bname,
        Bprice : req.body.Bprice,
        Bauthor : req.body.Bauthor,
        pages : req.body.pages
    },(err,data)=>{
        if(err){
            console.log("Record not update");
            return false;
        }
        console.log("Record successfully update");
        return res.redirect('/view');
    })
})

app.listen(port,(err)=>{
    if(err){
        console.log("Server is not start");
        return false;
    }
    console.log("server start on port :- "+port);
});


