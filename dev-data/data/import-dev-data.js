const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");

const Tour = require("./../../models/tourModel");

dotenv.config({path:"./../../config.env"});

const DB = process.env.DB.replace("<password>", process.env.DB_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(()=> console.log("DB connected"))


const tours = JSON.parse(fs.readFileSync("import-dev-data.json","utf-8"));

const importData = async () => {
    try{
        await Tour.create(tours)
        console.log("Insertion success")
    } catch (err){
        console.log(err.message)
    }
    
}

const deleteData = async () => {
    try{
        await Tour.deleteMany();
        console.log("Deletion success")
    } catch(err){
        console.log(err.message)
    }
}

if(process.argv[2] == '--import'){
    importData();
} else if(process.argv[2] == '--delete'){
    deleteData();
}

