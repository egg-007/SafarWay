import app from "./app.js"
import Database from "./shared/database.js"
import "reflect-metadata";
const database = new Database();
const  PORT  = process.env.PORT
await database.connect();
app.listen(PORT,()=>{
    console.log(`Welcome the channel radio show TV in ${PORT}!`)
})