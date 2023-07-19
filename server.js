const dotenv            = require("dotenv");
const mongoose          = require("mongoose");

const app               = require("./app");

dotenv.config({path:"./config.env"});

const DB = process.env.DB.replace("<password>",process.env.DB_PASSWORD)


mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(con => {
    console.log( "DB connection successfull" )
}).catch(err => console.log(err.message))




const port = process.env.PORT || 3000;
app.listen(port,() => {
    console.log(`Server running on port:${port}`);
})