const mongoose=require('mongoose');

const mongoURI="mongodb://localhost:27017/inotebook?directConnection=true&readPreference=primary&tls=false";

const connectToMongo= ()=>{
    mongoose.connect(mongoURI)
    .then(()=> console.log("Connected to MongodB successfully"))
    .catch(err=>console.log("Could not connect to MongodB",err));
} 


module.exports=connectToMongo;

