var mongoose = require('mongoose');

var impObject = {
        'jwtSecret': 'xtytzt00700tytx',
        'connStr': 'mongodb://localhost/appdb'
    };

    mongoose.connect(impObject.connStr);


var db = mongoose.Connection; // The Connection object
 
if (db == 'undefined') {
    console.log("The Connecion issues");
}else{
    console.log("DB Connected..");
     
}


module.exports.impObject =impObject;
module.exports.db = db;