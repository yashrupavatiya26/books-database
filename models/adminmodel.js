const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
    Bname : {
        type : String,
        required : true
    },
    Bprice : {
        type : String,
        required : true
    },
    Bauthor : {
        type : String,
        required : true
    },
    pages : {
        type : String,
        required : true
    }
});

const Admin = mongoose.model('admin',AdminSchema);
module.exports = Admin;